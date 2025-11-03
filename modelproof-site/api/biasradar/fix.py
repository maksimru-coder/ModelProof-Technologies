from http.server import BaseHTTPRequestHandler
import json
import os
from openai import OpenAI


# Initialize OpenAI client with Replit AI Integrations
AI_INTEGRATIONS_OPENAI_API_KEY = os.environ.get("AI_INTEGRATIONS_OPENAI_API_KEY")
AI_INTEGRATIONS_OPENAI_BASE_URL = os.environ.get("AI_INTEGRATIONS_OPENAI_BASE_URL")

client = OpenAI(
    api_key=AI_INTEGRATIONS_OPENAI_API_KEY,
    base_url=AI_INTEGRATIONS_OPENAI_BASE_URL
) if AI_INTEGRATIONS_OPENAI_API_KEY else None


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Check if OpenAI client is available
            if not client:
                self.send_error(500, "AI service not configured")
                return
            
            # Parse request body
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            data = json.loads(body.decode('utf-8'))
            
            text = data.get('text', '')
            
            # Validation
            if not text or len(text.strip()) == 0:
                self.send_error(400, "Text cannot be empty")
                return
            
            # Generate fixed text using OpenAI
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {
                        "role": "system",
                        "content": "You are a bias detection and correction expert. Your job is to rewrite text to remove all forms of bias including gender, racial, age, disability, cultural, political, religious, LGBTQ+, socioeconomic, and intersectional bias. Maintain the core message but use inclusive, neutral language. Be concise and professional."
                    },
                    {
                        "role": "user",
                        "content": f"Rewrite this text to remove all biases while preserving the core message:\n\n{text}"
                    }
                ],
                temperature=0.7,
                max_tokens=500
            )
            
            fixed_text = (response.choices[0].message.content or "").strip()
            
            # Generate improvements list
            improvements_response = client.chat.completions.create(
                model="gpt-4o-mini",
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
            
            improvements_text = (improvements_response.choices[0].message.content or "").strip()
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
