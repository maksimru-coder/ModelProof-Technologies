from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional, Any
import spacy
import numpy as np
from openai import OpenAI
import os
import re
import PyPDF2
from docx import Document
import io

app = FastAPI(title="BiasRadar API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    print("Downloading spaCy model...")
    import subprocess
    subprocess.run(["python", "-m", "spacy", "download", "en_core_web_sm"])
    nlp = spacy.load("en_core_web_sm")

AI_INTEGRATIONS_OPENAI_API_KEY = os.environ.get("AI_INTEGRATIONS_OPENAI_API_KEY")
AI_INTEGRATIONS_OPENAI_BASE_URL = os.environ.get("AI_INTEGRATIONS_OPENAI_BASE_URL")

client = OpenAI(
    api_key=AI_INTEGRATIONS_OPENAI_API_KEY,
    base_url=AI_INTEGRATIONS_OPENAI_BASE_URL
)

GENDER_BIAS_WORDS = {
    "male": ["aggressive", "dominant", "assertive", "competitive", "ambitious", "decisive", 
             "analytical", "logical", "independent", "confident", "strong", "tough", "bossy",
             "arrogant", "charismatic", "leader", "genius", "brilliant", "mastermind"],
    "female": ["nurturing", "supportive", "emotional", "sensitive", "caring", "empathetic",
               "collaborative", "warm", "gentle", "sympathetic", "compassionate", "sweet",
               "bubbly", "ditzy", "bossy", "shrill", "hysterical", "dramatic"]
}

RACE_BIAS_WORDS = {
    "problematic": ["exotic", "articulate", "urban", "inner-city", "ghetto", "thug", 
                    "oriental", "primitive", "tribal", "uncivilized", "savage",
                    "well-spoken", "eloquent", "clean-cut", "uppity"]
}

AGE_BIAS_WORDS = {
    "youth": ["energetic", "innovative", "tech-savvy", "fresh", "dynamic", "passionate"],
    "older": ["experienced", "traditional", "old-fashioned", "outdated", "slow", "resistant to change",
              "set in their ways", "elderly", "senior", "retirement", "dinosaur"]
}

DISABILITY_BIAS_WORDS = {
    "ableist": ["crazy", "insane", "psycho", "lame", "dumb", "blind to", "deaf to", 
                "crippled", "handicapped", "retarded", "stupid", "idiotic", "moronic",
                "wheelchair-bound", "confined to a wheelchair", "suffers from", "victim of"]
}

CULTURAL_BIAS_WORDS = {
    "western_centric": ["normal", "exotic", "foreign", "alien", "traditional dress",
                        "third world", "developing", "primitive", "backwards", "civilized",
                        "oriental", "native", "tribal"]
}

POLITICAL_BIAS_WORDS = {
    "partisan": ["woke", "snowflake", "libtard", "conservative", "liberal agenda", "far-left", "far-right",
                 "radical left", "alt-right", "social justice warrior", "sjw", "politically correct",
                 "virtue signaling", "cancel culture", "indoctrination", "brainwashed", "sheeple",
                 "fake news", "mainstream media", "deep state", "communist", "socialist agenda"],
    "ideological": ["obviously", "clearly", "everyone knows", "common sense", "natural law",
                    "traditional values", "family values", "real american", "patriotic"]
}

RELIGION_BIAS_WORDS = {
    "problematic": ["infidel", "heathen", "godless", "pagan", "cult", "radical islam", 
                    "fundamentalist", "extremist", "judeo-christian", "christian nation",
                    "backwards religion", "primitive beliefs", "superstitious", "jihadist",
                    "crusade", "holy war", "religious fanatic"]
}

LGBTQ_BIAS_WORDS = {
    "problematic": ["lifestyle choice", "sexual preference", "homosexual agenda", "gay lifestyle",
                    "unnatural", "normal", "traditional family", "real man", "real woman",
                    "born male", "born female", "biological male", "biological female",
                    "transvestite", "transsexual", "hermaphrodite", "cross-dresser",
                    "lifestyle", "deviant", "perversion", "confused"]
}

SOCIOECONOMIC_BIAS_WORDS = {
    "class_based": ["low class", "welfare queen", "trailer trash", "ghetto", "hood", "inner-city",
                    "underprivileged", "disadvantaged", "less fortunate", "poor people",
                    "uneducated", "blue collar", "working class", "elitist", "privileged",
                    "trust fund baby", "silver spoon", "entitled", "lazy poor"]
}

TRUTH_SEEKING_WORDS = {
    "unsubstantiated": ["it's a fact that", "undeniable truth", "without a doubt",
                        "proven fact", "experts all agree", "scientists all agree",
                        "the truth is", "impossible to deny", "irrefutable fact",
                        "indisputable fact", "beyond question", "absolute truth", "undeniable fact"],
    "overgeneralization": ["always wrong", "never works", "nobody believes",
                           "100% guaranteed", "completely impossible", "totally false",
                           "entirely untrue", "perfectly clear that", "obviously true", "obviously false"]
}

IDEOLOGICAL_NEUTRALITY_WORDS = {
    "non_neutral_framing": ["the establishment", "the elite", "the system",
                            "big tech", "big pharma", "globalist agenda",
                            "controlled opposition", "power structure", "ruling class"],
    "dismissive_framing": ["so-called experts", "so-called science",
                           "official narrative", "they want you to believe", "they're lying to you",
                           "don't be fooled", "wake up people", "open your eyes people",
                           "do your own research", "question everything they say"],
    "absolutist_framing": ["the only solution", "the real problem", "what's really happening",
                           "the real agenda", "the hidden truth", "what they won't tell you",
                           "the actual facts", "the only answer"]
}

class ScanRequest(BaseModel):
    text: str
    bias_types: List[str] = ["gender", "race", "age", "disability", "lgbtq", "religion", "socioeconomic", "culture", "intersectional", "political", "ideological_neutrality", "truth_seeking"]

class FixRequest(BaseModel):
    text: str

class BiasIssue(BaseModel):
    word: str
    bias_type: str
    severity: str
    explanation: str
    position: int

class ScanResponse(BaseModel):
    score: int
    severity: str
    issues: List[BiasIssue]
    heatmap: List[Dict[str, Any]]
    summary: str

class FixResponse(BaseModel):
    original_text: str
    fixed_text: str
    improvements: List[str]

class UploadScanResponse(BaseModel):
    score: int
    severity: str
    issues: List[BiasIssue]
    heatmap: List[Dict[str, Any]]
    summary: str
    original_file_name: str
    extracted_text: str

def calculate_bias_score(issues: List[BiasIssue]) -> int:
    if not issues:
        return 0
    
    severity_weights = {"low": 15, "medium": 35, "high": 60}
    total_score = sum(severity_weights[issue.severity] for issue in issues)
    
    normalized_score = min(100, total_score)
    return normalized_score

def get_severity_label(score: int) -> str:
    if score < 30:
        return "Low Risk"
    elif score < 60:
        return "Medium Risk"
    else:
        return "High Risk"

def detect_gender_bias(doc, text_lower: str) -> List[BiasIssue]:
    issues = []
    
    for category, words in GENDER_BIAS_WORDS.items():
        for word in words:
            pattern = r'\b' + re.escape(word) + r'\b'
            for match in re.finditer(pattern, text_lower, re.IGNORECASE):
                position = match.start()
                actual_word = text_lower[position:match.end()]
                
                severity = "high" if word in ["bossy", "hysterical", "shrill", "aggressive", "dominant"] else "medium"
                
                if category == "male":
                    explanation = f"'{actual_word}' is often associated with masculine stereotypes and may reinforce gender bias"
                else:
                    explanation = f"'{actual_word}' reinforces feminine stereotypes and may limit perception"
                
                issues.append(BiasIssue(
                    word=actual_word,
                    bias_type="gender",
                    severity=severity,
                    explanation=explanation,
                    position=position
                ))
    
    gendered_pronouns = {"he": "male", "she": "female", "his": "male", "her": "female", 
                          "him": "male", "himself": "male", "herself": "female"}
    pronoun_count = {"male": 0, "female": 0}
    
    for token in doc:
        if token.text.lower() in gendered_pronouns:
            pronoun_count[gendered_pronouns[token.text.lower()]] += 1
    
    total_pronouns = sum(pronoun_count.values())
    if total_pronouns > 3:
        ratio = max(pronoun_count.values()) / total_pronouns if total_pronouns > 0 else 0
        if ratio > 0.7:
            issues.append(BiasIssue(
                word="pronoun imbalance",
                bias_type="gender",
                severity="medium",
                explanation=f"Pronoun usage is heavily skewed ({pronoun_count}), which may indicate gender bias",
                position=0
            ))
    
    return issues

def detect_race_bias(text_lower: str) -> List[BiasIssue]:
    issues = []
    
    for word in RACE_BIAS_WORDS["problematic"]:
        pattern = r'\b' + re.escape(word) + r'\b'
        for match in re.finditer(pattern, text_lower, re.IGNORECASE):
            position = match.start()
            actual_word = text_lower[position:match.end()]
            
            severity = "high" if word in ["exotic", "thug", "savage", "primitive"] else "medium"
            
            issues.append(BiasIssue(
                word=actual_word,
                bias_type="race",
                severity=severity,
                explanation=f"'{actual_word}' carries racial connotations and should be avoided",
                position=position
            ))
    
    return issues

def detect_age_bias(text_lower: str) -> List[BiasIssue]:
    issues = []
    
    for category, words in AGE_BIAS_WORDS.items():
        for word in words:
            pattern = r'\b' + re.escape(word) + r'\b'
            for match in re.finditer(pattern, text_lower, re.IGNORECASE):
                position = match.start()
                actual_word = text_lower[position:match.end()]
                
                severity = "high" if word in ["outdated", "old-fashioned", "dinosaur", "slow"] else "medium"
                
                if category == "older":
                    explanation = f"'{actual_word}' may stereotype older individuals"
                else:
                    explanation = f"'{actual_word}' may exclude or stereotype based on age"
                
                issues.append(BiasIssue(
                    word=actual_word,
                    bias_type="age",
                    severity=severity,
                    explanation=explanation,
                    position=position
                ))
    
    age_patterns = [
        (r'\b\d{2,3}[\s-]hour weeks?\b', "high", "Extreme work hours may discriminate against people with caregiving responsibilities or health limitations"),
        (r'\byoung and\b', "medium", "Phrases like 'young and' can exclude older candidates"),
        (r'\bdigital native\b', "medium", "'Digital native' assumes age-based technical ability"),
    ]
    
    for pattern, severity, explanation in age_patterns:
        for match in re.finditer(pattern, text_lower, re.IGNORECASE):
            position = match.start()
            actual_word = text_lower[position:match.end()]
            issues.append(BiasIssue(
                word=actual_word,
                bias_type="age",
                severity=severity,
                explanation=explanation,
                position=position
            ))
    
    return issues

def detect_disability_bias(text_lower: str) -> List[BiasIssue]:
    issues = []
    
    for word in DISABILITY_BIAS_WORDS["ableist"]:
        pattern = r'\b' + re.escape(word) + r'\b'
        for match in re.finditer(pattern, text_lower, re.IGNORECASE):
            position = match.start()
            actual_word = text_lower[position:match.end()]
            
            severity = "high" if word in ["retarded", "crippled", "crazy", "insane"] else "medium"
            
            issues.append(BiasIssue(
                word=actual_word,
                bias_type="disability",
                severity=severity,
                explanation=f"'{actual_word}' is ableist language that should be avoided",
                position=position
            ))
    
    return issues

def detect_cultural_bias(text_lower: str) -> List[BiasIssue]:
    issues = []
    
    for word in CULTURAL_BIAS_WORDS["western_centric"]:
        pattern = r'\b' + re.escape(word) + r'\b'
        for match in re.finditer(pattern, text_lower, re.IGNORECASE):
            position = match.start()
            actual_word = text_lower[position:match.end()]
            
            severity = "high" if word in ["exotic", "primitive", "backwards", "savage"] else "medium"
            
            issues.append(BiasIssue(
                word=actual_word,
                bias_type="culture",
                severity=severity,
                explanation=f"'{actual_word}' may reflect cultural bias or Western-centric thinking",
                position=position
            ))
    
    return issues

def detect_political_bias(text_lower: str) -> List[BiasIssue]:
    issues = []
    
    for category, words in POLITICAL_BIAS_WORDS.items():
        for word in words:
            pattern = r'\b' + re.escape(word) + r'\b'
            for match in re.finditer(pattern, text_lower, re.IGNORECASE):
                position = match.start()
                actual_word = text_lower[position:match.end()]
                
                severity = "high" if word in ["woke", "libtard", "snowflake", "brainwashed", "sheeple", "fake news"] else "medium"
                
                if category == "partisan":
                    explanation = f"'{actual_word}' reflects partisan political bias and divisive language"
                else:
                    explanation = f"'{actual_word}' contains ideological assumptions that may not be universally shared"
                
                issues.append(BiasIssue(
                    word=actual_word,
                    bias_type="political",
                    severity=severity,
                    explanation=explanation,
                    position=position
                ))
    
    return issues

def detect_religion_bias(text_lower: str) -> List[BiasIssue]:
    issues = []
    
    for word in RELIGION_BIAS_WORDS["problematic"]:
        pattern = r'\b' + re.escape(word) + r'\b'
        for match in re.finditer(pattern, text_lower, re.IGNORECASE):
            position = match.start()
            actual_word = text_lower[position:match.end()]
            
            severity = "high" if word in ["infidel", "heathen", "jihadist", "crusade", "holy war"] else "medium"
            
            issues.append(BiasIssue(
                word=actual_word,
                bias_type="religion",
                severity=severity,
                explanation=f"'{actual_word}' contains religious bias or stereotyping",
                position=position
            ))
    
    return issues

def detect_lgbtq_bias(text_lower: str) -> List[BiasIssue]:
    issues = []
    
    for word in LGBTQ_BIAS_WORDS["problematic"]:
        pattern = r'\b' + re.escape(word) + r'\b'
        for match in re.finditer(pattern, text_lower, re.IGNORECASE):
            position = match.start()
            actual_word = text_lower[position:match.end()]
            
            severity = "high" if word in ["lifestyle choice", "unnatural", "deviant", "perversion", "confused"] else "medium"
            
            issues.append(BiasIssue(
                word=actual_word,
                bias_type="lgbtq",
                severity=severity,
                explanation=f"'{actual_word}' reflects bias against LGBTQ+ individuals and non-binary identities",
                position=position
            ))
    
    return issues

def detect_socioeconomic_bias(text_lower: str) -> List[BiasIssue]:
    issues = []
    
    for word in SOCIOECONOMIC_BIAS_WORDS["class_based"]:
        pattern = r'\b' + re.escape(word) + r'\b'
        for match in re.finditer(pattern, text_lower, re.IGNORECASE):
            position = match.start()
            actual_word = text_lower[position:match.end()]
            
            severity = "high" if word in ["welfare queen", "trailer trash", "lazy poor"] else "medium"
            
            issues.append(BiasIssue(
                word=actual_word,
                bias_type="socioeconomic",
                severity=severity,
                explanation=f"'{actual_word}' contains class-based bias or socioeconomic stereotyping",
                position=position
            ))
    
    return issues

def detect_intersectional_bias(all_issues: List[BiasIssue]) -> List[BiasIssue]:
    """Detect intersectional bias by finding overlapping biases on the same or nearby words"""
    intersectional_issues = []
    
    # Group issues by position proximity (within 20 characters)
    for i, issue1 in enumerate(all_issues):
        for issue2 in all_issues[i+1:]:
            # Check if issues are close together and of different types
            if (abs(issue1.position - issue2.position) <= 20 and 
                issue1.bias_type != issue2.bias_type):
                
                # Create an intersectional issue
                combined_types = f"{issue1.bias_type} + {issue2.bias_type}"
                intersectional_issues.append(BiasIssue(
                    word=f"{issue1.word}/{issue2.word}",
                    bias_type="intersectional",
                    severity="high",
                    explanation=f"Intersectional bias detected: {combined_types} - overlapping discriminations amplify harm",
                    position=min(issue1.position, issue2.position)
                ))
    
    return intersectional_issues

def detect_truth_seeking_bias(text_lower: str) -> List[BiasIssue]:
    """Detect deviations from factual accuracy and unsubstantiated claims"""
    issues = []
    
    # Check for unsubstantiated claims - these are multi-word phrases that signal overconfidence
    for phrase in TRUTH_SEEKING_WORDS["unsubstantiated"]:
        pattern = re.escape(phrase)
        for match in re.finditer(pattern, text_lower, re.IGNORECASE):
            position = match.start()
            actual_phrase = text_lower[position:match.end()]
            
            severity = "high" if phrase in ["proven fact", "irrefutable fact", "indisputable fact", "absolute truth", "undeniable fact"] else "medium"
            
            issues.append(BiasIssue(
                word=actual_phrase,
                bias_type="truth_seeking",
                severity=severity,
                explanation=f"'{actual_phrase}' signals an overconfident assertion that may not be backed by sufficient evidence",
                position=position
            ))
    
    # Check for overgeneralizations - multi-word phrases that make absolute claims
    for phrase in TRUTH_SEEKING_WORDS["overgeneralization"]:
        pattern = re.escape(phrase)
        for match in re.finditer(pattern, text_lower, re.IGNORECASE):
            position = match.start()
            actual_phrase = text_lower[position:match.end()]
            
            issues.append(BiasIssue(
                word=actual_phrase,
                bias_type="truth_seeking",
                severity="medium",
                explanation=f"'{actual_phrase}' is an overgeneralization that oversimplifies complex realities",
                position=position
            ))
    
    return issues

def detect_ideological_neutrality_bias(text_lower: str) -> List[BiasIssue]:
    """Detect non-neutral framing and ideological presentation"""
    issues = []
    
    # Check for non-neutral framing (institutional/systemic framing)
    for phrase in IDEOLOGICAL_NEUTRALITY_WORDS["non_neutral_framing"]:
        pattern = re.escape(phrase)
        for match in re.finditer(pattern, text_lower, re.IGNORECASE):
            position = match.start()
            actual_phrase = text_lower[position:match.end()]
            
            severity = "high" if phrase in ["the deep state", "globalist agenda", "right-wing extremists", "left-wing radicals"] else "medium"
            
            issues.append(BiasIssue(
                word=actual_phrase,
                bias_type="ideological_neutrality",
                severity=severity,
                explanation=f"'{actual_phrase}' uses non-neutral framing that assumes a particular ideological stance",
                position=position
            ))
    
    # Check for dismissive framing (undermining expertise/authority)
    for phrase in IDEOLOGICAL_NEUTRALITY_WORDS["dismissive_framing"]:
        pattern = re.escape(phrase)
        for match in re.finditer(pattern, text_lower, re.IGNORECASE):
            position = match.start()
            actual_phrase = text_lower[position:match.end()]
            
            issues.append(BiasIssue(
                word=actual_phrase,
                bias_type="ideological_neutrality",
                severity="high",
                explanation=f"'{actual_phrase}' dismissively frames information to push a particular narrative",
                position=position
            ))
    
    # Check for absolutist framing (claiming sole truth)
    for phrase in IDEOLOGICAL_NEUTRALITY_WORDS["absolutist_framing"]:
        pattern = re.escape(phrase)
        for match in re.finditer(pattern, text_lower, re.IGNORECASE):
            position = match.start()
            actual_phrase = text_lower[position:match.end()]
            
            severity = "high" if phrase in ["the only solution", "the only answer", "what they won't tell you"] else "medium"
            
            issues.append(BiasIssue(
                word=actual_phrase,
                bias_type="ideological_neutrality",
                severity=severity,
                explanation=f"'{actual_phrase}' presents claims in absolutist terms that discourage alternative perspectives",
                position=position
            ))
    
    return issues

def create_heatmap(text: str, issues: List[BiasIssue]) -> List[Dict]:
    heatmap = []
    words = text.split()
    current_pos = 0
    
    for word in words:
        word_start = text.find(word, current_pos)
        word_end = word_start + len(word)
        
        matching_issues = [
            issue for issue in issues 
            if word_start <= issue.position < word_end or 
            issue.position <= word_start < issue.position + len(issue.word)
        ]
        
        if matching_issues:
            max_severity = max(
                (issue.severity for issue in matching_issues),
                key=lambda s: {"low": 1, "medium": 2, "high": 3}[s]
            )
            bias_types = list(set(issue.bias_type for issue in matching_issues))
            
            heatmap.append({
                "word": word,
                "biased": True,
                "severity": max_severity,
                "bias_types": bias_types
            })
        else:
            heatmap.append({
                "word": word,
                "biased": False,
                "severity": "none",
                "bias_types": []
            })
        
        current_pos = word_end
    
    return heatmap

@app.get("/")
async def root():
    return {
        "message": "Welcome to BiasRadar API",
        "version": "2.0.0",
        "endpoints": ["/scan", "/fix", "/upload-and-scan"]
    }

@app.post("/scan", response_model=ScanResponse)
async def scan_text(request: ScanRequest):
    if not request.text or len(request.text.strip()) == 0:
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    if len(request.text) > 10000:
        raise HTTPException(status_code=400, detail="Text too long. Maximum 10,000 characters.")
    
    doc = nlp(request.text)
    text_lower = request.text.lower()
    
    all_issues = []
    
    if "gender" in request.bias_types:
        all_issues.extend(detect_gender_bias(doc, text_lower))
    
    if "race" in request.bias_types:
        all_issues.extend(detect_race_bias(text_lower))
    
    if "age" in request.bias_types:
        all_issues.extend(detect_age_bias(text_lower))
    
    if "disability" in request.bias_types:
        all_issues.extend(detect_disability_bias(text_lower))
    
    if "culture" in request.bias_types:
        all_issues.extend(detect_cultural_bias(text_lower))
    
    if "political" in request.bias_types:
        all_issues.extend(detect_political_bias(text_lower))
    
    if "religion" in request.bias_types:
        all_issues.extend(detect_religion_bias(text_lower))
    
    if "lgbtq" in request.bias_types:
        all_issues.extend(detect_lgbtq_bias(text_lower))
    
    if "socioeconomic" in request.bias_types:
        all_issues.extend(detect_socioeconomic_bias(text_lower))
    
    if "truth_seeking" in request.bias_types:
        all_issues.extend(detect_truth_seeking_bias(text_lower))
    
    if "ideological_neutrality" in request.bias_types:
        all_issues.extend(detect_ideological_neutrality_bias(text_lower))
    
    # Detect intersectional bias if requested
    if "intersectional" in request.bias_types and len(all_issues) > 1:
        all_issues.extend(detect_intersectional_bias(all_issues))
    
    score = calculate_bias_score(all_issues)
    severity = get_severity_label(score)
    heatmap = create_heatmap(request.text, all_issues)
    
    bias_type_counts = {}
    for issue in all_issues:
        bias_type_counts[issue.bias_type] = bias_type_counts.get(issue.bias_type, 0) + 1
    
    if all_issues:
        summary = f"Found {len(all_issues)} potential bias issue(s): " + ", ".join(
            f"{count} {bias_type}" for bias_type, count in bias_type_counts.items()
        )
    else:
        summary = "No significant biases detected. Great job!"
    
    return ScanResponse(
        score=score,
        severity=severity,
        issues=all_issues,
        heatmap=heatmap,
        summary=summary
    )

@app.post("/fix", response_model=FixResponse)
async def fix_text(request: FixRequest):
    if not request.text or len(request.text.strip()) == 0:
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a bias detection and correction expert. Your job is to rewrite text to remove all forms of bias including gender, racial, age, disability, cultural, political, religious, LGBTQ+, socioeconomic, and intersectional bias. Maintain the core message but use inclusive, neutral language. Be concise and professional."
                },
                {
                    "role": "user",
                    "content": f"Rewrite this text to remove all biases while preserving the core message:\n\n{request.text}"
                }
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        fixed_text = (response.choices[0].message.content or "").strip()
        
        improvements_response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "List 3-5 specific improvements made to remove bias. Be brief and specific."
                },
                {
                    "role": "user",
                    "content": f"Original: {request.text}\n\nRevised: {fixed_text}\n\nList the key improvements:"
                }
            ],
            temperature=0.5,
            max_tokens=200
        )
        
        improvements_text = (improvements_response.choices[0].message.content or "").strip()
        improvements = [imp.strip() for imp in improvements_text.split('\n') if imp.strip() and not imp.strip().startswith('#')]
        improvements = [imp.lstrip('•-*123456789. ') for imp in improvements if imp][:5]
        
        return FixResponse(
            original_text=request.text,
            fixed_text=fixed_text,
            improvements=improvements if improvements else ["Removed biased language", "Used inclusive terminology", "Made text more neutral"]
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating fix: {str(e)}")

@app.post("/upload-and-scan", response_model=UploadScanResponse)
async def upload_and_scan(
    file: UploadFile = File(...),
    bias_types: str = Form(default='["gender","race","age","disability","culture","political","religion","lgbtq","socioeconomic","intersectional"]')
):
    """Upload a file (PDF, DOC, DOCX, TXT) and scan it for biases"""
    
    # Check file size (max 5MB)
    contents = await file.read()
    file_size_mb = len(contents) / (1024 * 1024)
    if file_size_mb > 5:
        raise HTTPException(status_code=400, detail=f"File too large ({file_size_mb:.1f}MB). Maximum size is 5MB.")
    
    # Get file extension
    filename = file.filename or "unknown"
    file_ext = filename.lower().split('.')[-1] if '.' in filename else ''
    
    # Extract text based on file type
    extracted_text = ""
    try:
        if file_ext == 'pdf':
            # Extract from PDF
            pdf_file = io.BytesIO(contents)
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            text_parts = []
            for page in pdf_reader.pages:
                text_parts.append(page.extract_text())
            extracted_text = '\n'.join(text_parts)
            
        elif file_ext in ['doc', 'docx']:
            # Extract from Word document
            doc_file = io.BytesIO(contents)
            doc = Document(doc_file)
            text_parts = [paragraph.text for paragraph in doc.paragraphs]
            extracted_text = '\n'.join(text_parts)
            
        elif file_ext == 'txt':
            # Extract from text file
            extracted_text = contents.decode('utf-8', errors='ignore')
            
        else:
            raise HTTPException(
                status_code=400, 
                detail=f"Unsupported file type: {file_ext}. Please upload PDF, DOC, DOCX, or TXT files."
            )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error extracting text from file: {str(e)}")
    
    # Check if we extracted any text
    if not extracted_text or len(extracted_text.strip()) == 0:
        raise HTTPException(status_code=400, detail="No text could be extracted from the file. Please ensure the file contains readable text.")
    
    # Truncate to 10,000 characters if needed
    original_length = len(extracted_text)
    if original_length > 10000:
        extracted_text = extracted_text[:10000] + "..."
    
    # Parse bias_types from JSON string
    import json
    try:
        bias_types_list = json.loads(bias_types)
    except:
        bias_types_list = ["gender", "race", "age", "disability", "culture", "political", "religion", "lgbtq", "socioeconomic", "intersectional"]
    
    # Run bias detection
    doc = nlp(extracted_text)
    text_lower = extracted_text.lower()
    
    all_issues = []
    
    if "gender" in bias_types_list:
        all_issues.extend(detect_gender_bias(doc, text_lower))
    
    if "race" in bias_types_list:
        all_issues.extend(detect_race_bias(text_lower))
    
    if "age" in bias_types_list:
        all_issues.extend(detect_age_bias(text_lower))
    
    if "disability" in bias_types_list:
        all_issues.extend(detect_disability_bias(text_lower))
    
    if "culture" in bias_types_list:
        all_issues.extend(detect_cultural_bias(text_lower))
    
    if "political" in bias_types_list:
        all_issues.extend(detect_political_bias(text_lower))
    
    if "religion" in bias_types_list:
        all_issues.extend(detect_religion_bias(text_lower))
    
    if "lgbtq" in bias_types_list:
        all_issues.extend(detect_lgbtq_bias(text_lower))
    
    if "socioeconomic" in bias_types_list:
        all_issues.extend(detect_socioeconomic_bias(text_lower))
    
    if "intersectional" in bias_types_list and len(all_issues) > 1:
        all_issues.extend(detect_intersectional_bias(all_issues))
    
    score = calculate_bias_score(all_issues)
    severity = get_severity_label(score)
    heatmap = create_heatmap(extracted_text, all_issues)
    
    bias_type_counts = {}
    for issue in all_issues:
        bias_type_counts[issue.bias_type] = bias_type_counts.get(issue.bias_type, 0) + 1
    
    if all_issues:
        summary = f"Found {len(all_issues)} potential bias issue(s) in uploaded file: " + ", ".join(
            f"{count} {bias_type}" for bias_type, count in bias_type_counts.items()
        )
    else:
        summary = "No significant biases detected in uploaded file. Great job!"
    
    return UploadScanResponse(
        score=score,
        severity=severity,
        issues=all_issues,
        heatmap=heatmap,
        summary=summary,
        original_file_name=filename,
        extracted_text=extracted_text[:500] + "..." if len(extracted_text) > 500 else extracted_text  # Return first 500 chars for preview
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
