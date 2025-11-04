from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.request
import urllib.error
from datetime import datetime


# Get OpenAI API key from environment
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY") or os.environ.get("AI_INTEGRATIONS_OPENAI_API_KEY")
OPENAI_BASE_URL = os.environ.get("OPENAI_BASE_URL") or os.environ.get("AI_INTEGRATIONS_OPENAI_BASE_URL") or "https://api.openai.com/v1"


def call_openai(messages, temperature=0.7, max_tokens=500):
    """Call OpenAI API using pure Python urllib (no dependencies)"""
    if not OPENAI_API_KEY:
        raise ValueError("OpenAI API key not configured")
    
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "gpt-4o-mini",
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens
    }
    
    req = urllib.request.Request(
        f"{OPENAI_BASE_URL}/chat/completions",
        data=json.dumps(payload).encode('utf-8'),
        headers=headers,
        method='POST'
    )
    
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            result = json.loads(response.read().decode('utf-8'))
            return result['choices'][0]['message']['content'].strip()
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        raise Exception(f"OpenAI API error: {e.code} - {error_body}")
    except Exception as e:
        raise Exception(f"Failed to call OpenAI: {str(e)}")


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Get request metadata for logging
            ip_address = self.headers.get('X-Forwarded-For', self.client_address[0])
            user_agent = self.headers.get('User-Agent', 'Unknown')
            timestamp = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')
            
            # Check if OpenAI API key is available
            if not OPENAI_API_KEY:
                self.send_error(500, "AI service not configured")
                return
            
            # Parse request body
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            data = json.loads(body.decode('utf-8'))
            
            text = data.get('text', '')
            
            # Log the fix request
            print(f"[BIASRADAR FIX] {timestamp} | IP: {ip_address} | User-Agent: {user_agent} | Text Length: {len(text)} chars")
            
            # Validation
            if not text or len(text.strip()) == 0:
                self.send_error(400, "Text cannot be empty")
                return
            
            # Generate fixed text using OpenAI
            fixed_text = call_openai(
                messages=[
                    {
                        "role": "system",
                        "content": "You are a bias detection and correction expert. Your job is to rewrite text to remove all forms of bias including gender, racial, age, disability, cultural, political, religious, LGBTQ+, socioeconomic, intersectional bias, and offensive language & tone (profanity, slurs, hate speech, unprofessional language). Maintain the core message but use inclusive, neutral, and professional language. Be concise and professional."
                    },
                    {
                        "role": "user",
                        "content": f"Rewrite this text to remove all biases and offensive language while preserving the core message:\n\n{text}"
                    }
                ],
                temperature=0.7,
                max_tokens=500
            )
            
            # Generate improvements list
            improvements_text = call_openai(
                messages=[
                    {
                        "role": "system",
                        "content": "List 3-5 specific improvements made to remove bias. Be brief and specific."
                    },
                    {
                        "role": "user",
                        "content": f"Original: {text}\n\nRevised: {fixed_text}\n\nList the key improvements:"
                    }
                ],
                temperature=0.5,
                max_tokens=200
            )
            
            improvements = [imp.strip() for imp in improvements_text.split('\n') if imp.strip() and not imp.strip().startswith('#')]
            improvements = [imp.lstrip('•-*123456789. ') for imp in improvements if imp][:5]
            
            # Send response
            response_data = {
                "original_text": text,
                "fixed_text": fixed_text,
                "improvements": improvements if improvements else ["Removed biased language", "Used inclusive terminology", "Made text more neutral"]
            }
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            self.wfile.write(json.dumps(response_data).encode('utf-8'))
            
        except Exception as e:
            self.send_error(500, f"Error generating fix: {str(e)}")
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
