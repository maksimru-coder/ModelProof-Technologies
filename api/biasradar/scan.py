from http.server import BaseHTTPRequestHandler
import json
import sys
import os
from datetime import datetime

sys.path.append(os.path.dirname(__file__))

try:
    from _bias_detection import hybrid_detect_bias
except ImportError:
    from api.biasradar._bias_detection import hybrid_detect_bias


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Get request metadata for logging
            ip_address = self.headers.get('X-Forwarded-For', self.client_address[0])
            user_agent = self.headers.get('User-Agent', 'Unknown')
            timestamp = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')
            
            # Parse request body
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            data = json.loads(body.decode('utf-8'))
            
            text = data.get('text', '')
            enable_ai = data.get('enable_ai', False)  # Feature flag for OpenAI validation
            
            # Log the scan request
            detection_mode = "AI-Enhanced" if enable_ai else "Standard (Pattern-Enhanced)"
            print(f"[BIASRADAR SCAN v3 HYBRID] {timestamp} | IP: {ip_address} | Mode: {detection_mode} | Text Length: {len(text)} chars")
            
            # Validation
            if not text or len(text.strip()) == 0:
                self.send_error(400, "Text cannot be empty")
                return
            
            if len(text) > 10000:
                self.send_error(400, "Text too long. Maximum 10,000 characters.")
                return
            
            # Use hybrid detection system
            result = hybrid_detect_bias(text, enable_ai=enable_ai)
            
            # Create summary
            bias_type_counts = {}
            for issue in result["issues"]:
                bias_type_counts[issue["bias_type"]] = bias_type_counts.get(issue["bias_type"], 0) + 1
            
            if result["issues"]:
                summary = f"Found {len(result['issues'])} potential bias issue(s): " + ", ".join(
                    f"{count} {bias_type}" for bias_type, count in bias_type_counts.items()
                )
            else:
                summary = "No significant biases detected. Great job!"
            
            # Send response
            response = {
                "score": result["score"],
                "severity": result["severity"],
                "issues": result["issues"],
                "heatmap": result["heatmap"],
                "summary": summary,
                "detection_method": result["detection_method"]
            }
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))
            
        except Exception as e:
            self.send_error(500, f"Error processing request: {str(e)}")
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
