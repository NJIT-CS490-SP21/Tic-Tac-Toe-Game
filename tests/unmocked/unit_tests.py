import unittest
import os
import sys


USERNAME_INPUT = "username"
USERS_INPUT = 'users'
EXPECTED_OUTPUT = "expected"

sys.path.append(os.path.abspath('../../'))

from app import add_user

class UpdateUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                USERNAME_INPUT: "cknnoodle",
                USERS_INPUT: {
                    'X': None,
                    'O': None,
                    'Spectators': [],
                },
                EXPECTED_OUTPUT: {
                    'X': "cknnoodle",
                    'O': None,
                    'Spectators': [],
                }
            },
        
            {
                USERNAME_INPUT: "clamchowder",
                USERS_INPUT: {
                    'X': "cknnoodle",
                    'O': None,
                    'Spectators': [],
                },
                EXPECTED_OUTPUT: {
                    'X': "cknnoodle",
                    'O': "clamchowder",
                    'Spectators': [],
                }
                
            },
            
            {
                USERNAME_INPUT: "macncheese",
                USERS_INPUT: {
                    'X': "cknnoodle",
                    'O': "clamchowder",
                    'Spectators': [],
                },
                EXPECTED_OUTPUT: {
                    'X': "cknnoodle",
                    'O': "clamchowder",
                    'Spectators': ["macncheese"],
                }
            }
        ]

    def test_add_user(self):
        for test in self.success_test_params:

            actual_result = add_user(test[USERNAME_INPUT], test[USERS_INPUT])
            expected_result = test[EXPECTED_OUTPUT]
            
            self.assertEqual(actual_result['X'], expected_result['X'])
            self.assertEqual(actual_result['O'], expected_result['O'])

if __name__ == '__main__':
    unittest.main()