#!/usr/bin/env python3
"""Test comprehensive bias detection regression case"""

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

# Comprehensive test case that should trigger all 13 dimensions
test_text = """Old lazy transgender welfare queens and crazy cat ladies on handouts are illegals who fake disabilities and spread lies like snowflakes while real Americans cheer Trump's genius wall against their primitive culture."""

text_lower = test_text.lower()

print("=" * 80)
print("COMPREHENSIVE BIAS DETECTION TEST")
print("=" * 80)
print(f"\nTest Text:\n{test_text}\n")
print("=" * 80)

# Track which dimensions detected something
dimensions_detected = []

# Test each bias type
print("\n1. GENDER BIAS:")
gender_issues = detect_gender_bias(text_lower)
if gender_issues:
    dimensions_detected.append("gender")
    for issue in gender_issues:
        print(f"   ✓ Found: '{issue['word']}' - {issue['explanation']}")
else:
    print("   ✗ No gender bias detected")

print("\n2. RACE BIAS:")
race_issues = detect_race_bias(text_lower)
if race_issues:
    dimensions_detected.append("race")
    for issue in race_issues:
        print(f"   ✓ Found: '{issue['word']}' - {issue['explanation']}")
else:
    print("   ✗ No race bias detected")

print("\n3. AGE BIAS:")
age_issues = detect_age_bias(text_lower)
if age_issues:
    dimensions_detected.append("age")
    for issue in age_issues:
        print(f"   ✓ Found: '{issue['word']}' - {issue['explanation']}")
else:
    print("   ✗ No age bias detected")

print("\n4. DISABILITY BIAS:")
disability_issues = detect_disability_bias(text_lower)
if disability_issues:
    dimensions_detected.append("disability")
    for issue in disability_issues:
        print(f"   ✓ Found: '{issue['word']}' - {issue['explanation']}")
else:
    print("   ✗ No disability bias detected")

print("\n5. CULTURAL BIAS:")
cultural_issues = detect_cultural_bias(text_lower)
if cultural_issues:
    dimensions_detected.append("culture")
    for issue in cultural_issues:
        print(f"   ✓ Found: '{issue['word']}' - {issue['explanation']}")
else:
    print("   ✗ No cultural bias detected")

print("\n6. POLITICAL BIAS:")
political_issues = detect_political_bias(text_lower)
if political_issues:
    dimensions_detected.append("political")
    for issue in political_issues:
        print(f"   ✓ Found: '{issue['word']}' - {issue['explanation']}")
else:
    print("   ✗ No political bias detected")

print("\n7. LGBTQ+ BIAS:")
lgbtq_issues = detect_lgbtq_bias(text_lower)
if lgbtq_issues:
    dimensions_detected.append("lgbtq")
    for issue in lgbtq_issues:
        print(f"   ✓ Found: '{issue['word']}' - {issue['explanation']}")
else:
    print("   ✗ No LGBTQ+ bias detected")

print("\n8. SOCIOECONOMIC BIAS:")
socioeconomic_issues = detect_socioeconomic_bias(text_lower)
if socioeconomic_issues:
    dimensions_detected.append("socioeconomic")
    for issue in socioeconomic_issues:
        print(f"   ✓ Found: '{issue['word']}' - {issue['explanation']}")
else:
    print("   ✗ No socioeconomic bias detected")

print("\n9. TRUTH-SEEKING BIAS:")
truth_issues = detect_truth_seeking_bias(text_lower)
if truth_issues:
    dimensions_detected.append("truth_seeking")
    for issue in truth_issues:
        print(f"   ✓ Found: '{issue['word']}' - {issue['explanation']}")
else:
    print("   ✗ No truth-seeking bias detected")

print("\n10. IDEOLOGICAL NEUTRALITY BIAS:")
ideological_issues = detect_ideological_neutrality_bias(text_lower)
if ideological_issues:
    dimensions_detected.append("ideological_neutrality")
    for issue in ideological_issues:
        print(f"   ✓ Found: '{issue['word']}' - {issue['explanation']}")
else:
    print("   ✗ No ideological neutrality bias detected")

print("\n11. LANGUAGE & TONE BIAS:")
language_issues = detect_language_tone_bias(text_lower)
if language_issues:
    dimensions_detected.append("language_tone")
    for issue in language_issues:
        print(f"   ✓ Found: '{issue['word']}' - {issue['explanation']}")
else:
    print("   ✗ No language & tone bias detected")

# Summary
print("\n" + "=" * 80)
print("SUMMARY")
print("=" * 80)
print(f"Dimensions detected: {len(dimensions_detected)}/11 (excluding religion & intersectional)")
print(f"Detected: {', '.join(dimensions_detected) if dimensions_detected else 'None'}")

# Expected detections
expected = [
    "gender",      # "genius" 
    "race",        # "illegals", "primitive"
    "age",         # "old", "lazy"
    "disability",  # "crazy", "fake disabilities"
    "culture",     # "primitive"
    "political",   # "snowflakes", "real americans", "trump"
    "lgbtq",       # "transgender"
    "socioeconomic",  # "welfare queens", "handouts"
    "truth_seeking"   # "spread lies"
]

missing = [dim for dim in expected if dim not in dimensions_detected]
if missing:
    print(f"\n⚠️  MISSING DETECTIONS: {', '.join(missing)}")
    sys.exit(1)
else:
    print(f"\n✅ SUCCESS! All expected dimensions detected!")
    sys.exit(0)
