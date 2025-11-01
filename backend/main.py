from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import spacy
import numpy as np
from openai import OpenAI
import os
import re

app = FastAPI(title="BiasRadar.ai API")

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

client = OpenAI()

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

class ScanRequest(BaseModel):
    text: str
    bias_types: List[str] = ["gender", "race", "age", "disability", "culture"]

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
    heatmap: List[Dict[str, any]]
    summary: str

class FixResponse(BaseModel):
    original_text: str
    fixed_text: str
    improvements: List[str]

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
        "message": "Welcome to BiasRadar.ai API",
        "version": "1.0.0",
        "endpoints": ["/scan", "/fix"]
    }

@app.post("/scan", response_model=ScanResponse)
async def scan_text(request: ScanRequest):
    if not request.text or len(request.text.strip()) == 0:
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    if len(request.text) > 5000:
        raise HTTPException(status_code=400, detail="Text too long. Maximum 5000 characters.")
    
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
                    "content": "You are a bias detection and correction expert. Your job is to rewrite text to remove all forms of bias including gender, racial, age, disability, and cultural bias. Maintain the core message but use inclusive, neutral language. Be concise and professional."
                },
                {
                    "role": "user",
                    "content": f"Rewrite this text to remove all biases while preserving the core message:\n\n{request.text}"
                }
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        fixed_text = response.choices[0].message.content.strip()
        
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
        
        improvements_text = improvements_response.choices[0].message.content.strip()
        improvements = [imp.strip() for imp in improvements_text.split('\n') if imp.strip() and not imp.strip().startswith('#')]
        improvements = [imp.lstrip('•-*123456789. ') for imp in improvements if imp][:5]
        
        return FixResponse(
            original_text=request.text,
            fixed_text=fixed_text,
            improvements=improvements if improvements else ["Removed biased language", "Used inclusive terminology", "Made text more neutral"]
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating fix: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
