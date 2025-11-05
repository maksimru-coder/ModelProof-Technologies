#!/usr/bin/env python3
"""Test detection of subtle, polite bias language (coded dog-whistles)"""

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

# Subtle, "polite" biased text using coded language
subtle_text = """Older low-income transgender single mothers and disabled veterans on public assistance are undocumented residents who exaggerate health conditions, follow non-mainstream faiths, and share emotionally charged social-media posts while patriotic citizens support border security against outdated traditions."""

print("=" * 80)
print("SUBTLE BIAS DETECTION TEST - Coded Language & Dog Whistles")
print("=" * 80)
print(f"\nTest Text:\n{subtle_text}\n")
print("=" * 80)

text_lower = subtle_text.lower()

# Collect all detections
all_detections = []

dimensions = {
    "GENDER": detect_gender_bias(text_lower),
    "RACE": detect_race_bias(text_lower),
    "AGE": detect_age_bias(text_lower),
    "DISABILITY": detect_disability_bias(text_lower),
    "CULTURAL": detect_cultural_bias(text_lower),
    "POLITICAL": detect_political_bias(text_lower),
    "RELIGION": detect_religion_bias(text_lower),
    "LGBTQ+": detect_lgbtq_bias(text_lower),
    "SOCIOECONOMIC": detect_socioeconomic_bias(text_lower),
    "TRUTH-SEEKING": detect_truth_seeking_bias(text_lower),
    "IDEOLOGICAL NEUTRALITY": detect_ideological_neutrality_bias(text_lower),
    "LANGUAGE & TONE": detect_language_tone_bias(text_lower)
}

detected_count = 0
for i, (dimension, detections) in enumerate(dimensions.items(), 1):
    print(f"\n{i}. {dimension} BIAS:")
    if detections:
        detected_count += 1
        for det in detections:
            print(f"   ✓ Found: '{det['word']}' - {det['explanation']}")
    else:
        print(f"   ✗ No {dimension.lower()} bias detected")

print("\n" + "=" * 80)
print("SUMMARY")
print("=" * 80)

target_dimensions = [
    "GENDER (single mothers)",
    "RACE (undocumented residents)",
    "AGE (older low-income)",
    "DISABILITY (exaggerate health conditions)",
    "CULTURAL (outdated traditions)",
    "POLITICAL (patriotic)",
    "RELIGION (non-mainstream faiths)",
    "LGBTQ+ (transgender)",
    "SOCIOECONOMIC (public assistance)",
    "TRUTH-SEEKING (exaggerate)",
    "IDEOLOGICAL NEUTRALITY (patriotic citizens)",
    "LANGUAGE & TONE (emotionally charged)"
]

print(f"\nDimensions detected: {detected_count}/12")
print(f"Detected: {', '.join([dim.lower() for dim, dets in dimensions.items() if dets])}")

if detected_count >= 10:
    print(f"\n✅ SUCCESS! Detected {detected_count}/12 subtle bias dimensions!")
    print("Enterprise-grade coded language detection working!")
    sys.exit(0)
else:
    print(f"\n⚠️  Only detected {detected_count}/12 dimensions. Target: 10+")
    print("\nMissing detections for:")
    for target in target_dimensions:
        dimension_name = target.split(" (")[0]
        if not dimensions.get(dimension_name):
            print(f"   - {target}")
    sys.exit(1)
