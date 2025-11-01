# BiasRadar.ai - Replit Project

## Overview
BiasRadar.ai is a comprehensive bias detection web application that analyzes text for hidden biases across five dimensions: gender, race, age, disability, and cultural biases. Built with modern web technologies and powered by AI.

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
  - `GET /`: Health check
  - `POST /scan`: Analyze text for biases
  - `POST /fix`: Generate bias-free version using AI

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

## Recent Changes (2025-11-01)

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
- PDF report generation
- Batch processing for multiple texts
- Advanced ML models with BERT embeddings
- Comparison feature for tracking improvements

## Deployment Notes
- Backend runs on port 8000 (workflow: `backend`)
- Frontend runs on port 5000 (workflow: `frontend`)
- Both workflows auto-restart on file changes
- Frontend requires VITE_API_URL to be set correctly for Replit environment
