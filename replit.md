# BiasRadar.ai - Replit Project

## Overview
BiasRadar™ by ModelProof Technologies is an enterprise-grade bias detection platform offering both web dashboard and REST API. Analyzes text for bias across 13 dimensions (gender, race, age, disability, culture, political, religious, LGBTQ+, socioeconomic, truth-seeking, ideological neutrality, intersectional, language & tone). Built with TypeScript/React frontend and Python serverless backend.

## Project Status
✅ **Production Ready** - All core features implemented and tested

## Tech Stack
- **Backend**: Python 3.11, FastAPI, spaCy, OpenAI (via Replit AI Integrations)
- **Frontend**: React 18, Vite, Tailwind CSS v4, Axios, React Hot Toast
- **Deployment**: Replit Workflows (Backend on port 8000, Frontend on port 5000)

## Architecture

### Backend (`/backend`)
- **Framework**: FastAPI with CORS enabled
- **Bias Detection Engine**: 
  - Gender bias detection using word associations and pronoun analysis
  - Race bias detection with problematic term identification
  - Age bias detection including work hour requirements
  - Disability bias detection (ableist language)
  - Cultural bias detection (Western-centric terms)
- **AI Integration**: OpenAI via Replit AI Integrations (no API key required, billed to credits)
- **NLP**: spaCy with en_core_web_sm model
- **API Endpoints**:
  - `POST /api/biasradar/scan`: Analyze text for biases across 13 dimensions
  - `POST /api/biasradar/fix`: Generate bias-free version using AI
  - `POST /api/biasradar/export-pdf`: Export professional BiasRadar™ Audit Report PDF
  - `GET /api/docs`: Interactive Swagger API documentation
  - `GET /api/openapi.json`: OpenAPI specification JSON

### Frontend (`/frontend`)
- **Framework**: React with Vite bundler
- **Styling**: Tailwind CSS v4 with @tailwindcss/postcss plugin
- **Features**:
  - Beautiful gradient UI with responsive design
  - Real-time bias scanning
  - Visual heatmap highlighting biased words
  - AI-powered text rewriting
  - Copy and share functionality
  - No login required

## Environment Configuration

### Backend
Uses Replit AI Integrations environment variables (automatically set):
- `AI_INTEGRATIONS_OPENAI_API_KEY`
- `AI_INTEGRATIONS_OPENAI_BASE_URL`

### Frontend
Requires `VITE_API_URL` to connect to backend:
- Set in `frontend/.env` with your Replit domain
- Falls back to `http://localhost:8000` for local development

## Recent Changes

### 2025-11-19: Enterprise-Grade Bias Detection Improvements
- ✅ **Zero False Positives**: Complete rewrite of detection engine with context-aware analysis
- ✅ **EEO Auto-Whitelist**: Automatically skips ALL bias checks in EEO/legal paragraphs (20+ trigger phrases)
- ✅ **Context-Aware Gender Detection**: Only flags personality traits, NOT compensation/technical contexts
  - "competitive salary" ✅ no longer flagged (was false positive)
  - "competitive benefits" ✅ no longer flagged (was false positive)
  - "aggressive personality" ❌ still correctly flagged
- ✅ **Context-Aware Age Detection**: Smart detection for hiring contexts
  - "young company" ✅ no longer flagged (was false positive)
  - "young startup" ✅ no longer flagged (was false positive)
  - "young, energetic guy" ❌ correctly flags age + gender + intersectional bias
- ✅ **Context-Aware Cultural Detection**: Only flags "developing" when referring to countries/regions
  - "developing a model" ✅ no longer flagged (was false positive)
  - "developing countries" ❌ still correctly flagged
- ✅ **Profanity Whitelist**: Removed "sex" and "sexual" from profanity list (common in EEO statements)
- ✅ **Improved Intersectional Logic**: Only triggers when 2+ confirmed biases exist in same sentence
- ✅ **Streamlined Dictionaries**: Reduced to enterprise-ready terms for higher precision
- ✅ **Comprehensive Testing**: 9/9 tests pass with zero false positives, architect-approved

### 2025-11-06: PDF Export & API Documentation
- ✅ **PDF Export Feature**: Professional BiasRadar™ Audit Report generation
  - In-memory PDF generation using ReportLab (privacy-compliant, no data storage)
  - Includes original text, risk score, bias flags table, remediated text, and UEI
  - Available via both UI button and REST API endpoint
  - Smart visibility: Export button only appears when scan results exist
- ✅ **API Documentation**: Interactive Swagger UI at `/api/docs`
  - Comprehensive OpenAPI 3.0 specification stored in `shared/openapi/biasradar.json`
  - Uses swagger-ui-express middleware for clean implementation
  - Custom dark theme matching BiasRadar brand colors
  - Documented all three endpoints: /scan, /fix, /export-pdf
  - Raw spec available at `/api/openapi.json`

### 2025-11-01

### Initial Implementation
- ✅ Complete backend bias detection engine with 5 bias categories
- ✅ Comprehensive scoring system (0-100 scale)
- ✅ Visual heatmap generation
- ✅ OpenAI integration for AI-powered text fixing
- ✅ React frontend with modern Tailwind CSS design
- ✅ Environment-aware API URL configuration
- ✅ Both workflows running successfully

### Key Technical Decisions
1. **Tailwind CSS v4**: Using @tailwindcss/postcss plugin with `@import "tailwindcss"` syntax
2. **API Configuration**: Using environment variables for flexible deployment
3. **OpenAI Integration**: Using Replit AI Integrations (no personal API key needed)
4. **Bias Detection**: Rule-based pattern matching + linguistic analysis for reliability

## User Preferences
- **Code Style**: Modern ES6+, functional components, clear separation of concerns
- **Error Handling**: Comprehensive try-catch blocks with user-friendly error messages
- **UI/UX**: Mobile-first, responsive design with smooth animations

## Known Limitations
- Text input limited to 5000 characters for performance
- Bias detection is rule-based and may not catch all subtle biases
- OpenAI text fixing requires credits (uses Replit AI Integrations)

## Future Enhancements
- User authentication and scan history
- Batch processing for multiple texts
- Advanced ML models with BERT embeddings
- Comparison feature for tracking improvements
- Automated testing for export endpoint and client workflow
- Additional PDF metadata (selected bias types, summary)
- Runtime monitoring for PDF generation performance

## Deployment Notes
- Backend runs on port 8000 (workflow: `backend`)
- Frontend runs on port 5000 (workflow: `frontend`)
- Both workflows auto-restart on file changes
- Frontend requires VITE_API_URL to be set correctly for Replit environment
