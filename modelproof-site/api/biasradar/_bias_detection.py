# Shared bias detection logic for BiasRadar
import spacy
import re
from typing import List, Dict, Any

# Load spaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    import subprocess
    subprocess.run(["python", "-m", "spacy", "download", "en_core_web_sm"])
    nlp = spacy.load("en_core_web_sm")

# Bias word dictionaries
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


def find_word_in_text(text_lower: str, word: str) -> int:
    """Find position of word in text"""
    pattern = r'\b' + re.escape(word.lower()) + r'\b'
    match = re.search(pattern, text_lower)
    return match.start() if match else -1


def detect_gender_bias(doc, text_lower: str) -> List[Dict[str, Any]]:
    """Detect gender bias in text"""
    issues = []
    for category, words in GENDER_BIAS_WORDS.items():
        for word in words:
            if find_word_in_text(text_lower, word) != -1:
                pos = find_word_in_text(text_lower, word)
                issues.append({
                    "word": word,
                    "bias_type": "gender",
                    "severity": "medium",
                    "explanation": f"'{word}' may reinforce gender stereotypes associated with {category} traits",
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


def detect_age_bias(text_lower: str) -> List[Dict[str, Any]]:
    """Detect age bias in text"""
    issues = []
    for category, words in AGE_BIAS_WORDS.items():
        for word in words:
            if find_word_in_text(text_lower, word) != -1:
                pos = find_word_in_text(text_lower, word)
                issues.append({
                    "word": word,
                    "bias_type": "age",
                    "severity": "medium",
                    "explanation": f"'{word}' may reflect age-based assumptions about {category} people",
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
                    "explanation": f"'{word}' is ableist language that can be harmful to people with disabilities",
                    "position": pos
                })
    return issues


def detect_cultural_bias(text_lower: str) -> List[Dict[str, Any]]:
    """Detect cultural bias in text"""
    issues = []
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
                    "explanation": f"'{word}' may reflect class-based bias or assumptions",
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
                    "explanation": f"'{phrase}' may indicate unsubstantiated claims or overgeneralizations",
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
                    "explanation": f"'{phrase}' indicates non-neutral framing or ideological bias",
                    "position": pos
                })
    return issues


def detect_intersectional_bias(all_issues: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Detect intersectional bias (overlapping biases)"""
    bias_types_present = set(issue["bias_type"] for issue in all_issues)
    
    intersectional_issues = []
    if len(bias_types_present) >= 2:
        combined_types = " + ".join(sorted(bias_types_present))
        intersectional_issues.append({
            "word": "(multiple biases detected)",
            "bias_type": "intersectional",
            "severity": "high",
            "explanation": f"Intersectional bias detected: {combined_types}. Multiple bias types compound discrimination.",
            "position": 0
        })
    
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
