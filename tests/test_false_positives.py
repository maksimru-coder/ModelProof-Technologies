#!/usr/bin/env python3
"""Test that neutral text doesn't trigger false positives"""

import sys
sys.path.insert(0, 'api/biasradar')

from _bias_detection import (
    detect_gender_bias,
    detect_race_bias,
    detect_age_bias,
    detect_disability_bias,
    detect_cultural_bias,
    detect_political_bias,
    detect_religion_bias,
    detect_lgbtq_bias,
    detect_socioeconomic_bias,
    detect_truth_seeking_bias,
    detect_ideological_neutrality_bias,
    detect_language_tone_bias
)

# Neutral test cases that should NOT trigger bias detection
neutral_texts = [
    "The old building was renovated last year.",
    "I had a lazy Sunday morning sleeping in.",
    "The transgender healthcare bill provides coverage for medical care.",
    "Trump Tower is located in New York City.",
    "The snowflakes fell gently on the ground.",
    "Handouts were distributed to all attendees at the conference.",
    "The company provides handouts for the training session.",
    "He tends to exaggerate his stories when telling them to friends.",
    "The article about public assistance programs helps families in need.",
    "Single mothers need affordable childcare options.",
]

print("=" * 80)
print("FALSE POSITIVE TEST - Neutral Text Should NOT Trigger Bias Detection")
print("=" * 80)

false_positives = []

for i, test_text in enumerate(neutral_texts, 1):
    text_lower = test_text.lower()
    print(f"\n{i}. Testing: \"{test_text}\"")
    
    # Check all bias types
    detections = []
    detections.extend(detect_gender_bias(text_lower))
    detections.extend(detect_race_bias(text_lower))
    detections.extend(detect_age_bias(text_lower))
    detections.extend(detect_disability_bias(text_lower))
    detections.extend(detect_cultural_bias(text_lower))
    detections.extend(detect_political_bias(text_lower))
    detections.extend(detect_lgbtq_bias(text_lower))
    detections.extend(detect_socioeconomic_bias(text_lower))
    detections.extend(detect_truth_seeking_bias(text_lower))
    detections.extend(detect_ideological_neutrality_bias(text_lower))
    detections.extend(detect_language_tone_bias(text_lower))
    
    if detections:
        print(f"   ❌ FALSE POSITIVE! Detected {len(detections)} issue(s):")
        for det in detections:
            print(f"      - {det['bias_type']}: '{det['word']}'")
            false_positives.append((test_text, det))
    else:
        print(f"   ✅ Correctly no bias detected")

print("\n" + "=" * 80)
print("SUMMARY")
print("=" * 80)

if false_positives:
    print(f"\n⚠️  {len(false_positives)} FALSE POSITIVE(S) DETECTED:")
    for text, det in false_positives:
        print(f"   - Text: \"{text}\"")
        print(f"     Flagged: {det['bias_type']} - '{det['word']}'")
    sys.exit(1)
else:
    print(f"\n✅ SUCCESS! All {len(neutral_texts)} neutral texts passed without false positives!")
    sys.exit(0)
