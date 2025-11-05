export default async function handler(req, res) {
  const swaggerHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BiasRadar API Documentation</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.10.3/swagger-ui.css">
  <style>
    body { margin: 0; padding: 0; }
    .swagger-ui { background: #0f172a; }
    .swagger-ui .topbar { display: none; }
    .swagger-ui .info { margin: 20px 0; }
    .swagger-ui .info .title { color: #00D4FF; }
    .swagger-ui .scheme-container { background: #1e293b; }
    .swagger-ui .opblock { background: #1e293b; border-color: #334155; }
    .swagger-ui .opblock-summary { background: #1e40af; }
    .swagger-ui .opblock .opblock-section-header { background: #1e40af; }
    .swagger-ui .btn.authorize { background: #10b981; border-color: #10b981; }
    .swagger-ui .response-col_status { color: #10b981; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.10.3/swagger-ui-bundle.js"></script>
  <script>
    window.onload = function() {
      const spec = {
        "openapi": "3.0.0",
        "info": {
          "title": "BiasRadar API",
          "version": "1.0.0",
          "description": "Professional bias detection and text fixing API by ModelProof Technologies. Detect bias across 13 dimensions and automatically fix biased content using AI.\\n\\n**Character Limits:**\\n- Free/Demo Plans: 10,000 characters per request\\n- Paid Plans: 50,000 characters per request\\n\\n**Rate Limits:**\\n- Free/Demo Plans: 20 requests per day\\n- Paid Plans: Unlimited requests",
          "contact": {
            "name": "ModelProof Technologies",
            "url": "https://modelproof.ai",
            "email": "support@modelproof.ai"
          }
        },
        "servers": [
          {
            "url": "https://modelproof.ai/api",
            "description": "Production server"
          }
        ],
        "components": {
          "securitySchemes": {
            "BearerAuth": {
              "type": "http",
              "scheme": "bearer",
              "bearerFormat": "API_KEY",
              "description": "Enter your BiasRadar API key (format: bdr_xxxxx...)"
            }
          },
          "schemas": {
            "ScanRequest": {
              "type": "object",
              "required": ["text"],
              "properties": {
                "text": {
                  "type": "string",
                  "description": "Text to analyze for bias (max 10,000 chars for free/demo plans, 50,000 chars for paid plans)",
                  "example": "The chairman should ensure all employees are treated fairly."
                },
                "bias_types": {
                  "type": "array",
                  "description": "Optional array of specific bias types to check.",
                  "items": {
                    "type": "string",
                    "enum": ["gender", "race", "age", "disability", "culture", "political", "religious", "lgbtq", "socioeconomic", "truth_seeking", "ideological_neutrality", "intersectional", "language_tone"]
                  }
                }
              }
            },
            "FixRequest": {
              "type": "object",
              "required": ["text"],
              "properties": {
                "text": {
                  "type": "string",
                  "description": "Biased text to fix using AI (max 10,000 chars for free/demo plans, 50,000 chars for paid plans)",
                  "example": "The chairman should ensure all employees are treated fairly."
                }
              }
            }
          }
        },
        "security": [{ "BearerAuth": [] }],
        "paths": {
          "/scan": {
            "post": {
              "summary": "Scan text for bias",
              "description": "Analyze text for bias across 13 dimensions including gender, race, age, disability, culture, political, religious, LGBTQ+, socioeconomic, truth-seeking, ideological neutrality, intersectional, and language & tone.",
              "tags": ["Bias Detection"],
              "security": [{ "BearerAuth": [] }],
              "requestBody": {
                "required": true,
                "content": {
                  "application/json": {
                    "schema": { "$ref": "#/components/schemas/ScanRequest" }
                  }
                }
              },
              "responses": {
                "200": { "description": "Successful scan" },
                "400": { "description": "Bad request - invalid input or text exceeds character limit" },
                "401": { "description": "Unauthorized - invalid API key" },
                "429": { "description": "Rate limit exceeded (free/demo tier: 20 requests/day, paid tier: unlimited)" },
                "500": { "description": "Internal server error" }
              }
            }
          },
          "/fix": {
            "post": {
              "summary": "Fix biased text using AI",
              "description": "Automatically remove bias from text using AI-powered debiasing.",
              "tags": ["Bias Fixing"],
              "security": [{ "BearerAuth": [] }],
              "requestBody": {
                "required": true,
                "content": {
                  "application/json": {
                    "schema": { "$ref": "#/components/schemas/FixRequest" }
                  }
                }
              },
              "responses": {
                "200": { "description": "Successful fix" },
                "400": { "description": "Bad request" },
                "401": { "description": "Unauthorized" },
                "429": { "description": "Rate limit exceeded" },
                "500": { "description": "Internal server error" }
              }
            }
          }
        }
      };

      SwaggerUIBundle({
        spec: spec,
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIBundle.SwaggerUIStandalonePreset
        ]
      });
    }
  </script>
</body>
</html>
  `;

  res.setHeader('Content-Type', 'text/html');
  return res.send(swaggerHTML);
}
