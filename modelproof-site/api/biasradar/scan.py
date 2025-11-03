from http.server import BaseHTTPRequestHandler
import json
import sys
import os

sys.path.append(os.path.dirname(__file__))

try:
    from _bias_detection import (
        nlp, detect_gender_bias, detect_race_bias, detect_age_bias,
        detect_disability_bias, detect_cultural_bias, detect_political_bias,
        detect_religion_bias, detect_lgbtq_bias, detect_socioeconomic_bias,
        detect_truth_seeking_bias, detect_ideological_neutrality_bias,
        detect_intersectional_bias, calculate_bias_score, get_severity_label,
        create_heatmap
    )
except ImportError:
    from api.biasradar._bias_detection import (
        nlp, detect_gender_bias, detect_race_bias, detect_age_bias,
        detect_disability_bias, detect_cultural_bias, detect_political_bias,
        detect_religion_bias, detect_lgbtq_bias, detect_socioeconomic_bias,
        detect_truth_seeking_bias, detect_ideological_neutrality_bias,
        detect_intersectional_bias, calculate_bias_score, get_severity_label,
        create_heatmap
    )


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Parse request body
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            data = json.loads(body.decode('utf-8'))
            
            text = data.get('text', '')
            bias_types = data.get('bias_types', [
                "gender", "race", "age", "disability", "lgbtq", "religion",
                "socioeconomic", "culture", "intersectional", "political",
                "ideological_neutrality", "truth_seeking"
            ])
            
            # Validation
            if not text or len(text.strip()) == 0:
                self.send_error(400, "Text cannot be empty")
                return
            
            if len(text) > 10000:
                self.send_error(400, "Text too long. Maximum 10,000 characters.")
                return
            
            # Process text
            doc = nlp(text)
            text_lower = text.lower()
            
            all_issues = []
            
            # Detect biases based on requested types
            if "gender" in bias_types:
                all_issues.extend(detect_gender_bias(doc, text_lower))
            
            if "race" in bias_types:
                all_issues.extend(detect_race_bias(text_lower))
            
            if "age" in bias_types:
                all_issues.extend(detect_age_bias(text_lower))
            
            if "disability" in bias_types:
                all_issues.extend(detect_disability_bias(text_lower))
            
            if "culture" in bias_types:
                all_issues.extend(detect_cultural_bias(text_lower))
            
            if "political" in bias_types:
                all_issues.extend(detect_political_bias(text_lower))
            
            if "religion" in bias_types:
                all_issues.extend(detect_religion_bias(text_lower))
            
            if "lgbtq" in bias_types:
                all_issues.extend(detect_lgbtq_bias(text_lower))
            
            if "socioeconomic" in bias_types:
                all_issues.extend(detect_socioeconomic_bias(text_lower))
            
            if "truth_seeking" in bias_types:
                all_issues.extend(detect_truth_seeking_bias(text_lower))
            
            if "ideological_neutrality" in bias_types:
                all_issues.extend(detect_ideological_neutrality_bias(text_lower))
            
            # Detect intersectional bias if requested
            if "intersectional" in bias_types and len(all_issues) > 1:
                all_issues.extend(detect_intersectional_bias(all_issues))
            
            # Calculate results
            score = calculate_bias_score(all_issues)
            severity = get_severity_label(score)
            heatmap = create_heatmap(text, all_issues)
            
            # Create summary
            bias_type_counts = {}
            for issue in all_issues:
                bias_type_counts[issue["bias_type"]] = bias_type_counts.get(issue["bias_type"], 0) + 1
            
            if all_issues:
                summary = f"Found {len(all_issues)} potential bias issue(s): " + ", ".join(
                    f"{count} {bias_type}" for bias_type, count in bias_type_counts.items()
                )
            else:
                summary = "No significant biases detected. Great job!"
            
            # Send response
            response = {
                "score": score,
                "severity": severity,
                "issues": all_issues,
                "heatmap": heatmap,
                "summary": summary
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
