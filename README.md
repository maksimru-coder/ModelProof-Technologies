# BiasRadar.ai

A powerful bias detection tool that analyzes text for hidden biases across gender, race, age, disability, and cultural dimensions.

## Features

- **Real-time Bias Detection**: Scan text in under 5 seconds
- **Multi-dimensional Analysis**: Detects gender, race, age, disability, and cultural biases
- **Visual Heatmap**: Highlights biased words directly in your text
- **AI-Powered Fixing**: Generate bias-free alternatives using OpenAI
- **Beautiful UI**: Modern, responsive design built with React and Tailwind CSS
- **No Login Required**: Start scanning immediately

## Tech Stack

**Frontend:**
- React with Vite
- Tailwind CSS
- Axios for API calls
- React Hot Toast for notifications

**Backend:**
- FastAPI
- spaCy for NLP
- OpenAI via Replit AI Integrations
- NumPy for scoring

## How to Use

1. Paste your text into the text area
2. Select the types of biases you want to scan for (all selected by default)
3. Click "Scan Now" to analyze
4. Review the bias score, detected issues, and visual heatmap
5. Click "Fix This" to generate a bias-free version

## Example

**Input:**
"The best engineers are aggressive, dominant, and work 80-hour weeks."

**Output:**
- Bias Score: 78/100 (High Risk)
- Detected Issues: Gender bias in "aggressive" and "dominant", Age bias in "80-hour weeks"
- Fixed Version: "Top engineers are dedicated, proactive, and thrive in fast-paced environments."

## Development

This application is built on Replit and uses:
- Backend on port 8000
- Frontend on port 5000

### Environment Configuration

The frontend requires the `VITE_API_URL` environment variable to connect to the backend API. This is automatically configured in `frontend/.env`:

```
VITE_API_URL=https://[your-replit-domain]:8000
```

If you're running this locally, the frontend will automatically fall back to `http://localhost:8000`.

## Credits

Built with ❤️ using Replit, FastAPI, and React
