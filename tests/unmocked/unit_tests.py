#UNMOCKED unit tests go here
import unittest
import os
import sys
import unittest.mock as mock
from unittest.mock import patch

LIST_INPUT = "userlist"
USER_INPUT = "username"
USER_SCORE = "score"
EXPECTED_OUTPUT = "expected"

sys.path.append(os.path.abspath('../../'))
from app import collect_usernames
from app import collect_scores

class AddUserTestCase(unittest.TestCase):
    
    def setUp(self):
        self.success_test_params = [

            {
                LIST_INPUT: [{USER_INPUT: "cknnoodle", USER_SCORE: 100}],
                EXPECTED_OUTPUT: ["cknnoodle"],
            },
            {
                LIST_INPUT: [
                    {USER_INPUT: "cknnoodle", USER_SCORE: 100},
                    {USER_INPUT: "clamchowder", USER_SCORE: 105},
                ],
                EXPECTED_OUTPUT: ["cknnoodle", "clamchowder"],
            },
        ]
        
    def test_username_list(self):
        for test in self.success_test_params:
            actual_result = collect_usernames(test[LIST_INPUT])
            expected_result = test[EXPECTED_OUTPUT]
            
            self.assertEqual(len(actual_result), len(expected_result))
            self.assertEqual(actual_result, expected_result)
            

if __name__ == '__main__':
    unittest.main()