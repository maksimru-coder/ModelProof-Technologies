# Shared bias detection logic for BiasRadar
import re
from typing import List, Dict, Any

# Import profanity detection
try:
    from better_profanity import profanity
    profanity.load_censor_words()
    PROFANITY_AVAILABLE = True
except ImportError:
    PROFANITY_AVAILABLE = False

# Bias word dictionaries
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
                        "cameraman", "cameramen", "man", "men", "woman", "women",
                        "male", "female", "boy", "girl"],
    "male_stereotypes": ["aggressive", "dominant", "assertive", "competitive", "ambitious", "decisive", 
                         "analytical", "logical", "independent", "confident", "strong", "tough",
                         "arrogant", "charismatic", "leader", "genius", "brilliant", "mastermind"],
    "female_stereotypes": ["nurturing", "supportive", "emotional", "sensitive", "caring", "empathetic",
                           "collaborative", "warm", "gentle", "sympathetic", "compassionate", "sweet",
                           "bubbly", "ditzy", "bossy", "shrill", "hysterical", "dramatic", "catty"]
}

RACE_BIAS_WORDS = {
    "problematic": ["exotic", "articulate", "urban", "inner-city", "ghetto", "thug", 
                    "oriental", "primitive", "tribal", "uncivilized", "savage",
                    "well-spoken", "eloquent", "clean-cut", "uppity", "colored", "negro",
                    "illegal alien", "illegal immigrant", "illegals", "aliens",
                    "foreigner", "foreign-looking", "un-american", "go back to",
                    "you people", "those people", "culturally backward", "third world"],
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
    "youth": ["energetic", "innovative", "tech-savvy", "fresh", "dynamic", "passionate", 
              "lazy millennial", "entitled", "snowflake generation", "kids these days"],
    "older": ["experienced", "traditional", "old-fashioned", "outdated", "slow", "resistant to change",
              "set in their ways", "elderly worker", "senior moment", "retirement age", "dinosaur",
              "too old", "over the hill", "past their prime", "ancient", "geriatric"]
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
                    "traditional values", "family values", "real american", "patriotic"],
    "extremist_labels": ["libtards", "conservatards", "trumptards", "democrats want", "republicans want",
                         "liberals are", "conservatives are", "the left wants to destroy",
                         "right-wing extremist", "left-wing extremist", "communist plot",
                         "socialist takeover", "fascist", "nazi", "marxist", "domestic terrorist"],
    "partisan_framing": ["radical left agenda", "conservative patriots", "liberal elite",
                         "maga patriots", "antifa thugs", "proud boys", "woke mob",
                         "liberal media bias", "conservative propaganda", "leftist narrative"]
}

RELIGION_BIAS_WORDS = {
    "problematic": ["infidel", "heathen", "godless", "pagan", "cult", "radical islam", 
                    "fundamentalist", "extremist", "judeo-christian", "christian nation",
                    "backwards religion", "primitive beliefs", "superstitious", "jihadist",
                    "crusade", "holy war", "religious fanatic", "muslim", "muslims", 
                    "christian", "christians", "jew", "jews", "hindu", "hindus",
                    "buddhist", "buddhists", "atheist", "atheists"],
    "stereotypes": ["all muslims", "all christians", "all jews", "all hindus", "all buddhists",
                    "all atheists", "muslims are", "christians are", "jews are", "hindus are",
                    "atheists are", "islamist", "terrorist religion", "false prophet",
                    "muslim extremist", "islamic terrorist", "christian fanatic", "jewish conspiracy"],
    "discriminatory": ["sharia law", "jihad", "muslim ban", "christianize", "islamization",
                       "religious indoctrination", "brainwashed by religion", "religion of peace",
                       "crusader", "zionist conspiracy", "atheist agenda", "godless communists",
                       "immoral atheists", "heathen practices", "pagan rituals", "devil worship"]
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
                    "trust fund baby", "silver spoon", "entitled", "lazy poor"],
    "stereotypes": ["poor people are lazy", "poor are lazy", "rich deserve", "wealthy deserve",
                    "poverty is a choice", "just work harder", "pull yourself up",
                    "bootstraps", "handout", "freeloader", "moocher", "taker",
                    "welfare dependent", "living off government", "government cheese"],
    "dehumanizing": ["low-income people", "the poors", "peasant", "pleb", "redneck",
                     "white trash", "hillbilly", "country bumpkin", "unwashed masses",
                     "nouveau riche", "old money", "new money", "social climber"]
}

TRUTH_SEEKING_WORDS = {
    "unsubstantiated": ["it's a fact that", "undeniable truth", "without a doubt",
                        "proven fact", "experts all agree", "scientists all agree",
                        "the truth is", "impossible to deny", "irrefutable fact",
                        "indisputable fact", "beyond question", "absolute truth", "undeniable fact"],
    "overgeneralization": ["always wrong", "never works", "nobody believes",
                           "100% guaranteed", "completely impossible", "totally false",
                           "entirely untrue", "perfectly clear that", "obviously true", "obviously false"],
    "misinformation_claims": ["vaccines cause autism", "climate change is a hoax", "climate hoax",
                              "climate change is a complete hoax", "climate change hoax",
                              "global warming is a hoax", "global warming hoax",
                              "flat earth", "moon landing was faked", "5g causes cancer",
                              "covid is a hoax", "covid hoax", "microchips in vaccines", "covid vaccine kills",
                              "election was stolen", "stolen election", "deep state conspiracy", "qanon",
                              "chemtrails", "fluoride mind control", "reptilian", "illuminati controls"],
    "conspiracy_language": ["wake up sheeple", "they don't want you to know", "the truth they hide",
                            "mainstream media lies", "fake science", "government coverup",
                            "big pharma conspiracy", "follow the money", "do your own research",
                            "question everything", "don't trust the science", "alternative facts"]
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

LANGUAGE_TONE_WORDS = {
    "slurs_high": ["retard", "retarded", "nigger", "faggot", "tranny", "cunt", 
                   "whore", "slut", "bitch", "bastard", "asshole"],
    "profanity_medium": ["fuck", "fucking", "shit", "damn", "hell", "ass", "dick",
                         "piss", "cock", "pussy", "bollocks", "bloody hell"],
    "hate_speech_high": ["kill yourself", "go to hell", "die", "kys", "subhuman",
                         "inferior race", "master race", "race war", "ethnic cleansing"],
    "unprofessional_low": ["sucks", "crap", "crappy", "pissed off", "screwed up",
                           "messed up", "bullcrap", "idiotic", "moronic", "stupid"]
}


def find_word_in_text(text_lower: str, word: str) -> int:
    """Find position of word in text"""
    pattern = r'\b' + re.escape(word.lower()) + r'\b'
    match = re.search(pattern, text_lower)
    return match.start() if match else -1


def detect_gender_bias(text_lower: str) -> List[Dict[str, Any]]:
    """Detect gender bias in text"""
    issues = []
    for category, words in GENDER_BIAS_WORDS.items():
        for word in words:
            if find_word_in_text(text_lower, word) != -1:
                pos = find_word_in_text(text_lower, word)
                
                # Determine severity and explanation based on category
                if category == "gendered_titles":
                    severity = "high"
                    explanation = f"'{word}' is gendered language. Use gender-neutral alternatives instead."
                else:
                    severity = "medium"
                    explanation = f"'{word}' may reinforce gender stereotypes associated with {category.replace('_', ' ')}"
                
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
            # Use substring matching for misinformation claims (catches partial matches)
            if category == "misinformation_claims":
                if phrase in text_lower:
                    pos = text_lower.find(phrase)
                    issues.append({
                        "word": phrase,
                        "bias_type": "truth_seeking",
                        "severity": "medium",
                        "explanation": f"'{phrase}' may indicate unsubstantiated claims or overgeneralizations",
                        "position": pos
                    })
            else:
                # Use word boundary matching for other categories
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


def detect_language_tone_bias(text_lower: str) -> List[Dict[str, Any]]:
    """Detect profanity, slurs, hate speech, and unprofessional tone"""
    issues = []
    detected_positions = set()  # Track positions to prevent duplicates
    
    # Check against custom word lists with severity levels
    for category, words in LANGUAGE_TONE_WORDS.items():
        for word in words:
            if find_word_in_text(text_lower, word) != -1:
                pos = find_word_in_text(text_lower, word)
                
                # Skip if already detected at this position
                if pos in detected_positions:
                    continue
                
                # Determine severity based on category
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
    
    # Detect censored/masked profanity (e.g., "f***", "f***ing", "sh*t", "f**king")
    # Patterns match common censored forms with *, -, or _ replacements
    censored_patterns = [
        (r'\bf[\*\-\_]{2,}k(?:ing)?', 'fuck/fucking', 'medium', 'Contains censored profanity'),  # f**k, f**king
        (r'\bf[\*\-\_]{2,}(?:ing)?', 'fuck/fucking', 'medium', 'Contains censored profanity'),  # f***, f***ing
        (r'\bsh[\*\-\_]+t', 'shit', 'medium', 'Contains censored profanity'),  # sh*t, sh**
        (r'\bd[\*\-\_]+n', 'damn', 'medium', 'Contains censored profanity'),  # d*mn, d**n
        (r'\bass[\*\-\_]+', 'ass', 'medium', 'Contains censored profanity'),  # a**, a***
        (r'\bb[\*\-\_]+ch', 'bitch', 'medium', 'Contains censored profanity'),  # b*tch, b**ch
        (r'\bc[\*\-\_]+t', 'cunt', 'high', 'Contains censored slur'),  # c**t, c***
        (r'\bh[\*\-\_]+l', 'hell', 'medium', 'Contains censored profanity'),  # h*ll, h**l
        (r'\bd[\*\-\_]+k', 'dick', 'medium', 'Contains censored profanity'),  # d*ck, d**k
    ]
    
    for pattern, word_name, severity, explanation in censored_patterns:
        matches = re.finditer(pattern, text_lower)
        for match in matches:
            # Skip if already detected at this position
            if match.start() in detected_positions:
                continue
            
            issues.append({
                "word": match.group(),
                "bias_type": "language_tone",
                "severity": severity,
                "explanation": f"{explanation}: '{match.group()}'",
                "position": match.start()
            })
            detected_positions.add(match.start())
    
    # Additional check with better-profanity if available
    if PROFANITY_AVAILABLE:
        words = text_lower.split()
        current_pos = 0
        for word in words:
            # First check the raw word (with punctuation) for profanity
            if profanity.contains_profanity(word):
                word_pos = text_lower.find(word, current_pos)
                # Skip if already detected at this position
                if word_pos not in detected_positions:
                    issues.append({
                        "word": word,
                        "bias_type": "language_tone",
                        "severity": "medium",
                        "explanation": f"Contains profanity: '{word}'",
                        "position": word_pos if word_pos != -1 else 0
                    })
                    if word_pos != -1:
                        detected_positions.add(word_pos)
            else:
                # Then check cleaned word (without punctuation)
                clean_word = re.sub(r'[^\w\s]', '', word)
                if clean_word and profanity.contains_profanity(clean_word):
                    word_pos = text_lower.find(clean_word, current_pos)
                    # Skip if already detected at this position
                    if word_pos not in detected_positions:
                        issues.append({
                            "word": clean_word,
                            "bias_type": "language_tone",
                            "severity": "medium",
                            "explanation": f"Contains profanity: '{clean_word}'",
                            "position": word_pos if word_pos != -1 else 0
                        })
                        if word_pos != -1:
                            detected_positions.add(word_pos)
            
            current_pos = text_lower.find(word, current_pos) + len(word)
    
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


# ========================================
# ADVANCED PATTERN MATCHING & AI VALIDATION
# ========================================

def detect_stereotype_patterns(text_lower: str) -> List[Dict[str, Any]]:
    """
    Detect bias patterns like "All [GROUP] are [NEGATIVE]"
    This catches context-dependent stereotypes that word lists miss
    """
    issues = []
    
    # Pattern 1: "All [GROUP] are/is [ATTRIBUTE]"
    group_patterns = [
        r'\ball (muslims?|christians?|jews?|hindus?|buddhists?|atheists?)',
        r'\ball (asians?|blacks?|whites?|latinos?|hispanics?|arabs?)',
        r'\ball (men|women|males?|females?)',
        r'\ball (gay|lesbian|transgender|lgbtq)',
        r'\ball (poor|rich|wealthy) (people|person)',
        r'\ball (young|old|elderly) (people|person)',
        r'\ball (disabled|handicapped) (people|person)',
    ]
    
    for pattern in group_patterns:
        matches = re.finditer(pattern, text_lower)
        for match in matches:
            # Check if followed by "are" or "is"
            rest_of_sentence = text_lower[match.end():match.end()+100]
            if rest_of_sentence.strip().startswith(('are', 'is')):
                issues.append({
                    "word": match.group(),
                    "bias_type": "pattern_stereotype",
                    "severity": "high",
                    "explanation": f"Stereotype pattern detected: '{match.group()}' - sweeping generalization about a group",
                    "position": match.start()
                })
    
    # Pattern 2: "[GROUP] are naturally/inherently/always [ATTRIBUTE]"
    inherent_patterns = [
        r'(asians?|blacks?|whites?|latinos?|hispanics?) (are )?naturally',
        r'(asians?|blacks?|whites?|latinos?|hispanics?) (are )?inherently',
        r'(asians?|blacks?|whites?|latinos?|hispanics?) (are )?always',
        r'(men|women|males?|females?) (are )?naturally',
        r'(poor|rich) (people )?(are )?naturally',
    ]
    
    for pattern in inherent_patterns:
        matches = re.finditer(pattern, text_lower)
        for match in matches:
            issues.append({
                "word": match.group(),
                "bias_type": "pattern_stereotype",
                "severity": "high",
                "explanation": f"Essentialist stereotype detected: '{match.group()}' - attributes inherent characteristics to a group",
                "position": match.start()
            })
    
    return issues


def validate_with_openai(text: str, enable_ai: bool = False) -> List[Dict[str, Any]]:
    """
    Use OpenAI GPT-5 to validate complex biases that manual detection misses
    Only runs if enable_ai flag is True (cost control)
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
        
        # the newest OpenAI model is "gpt-5" which was released August 7, 2025.
        # do not change this unless explicitly requested by the user
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
10. Truth-seeking (misinformation, unsubstantiated claims)
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
            model="gpt-5-mini",  # Use mini for cost efficiency
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            max_completion_tokens=1000,
            temperature=0.3  # Low temperature for consistency
        )
        
        import json
        result = json.loads(response.choices[0].message.content or "{}")
        biases = result.get("biases", [])
        
        # Add position info (rough estimate)
        for bias in biases:
            word = bias.get("word", "")
            bias["position"] = text.lower().find(word.lower()) if word else 0
        
        return biases
        
    except Exception as e:
        # Silently fail - don't break the API if OpenAI has issues
        print(f"OpenAI validation error: {str(e)}")
        return []


def hybrid_detect_bias(text: str, enable_ai: bool = False) -> Dict[str, Any]:
    """
    Hybrid bias detection combining:
    1. Manual word lists (fast, reliable)
    2. Pattern matching (catches stereotypes)
    3. OpenAI validation (optional, for complex cases)
    
    Args:
        text: Text to analyze
        enable_ai: Whether to use OpenAI for enhanced detection (costs credits)
    
    Returns:
        Complete bias detection results
    """
    text_lower = text.lower()
    
    # Step 1: Manual word list detection (always runs)
    all_issues = []
    all_issues.extend(detect_gender_bias(text_lower))
    all_issues.extend(detect_race_bias(text_lower))
    all_issues.extend(detect_age_bias(text_lower))
    all_issues.extend(detect_disability_bias(text_lower))
    all_issues.extend(detect_cultural_bias(text_lower))
    all_issues.extend(detect_political_bias(text_lower))
    all_issues.extend(detect_religion_bias(text_lower))
    all_issues.extend(detect_lgbtq_bias(text_lower))
    all_issues.extend(detect_socioeconomic_bias(text_lower))
    all_issues.extend(detect_truth_seeking_bias(text_lower))
    all_issues.extend(detect_ideological_neutrality_bias(text_lower))
    all_issues.extend(detect_language_tone_bias(text_lower))
    
    # Step 2: Pattern matching (always runs - catches stereotypes)
    all_issues.extend(detect_stereotype_patterns(text_lower))
    
    # Step 3: OpenAI validation (optional - only if enable_ai=True)
    if enable_ai:
        ai_issues = validate_with_openai(text, enable_ai=True)
        # Merge AI results, avoiding duplicates
        existing_words = set(issue.get("word", "").lower() for issue in all_issues)
        for ai_issue in ai_issues:
            if ai_issue.get("word", "").lower() not in existing_words:
                all_issues.append(ai_issue)
    
    # Step 4: Detect intersectional bias
    all_issues.extend(detect_intersectional_bias(all_issues))
    
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
