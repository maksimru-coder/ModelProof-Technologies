# Shared bias detection logic for BiasRadar - Enterprise Edition
# Updated with context-aware detection and EEO auto-whitelist
import re
from typing import List, Dict, Any

# Import profanity detection
try:
    from better_profanity import profanity
    profanity.load_censor_words()
    PROFANITY_AVAILABLE = True
except ImportError:
    PROFANITY_AVAILABLE = False

# EEO WHITELIST - Skip ALL bias checks in these paragraphs
EEO_WHITELIST_PHRASES = [
    "equal employment opportunity",
    "we provide equal employment",
    "without regard to",
    "protected veteran",
    "sex, national origin",
    "color, religion, sex",
    "genetic information",
    "disability status",
    "sexual orientation",
    "gender identity",
    "gender expression",
    "fair chance ordinance",
    "eeo statement",
    "affirmative action",
    "qualified applicants will receive consideration",
    "employment decisions will be based on",
    "compliant with federal, state, and local laws",
    "no discrimination shall be made",
    "we are an equal opportunity employer",
    "equal employment",
    "race, color, religion",
    "veteran status"
]

# Context keywords that remove gender-coded flags
GENDER_CONTEXT_WHITELIST = [
    "salary", "compensation", "benefits", "package", "market",
    "competitive salary", "competitive benefits", "competitive pay",
    "skills", "performance", "metrics", "deliverables", "results",
    "technical", "programming", "engineering", "development"
]

# Bias word dictionaries - Updated enterprise-ready version
GENDER_BIAS_WORDS = {
    "gendered_titles": ["chairman", "chairwoman", "salesman", "salesmen", "saleswoman", "saleswomen",
                        "policeman", "policemen", "policewoman", "policewomen",
                        "fireman", "firemen", "firewoman", "firewomen",
                        "businessman", "businessmen", "businesswoman", "businesswomen",
                        "congressman", "congressmen", "congresswoman", "congresswomen",
                        "spokesman", "spokesmen", "spokeswoman", "spokeswomen",
                        "mailman", "mailmen", "postman", "postmen",
                        "stewardess", "steward", "waitress", "waiter", "actress", "actor",
                        "manpower", "mankind", "man-made", "man hours", "man-hours",
                        "manmade", "workman", "workmen", "foreman", "foremen",
                        "anchorman", "anchormen", "anchorwoman", "anchorwomen",
                        "cameraman", "cameramen", "guy", "guys", "gal", "gals"],
    "male_stereotypes": ["aggressive", "dominant", "assertive", "competitive", "ambitious", "fearless",
                         "strong", "tough"],
    "female_stereotypes": ["supportive", "nurturing", "empathetic", "sensitive", "polite", "helpful"]
}

RACE_BIAS_WORDS = {
    "problematic": ["exotic", "articulate", "urban", "inner-city", "ghetto", "thug", 
                    "oriental", "primitive", "tribal", "uncivilized", "savage",
                    "well-spoken", "eloquent", "clean-cut", "uppity", "colored", "negro",
                    "illegal alien", "illegal immigrant", "illegals", "aliens",
                    "foreigner", "foreign-looking", "un-american", "go back to",
                    "you people", "those people", "culturally backward", "third world",
                    "undocumented residents", "undocumented immigrants"],
    "stereotypes": ["naturally good at math", "good at math", "bad drivers", "poor drivers",
                    "super predator", "welfare queen", "anchor baby", "model minority",
                    "lazy mexicans", "criminal blacks", "terrorist arabs", "sneaky asians",
                    "all asians", "all blacks", "all whites", "all hispanics", "all latinos",
                    "blacks are", "asians are", "whites are", "hispanics are", "latinos are"],
    "coded_language": ["chicago", "detroit", "baltimore", "urban youth", "inner city youth",
                       "gang member", "gangbanger", "hood rat", "welfare recipient",
                       "diversity hire", "quota hire", "affirmative action hire"]
}

AGE_BIAS_WORDS = {
    "youth_phrases": ["digital native", "recent graduate"],
    "youth_context_sensitive": ["young"],  # Only flag in hiring/personality contexts
    "older": ["overqualified", "older workers", "senior citizen",
              "too old to learn", "past their prime", "outdated", "set in their ways"]
}

# Contexts where "young" indicates age bias (hiring descriptors)
AGE_CONTEXT_HIRING = [
    "energetic", "dynamic", "ambitious", "driven", "fresh",
    "looking for", "seeking", "candidate", "applicant", "hire",
    "employee", "worker", "team member", "professional"
]

# Contexts where "young" is neutral (avoid false positives)
AGE_CONTEXT_NEUTRAL = [
    "company", "startup", "business", "organization", "industry",
    "technology", "field", "market", "children", "kids"
]

DISABILITY_BIAS_WORDS = {
    "ableist": ["crazy", "insane", "blind to", "lame", "crippling", "handicapped",
                "wheelchair-bound", "confined to a wheelchair", "suffers from", "victim of"]
}

CULTURAL_BIAS_WORDS = {
    "western_centric": ["exotic", "foreign", "alien", "traditional dress",
                        "primitive", "backwards", "civilized", "oriental", "native", "tribal"]
}

POLITICAL_BIAS_WORDS = {
    "partisan": ["woke", "snowflake", "like snowflakes", "acting like snowflakes",
                 "libtard", "liberal agenda", "far-left", "far-right",
                 "radical left", "alt-right", "social justice warrior", "sjw",
                 "virtue signaling", "cancel culture", "brainwashed", "sheeple",
                 "fake news", "mainstream media", "deep state"],
    "ideological": ["obviously", "clearly", "everyone knows", "common sense",
                    "traditional values", "family values", "real american", "real americans"],
    "extremist_labels": ["libtards", "conservatards", "trumptards", "democrats want", "republicans want",
                         "liberals are", "conservatives are", "the left wants to destroy",
                         "right-wing extremist", "left-wing extremist", "communist plot",
                         "socialist takeover", "fascist", "nazi", "marxist", "domestic terrorist"]
}

RELIGION_BIAS_WORDS = {
    "problematic": ["infidel", "heathen", "godless", "pagan", "cult", "radical islam", 
                    "fundamentalist", "extremist", "backwards religion", "primitive beliefs",
                    "superstitious", "jihadist", "crusade", "holy war", "religious fanatic"],
    "stereotypes": ["all muslims", "all christians", "all jews", "all hindus", "all buddhists",
                    "all atheists", "muslims are", "christians are", "jews are", "hindus are",
                    "atheists are", "islamist", "terrorist religion", "false prophet",
                    "muslim extremist", "islamic terrorist", "christian fanatic", "jewish conspiracy"]
}

LGBTQ_BIAS_WORDS = {
    "problematic": ["lifestyle choice", "sexual preference", "homosexual agenda", "gay lifestyle",
                    "unnatural", "transgender agenda", "transgender ideology",
                    "traditional family", "real man", "real woman",
                    "born male", "born female", "biological male", "biological female",
                    "transvestite", "transsexual", "hermaphrodite", "cross-dresser",
                    "deviant", "perversion", "confused"]
}

SOCIOECONOMIC_BIAS_WORDS = {
    "class_based": ["low class", "high class", "on welfare", "poor background",
                    "welfare queen", "trailer trash", "ghetto", "hood"],
    "stereotypes": ["poor people are lazy", "poor are lazy", "poverty is a choice",
                    "just work harder", "pull yourself up", "bootstraps",
                    "handout", "freeloader", "moocher", "welfare dependent"]
}

TRUTH_SEEKING_WORDS = {
    "unsubstantiated": ["it's a fact that", "undeniable truth", "without a doubt",
                        "proven fact", "experts all agree", "scientists all agree",
                        "the truth is", "impossible to deny", "irrefutable fact"],
    "overgeneralization": ["always wrong", "never works", "nobody believes",
                           "100% guaranteed", "completely impossible", "totally false"],
    "misinformation_claims": ["vaccines cause autism", "climate change is a hoax",
                              "flat earth", "moon landing was faked", "5g causes cancer",
                              "covid is a hoax", "microchips in vaccines",
                              "election was stolen", "chemtrails", "qanon"]
}

IDEOLOGICAL_NEUTRALITY_WORDS = {
    "non_neutral_framing": ["the establishment", "the elite", "the system",
                            "big tech", "big pharma", "globalist agenda",
                            "controlled opposition", "ruling class"],
    "dismissive_framing": ["so-called experts", "so-called science",
                           "official narrative", "they want you to believe",
                           "don't be fooled", "wake up people"]
}

LANGUAGE_TONE_WORDS = {
    "slurs_high": ["retard", "retarded", "nigger", "faggot", "tranny", "cunt", 
                   "whore", "slut", "bitch", "bastard", "asshole"],
    "profanity_medium": ["fuck", "fucking", "shit", "damn", "hell", "ass", "dick",
                         "piss", "cock", "pussy"],
    "hate_speech_high": ["kill yourself", "go to hell", "die", "kys", "subhuman",
                         "inferior race", "master race", "race war", "ethnic cleansing"],
    "unprofessional_low": ["sucks", "crap", "crappy", "pissed off", "screwed up",
                           "bullcrap", "idiotic", "moronic", "stupid"]
}


def is_eeo_paragraph(text: str) -> bool:
    """
    Check if text is part of an EEO statement.
    If yes, skip ALL bias checks for this paragraph.
    """
    text_lower = text.lower()
    for phrase in EEO_WHITELIST_PHRASES:
        if phrase in text_lower:
            return True
    return False


def get_context_window(text: str, position: int, window_size: int = 100) -> str:
    """Get surrounding context around a position"""
    start = max(0, position - window_size)
    end = min(len(text), position + window_size)
    return text[start:end].lower()


def find_word_in_text(text_lower: str, word: str) -> int:
    """Find position of word in text"""
    pattern = r'\b' + re.escape(word.lower()) + r'\b'
    match = re.search(pattern, text_lower)
    return match.start() if match else -1


def detect_gender_bias(text: str, text_lower: str) -> List[Dict[str, Any]]:
    """
    Detect gender bias with context awareness.
    Only flag personality-coded words when describing people, NOT compensation.
    """
    issues = []
    
    for category, words in GENDER_BIAS_WORDS.items():
        for word in words:
            pos = find_word_in_text(text_lower, word)
            if pos == -1:
                continue
            
            # Get context around the word
            context = get_context_window(text, pos, 50)
            
            # Rule 1A: Gender-coded language context filtering
            if category in ["male_stereotypes", "female_stereotypes"]:
                # Check if used in compensation/technical context
                skip_word = False
                for whitelist_term in GENDER_CONTEXT_WHITELIST:
                    if whitelist_term in context:
                        skip_word = True
                        break
                
                if skip_word:
                    continue
            
            # Determine severity
            if category == "gendered_titles":
                severity = "high"
                explanation = f"'{word}' is gendered language. Use gender-neutral alternatives instead."
            else:
                severity = "medium"
                explanation = f"'{word}' may reinforce gender stereotypes when describing personality traits"
            
            issues.append({
                "word": word,
                "bias_type": "gender",
                "severity": severity,
                "explanation": explanation,
                "position": pos
            })
    
    return issues


def detect_race_bias(text_lower: str) -> List[Dict[str, Any]]:
    """Detect racial bias in text"""
    issues = []
    for category, words in RACE_BIAS_WORDS.items():
        for word in words:
            if find_word_in_text(text_lower, word) != -1:
                pos = find_word_in_text(text_lower, word)
                issues.append({
                    "word": word,
                    "bias_type": "race",
                    "severity": "high",
                    "explanation": f"'{word}' is a problematic term that may perpetuate racial stereotypes",
                    "position": pos
                })
    return issues


def detect_age_bias(text: str, text_lower: str) -> List[Dict[str, Any]]:
    """
    Detect age bias with context awareness.
    Only flag 'young' when used in hiring/personality contexts.
    """
    issues = []
    
    for category, words in AGE_BIAS_WORDS.items():
        for word in words:
            pos = find_word_in_text(text_lower, word)
            if pos == -1:
                continue
            
            # Context-aware detection for "young"
            if category == "youth_context_sensitive" and word == "young":
                context = get_context_window(text, pos, 50)
                
                # Skip if in neutral context
                skip_word = False
                for neutral_term in AGE_CONTEXT_NEUTRAL:
                    if neutral_term in context:
                        skip_word = True
                        break
                
                if skip_word:
                    continue
                
                # Only flag if in hiring/personality context
                in_hiring_context = False
                for hiring_term in AGE_CONTEXT_HIRING:
                    if hiring_term in context:
                        in_hiring_context = True
                        break
                
                if not in_hiring_context:
                    continue
            
            issues.append({
                "word": word,
                "bias_type": "age",
                "severity": "medium",
                "explanation": f"'{word}' may reflect age-based assumptions in hiring contexts",
                "position": pos
            })
    
    return issues


def detect_disability_bias(text_lower: str) -> List[Dict[str, Any]]:
    """Detect disability bias (ableism) in text"""
    issues = []
    for category, words in DISABILITY_BIAS_WORDS.items():
        for word in words:
            if find_word_in_text(text_lower, word) != -1:
                pos = find_word_in_text(text_lower, word)
                issues.append({
                    "word": word,
                    "bias_type": "disability",
                    "severity": "high",
                    "explanation": f"'{word}' is ableist language that can be harmful",
                    "position": pos
                })
    return issues


def detect_cultural_bias(text: str, text_lower: str) -> List[Dict[str, Any]]:
    """
    Detect cultural bias with context awareness.
    Rule 1B: Only flag 'developing' when referring to countries/regions.
    """
    issues = []
    
    # Context-sensitive words
    context_sensitive = {
        "developing": ["countries", "nations", "regions", "world", "markets"],
        "underdeveloped": ["countries", "regions", "nations"]
    }
    
    for word, next_words in context_sensitive.items():
        pattern = r'\b' + re.escape(word) + r'\s+(\w+)'
        matches = re.finditer(pattern, text_lower)
        for match in matches:
            next_word = match.group(1)
            if next_word in next_words:
                issues.append({
                    "word": word,
                    "bias_type": "culture",
                    "severity": "medium",
                    "explanation": f"'{word} {next_word}' may reflect cultural bias",
                    "position": match.start()
                })
    
    # Non-context-sensitive words
    for category, words in CULTURAL_BIAS_WORDS.items():
        for word in words:
            if find_word_in_text(text_lower, word) != -1:
                pos = find_word_in_text(text_lower, word)
                issues.append({
                    "word": word,
                    "bias_type": "culture",
                    "severity": "medium",
                    "explanation": f"'{word}' may reflect cultural bias or ethnocentrism",
                    "position": pos
                })
    
    return issues


def detect_political_bias(text_lower: str) -> List[Dict[str, Any]]:
    """Detect political/ideological bias in text"""
    issues = []
    for category, words in POLITICAL_BIAS_WORDS.items():
        for word in words:
            if find_word_in_text(text_lower, word) != -1:
                pos = find_word_in_text(text_lower, word)
                issues.append({
                    "word": word,
                    "bias_type": "political",
                    "severity": "medium",
                    "explanation": f"'{word}' indicates political or ideological bias",
                    "position": pos
                })
    return issues


def detect_religion_bias(text_lower: str) -> List[Dict[str, Any]]:
    """Detect religious bias in text"""
    issues = []
    for category, words in RELIGION_BIAS_WORDS.items():
        for word in words:
            if find_word_in_text(text_lower, word) != -1:
                pos = find_word_in_text(text_lower, word)
                issues.append({
                    "word": word,
                    "bias_type": "religion",
                    "severity": "high",
                    "explanation": f"'{word}' may reflect religious bias or discrimination",
                    "position": pos
                })
    return issues


def detect_lgbtq_bias(text_lower: str) -> List[Dict[str, Any]]:
    """Detect LGBTQ+ bias in text"""
    issues = []
    for category, words in LGBTQ_BIAS_WORDS.items():
        for word in words:
            if find_word_in_text(text_lower, word) != -1:
                pos = find_word_in_text(text_lower, word)
                issues.append({
                    "word": word,
                    "bias_type": "lgbtq",
                    "severity": "high",
                    "explanation": f"'{word}' is problematic language regarding LGBTQ+ individuals",
                    "position": pos
                })
    return issues


def detect_socioeconomic_bias(text_lower: str) -> List[Dict[str, Any]]:
    """Detect socioeconomic/class bias in text"""
    issues = []
    for category, words in SOCIOECONOMIC_BIAS_WORDS.items():
        for word in words:
            if find_word_in_text(text_lower, word) != -1:
                pos = find_word_in_text(text_lower, word)
                issues.append({
                    "word": word,
                    "bias_type": "socioeconomic",
                    "severity": "medium",
                    "explanation": f"'{word}' may reflect class-based bias",
                    "position": pos
                })
    return issues


def detect_truth_seeking_bias(text_lower: str) -> List[Dict[str, Any]]:
    """Detect deviations from factual accuracy"""
    issues = []
    for category, phrases in TRUTH_SEEKING_WORDS.items():
        for phrase in phrases:
            if find_word_in_text(text_lower, phrase) != -1:
                pos = find_word_in_text(text_lower, phrase)
                issues.append({
                    "word": phrase,
                    "bias_type": "truth_seeking",
                    "severity": "medium",
                    "explanation": f"'{phrase}' may indicate unsubstantiated claims",
                    "position": pos
                })
    return issues


def detect_ideological_neutrality_bias(text_lower: str) -> List[Dict[str, Any]]:
    """Detect partisan slants and non-neutral framing"""
    issues = []
    for category, phrases in IDEOLOGICAL_NEUTRALITY_WORDS.items():
        for phrase in phrases:
            if find_word_in_text(text_lower, phrase) != -1:
                pos = find_word_in_text(text_lower, phrase)
                issues.append({
                    "word": phrase,
                    "bias_type": "ideological_neutrality",
                    "severity": "medium",
                    "explanation": f"'{phrase}' indicates non-neutral framing",
                    "position": pos
                })
    return issues


def detect_language_tone_bias(text: str, text_lower: str) -> List[Dict[str, Any]]:
    """
    Detect profanity, slurs, hate speech.
    Rule 1C: Do NOT flag 'sex' or 'sexual' (removed from profanity list).
    """
    issues = []
    detected_positions = set()
    
    for category, words in LANGUAGE_TONE_WORDS.items():
        for word in words:
            if find_word_in_text(text_lower, word) != -1:
                pos = find_word_in_text(text_lower, word)
                
                if pos in detected_positions:
                    continue
                
                if "high" in category:
                    severity = "high"
                    if "slur" in category:
                        explanation = f"Contains prohibited slur: '{word}'"
                    else:
                        explanation = f"Contains hate speech: '{word}'"
                elif "medium" in category:
                    severity = "medium"
                    explanation = f"Contains profanity: '{word}'"
                else:
                    severity = "low"
                    explanation = f"Unprofessional tone detected: '{word}'"
                
                issues.append({
                    "word": word,
                    "bias_type": "language_tone",
                    "severity": severity,
                    "explanation": explanation,
                    "position": pos
                })
                detected_positions.add(pos)
    
    return issues


def detect_intersectional_bias(text: str, all_issues: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Rule 1E: Only trigger intersectional bias when 2+ confirmed biases exist
    in the same subject/sentence.
    """
    if len(all_issues) < 2:
        return []
    
    sentences = re.split(r'[.!?]+', text)
    intersectional_issues = []
    
    for sentence in sentences:
        sentence_lower = sentence.lower()
        sentence_biases = set()
        
        for issue in all_issues:
            word = issue.get("word", "").lower()
            if word in sentence_lower and issue["bias_type"] != "intersectional":
                sentence_biases.add(issue["bias_type"])
        
        if len(sentence_biases) >= 2:
            combined_types = " + ".join(sorted(sentence_biases))
            intersectional_issues.append({
                "word": "(multiple biases in same sentence)",
                "bias_type": "intersectional",
                "severity": "high",
                "explanation": f"Intersectional bias: {combined_types}. Multiple bias types compound discrimination.",
                "position": 0
            })
            break
    
    return intersectional_issues


def calculate_bias_score(issues: List[Dict[str, Any]]) -> int:
    """Calculate overall bias score (0-100)"""
    if not issues:
        return 0
    
    severity_weights = {"low": 5, "medium": 10, "high": 20}
    total_score = sum(severity_weights.get(issue["severity"], 10) for issue in issues)
    return min(total_score, 100)


def get_severity_label(score: int) -> str:
    """Get severity label from score"""
    if score == 0:
        return "none"
    elif score < 30:
        return "low"
    elif score < 60:
        return "medium"
    else:
        return "high"


def create_heatmap(text: str, issues: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Create word-by-word heatmap of bias"""
    words = text.split()
    heatmap = []
    current_pos = 0
    
    for word in words:
        word_start = text.find(word, current_pos)
        word_end = word_start + len(word)
        
        matching_issues = [
            issue for issue in issues
            if issue["position"] >= word_start and issue["position"] < word_end
        ]
        
        if matching_issues:
            max_severity = max(
                (issue["severity"] for issue in matching_issues),
                key=lambda s: {"low": 1, "medium": 2, "high": 3}[s]
            )
            bias_types = list(set(issue["bias_type"] for issue in matching_issues))
            
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


def detect_stereotype_patterns(text_lower: str) -> List[Dict[str, Any]]:
    """Detect bias patterns like 'All [GROUP] are [NEGATIVE]'"""
    issues = []
    
    group_patterns = [
        r'\ball (muslims?|christians?|jews?|hindus?|buddhists?|atheists?)',
        r'\ball (asians?|blacks?|whites?|latinos?|hispanics?|arabs?)',
        r'\ball (men|women|males?|females?)',
        r'\ball (gay|lesbian|transgender|lgbtq)',
        r'\ball (poor|rich|wealthy) (people|person)',
        r'\ball (young|old|elderly) (people|person)',
    ]
    
    for pattern in group_patterns:
        matches = re.finditer(pattern, text_lower)
        for match in matches:
            rest_of_sentence = text_lower[match.end():match.end()+100]
            if rest_of_sentence.strip().startswith(('are', 'is')):
                issues.append({
                    "word": match.group(),
                    "bias_type": "pattern_stereotype",
                    "severity": "high",
                    "explanation": f"Stereotype pattern: '{match.group()}' - sweeping generalization",
                    "position": match.start()
                })
    
    return issues


def validate_with_openai(text: str, enable_ai: bool = False) -> List[Dict[str, Any]]:
    """
    Use OpenAI to validate complex biases.
    Only runs if enable_ai flag is True (cost control).
    """
    if not enable_ai:
        return []
    
    try:
        import os
        from openai import OpenAI
        
        AI_INTEGRATIONS_OPENAI_API_KEY = os.environ.get("AI_INTEGRATIONS_OPENAI_API_KEY")
        AI_INTEGRATIONS_OPENAI_BASE_URL = os.environ.get("AI_INTEGRATIONS_OPENAI_BASE_URL")
        
        if not AI_INTEGRATIONS_OPENAI_API_KEY or not AI_INTEGRATIONS_OPENAI_BASE_URL:
            return []
        
        client = OpenAI(
            api_key=AI_INTEGRATIONS_OPENAI_API_KEY,
            base_url=AI_INTEGRATIONS_OPENAI_BASE_URL
        )
        
        prompt = f"""Analyze the following text for bias across these dimensions:
1. Gender bias
2. Racial/ethnic bias
3. Age bias
4. Disability bias (ableism)
5. Cultural bias
6. Political bias
7. Religious bias
8. LGBTQ+ bias
9. Socioeconomic bias
10. Truth-seeking (misinformation)
11. Ideological neutrality
12. Language & tone (hate speech, profanity)

Text to analyze:
"{text}"

Return ONLY biased phrases/words found. For each bias found, respond in JSON format:
{{
  "biases": [
    {{
      "word": "exact phrase",
      "bias_type": "category",
      "severity": "low|medium|high",
      "explanation": "brief explanation"
    }}
  ]
}}

If no bias detected, return {{"biases": []}}"""
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            max_completion_tokens=1000,
            temperature=0.3
        )
        
        import json
        result = json.loads(response.choices[0].message.content or "{}")
        biases = result.get("biases", [])
        
        for bias in biases:
            word = bias.get("word", "")
            bias["position"] = text.lower().find(word.lower()) if word else 0
        
        return biases
        
    except Exception as e:
        print(f"OpenAI validation error: {str(e)}")
        return []


def hybrid_detect_bias(text: str, enable_ai: bool = False) -> Dict[str, Any]:
    """
    Enterprise-grade hybrid bias detection with EEO auto-whitelist.
    
    Args:
        text: Text to analyze
        enable_ai: Whether to use OpenAI for enhanced detection
    
    Returns:
        Complete bias detection results
    """
    # Rule 1D: EEO Auto-Whitelist - Skip ALL bias checks
    if is_eeo_paragraph(text):
        return {
            "score": 0,
            "severity": "none",
            "issues": [],
            "issue_count": 0,
            "heatmap": [],
            "detection_method": "eeo_whitelisted",
            "note": "EEO/legal paragraph detected - bias checks skipped"
        }
    
    text_lower = text.lower()
    
    # Step 1: Manual word list detection (context-aware)
    all_issues = []
    all_issues.extend(detect_gender_bias(text, text_lower))
    all_issues.extend(detect_race_bias(text_lower))
    all_issues.extend(detect_age_bias(text, text_lower))
    all_issues.extend(detect_disability_bias(text_lower))
    all_issues.extend(detect_cultural_bias(text, text_lower))
    all_issues.extend(detect_political_bias(text_lower))
    all_issues.extend(detect_religion_bias(text_lower))
    all_issues.extend(detect_lgbtq_bias(text_lower))
    all_issues.extend(detect_socioeconomic_bias(text_lower))
    all_issues.extend(detect_truth_seeking_bias(text_lower))
    all_issues.extend(detect_ideological_neutrality_bias(text_lower))
    all_issues.extend(detect_language_tone_bias(text, text_lower))
    
    # Step 2: Pattern matching (stereotype detection)
    all_issues.extend(detect_stereotype_patterns(text_lower))
    
    # Step 3: OpenAI validation (optional)
    if enable_ai:
        ai_issues = validate_with_openai(text, enable_ai=True)
        existing_words = set(issue.get("word", "").lower() for issue in all_issues)
        for ai_issue in ai_issues:
            if ai_issue.get("word", "").lower() not in existing_words:
                all_issues.append(ai_issue)
    
    # Step 4: Intersectional bias (only if 2+ biases in same sentence)
    all_issues.extend(detect_intersectional_bias(text, all_issues))
    
    # Calculate metrics
    score = calculate_bias_score(all_issues)
    severity = get_severity_label(score)
    heatmap = create_heatmap(text, all_issues)
    
    return {
        "score": score,
        "severity": severity,
        "issues": all_issues,
        "issue_count": len(all_issues),
        "heatmap": heatmap,
        "detection_method": "hybrid" if enable_ai else "manual_with_patterns"
    }
