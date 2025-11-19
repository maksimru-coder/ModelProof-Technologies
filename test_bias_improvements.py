#!/usr/bin/env python3
"""
Test suite for BiasRadar Enterprise improvements
Validates all examples from the specification
"""

import sys
sys.path.append('api/biasradar')
from _bias_detection import hybrid_detect_bias

def test_example(name, text, should_flag, expected_biases=None):
    """Test a single example"""
    print(f"\n{'='*60}")
    print(f"TEST: {name}")
    print(f"{'='*60}")
    print(f"Text: {text}")
    
    result = hybrid_detect_bias(text, enable_ai=False)
    
    print(f"\nResult:")
    print(f"  Score: {result['score']}")
    print(f"  Severity: {result['severity']}")
    print(f"  Issues found: {len(result['issues'])}")
    
    if result['issues']:
        print(f"\n  Detected biases:")
        for issue in result['issues']:
            print(f"    - {issue['bias_type']}: '{issue['word']}' ({issue['severity']})")
            print(f"      {issue['explanation']}")
    
    # Validate expectation
    if should_flag:
        if len(result['issues']) == 0:
            print(f"\n  ❌ FAIL: Expected to flag biases but none found")
            return False
        else:
            print(f"\n  ✅ PASS: Correctly flagged biases")
            return True
    else:
        if len(result['issues']) > 0:
            print(f"\n  ❌ FAIL: False positive - should NOT flag but found {len(result['issues'])} issues")
            return False
        else:
            print(f"\n  ✅ PASS: No false positives")
            return True


def run_all_tests():
    """Run all test cases from the specification"""
    print("BiasRadar Enterprise Test Suite")
    print("="*60)
    
    results = []
    
    # Example 1: Gender false positive (competitive salary)
    results.append(test_example(
        "Example 1 - Competitive salary (should NOT flag)",
        "Competitive salary and benefits.",
        should_flag=False
    ))
    
    # Example 2: Cultural false positive (developing a model)
    results.append(test_example(
        "Example 2 - Developing a model (should NOT flag)",
        "We are developing a new model.",
        should_flag=False
    ))
    
    # Example 3: EEO statement (should NOT flag)
    results.append(test_example(
        "Example 3 - EEO statement with 'sexual orientation' (should NOT flag)",
        "We do not discriminate based on race, color, religion, sex, sexual orientation, gender identity, or disability status.",
        should_flag=False
    ))
    
    # Example 4: Real bias (should STILL flag)
    results.append(test_example(
        "Example 4 - Real bias (SHOULD flag)",
        "We're looking for a young, energetic guy who can handle aggressive targets.",
        should_flag=True,
        expected_biases=["age", "gender"]
    ))
    
    # Additional test: "developing countries" (should flag)
    results.append(test_example(
        "Additional - Developing countries (SHOULD flag)",
        "Many developing countries struggle with infrastructure.",
        should_flag=True,
        expected_biases=["culture"]
    ))
    
    # Additional test: Competitive benefits (should NOT flag)
    results.append(test_example(
        "Additional - Competitive benefits (should NOT flag)",
        "We offer competitive compensation packages.",
        should_flag=False
    ))
    
    # Additional test: Full EEO statement (should NOT flag)
    results.append(test_example(
        "Additional - Full EEO statement (should NOT flag)",
        "We are an equal employment opportunity employer. All qualified applicants will receive consideration for employment without regard to race, color, religion, sex, national origin, disability status, protected veteran status, or any other characteristic protected by law.",
        should_flag=False
    ))
    
    # Regression test: "young company" should NOT flag (false positive check)
    results.append(test_example(
        "Regression - Young company (should NOT flag)",
        "This is a young company with innovative technology.",
        should_flag=False
    ))
    
    # Regression test: "young startup" should NOT flag (false positive check)
    results.append(test_example(
        "Regression - Young startup (should NOT flag)",
        "We are a young startup disrupting the industry.",
        should_flag=False
    ))
    
    # Print summary
    print(f"\n{'='*60}")
    print("TEST SUMMARY")
    print(f"{'='*60}")
    passed = sum(results)
    total = len(results)
    print(f"Passed: {passed}/{total}")
    print(f"Failed: {total - passed}/{total}")
    
    if passed == total:
        print(f"\n✅ ALL TESTS PASSED!")
        return 0
    else:
        print(f"\n❌ SOME TESTS FAILED")
        return 1


if __name__ == "__main__":
    sys.exit(run_all_tests())
