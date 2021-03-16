import unittest
import os
import sys

USERNAME_INPUT = "username"
USERS_INPUT = 'users'
EXPECTED_OUTPUT = "expected"

sys.path.append(os.path.abspath('../../'))

from app import add_user
from app import check_winner

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
            },
            
            {
                USERNAME_INPUT: "curlyfries",
                USERS_INPUT: {
                    'X': "cknnoodle",
                    'O': "clamchowder",
                    'Spectators': [],
                },
                EXPECTED_OUTPUT: {
                    'X': "cknnoodle",
                    'O': "clamchowder",
                    'Spectators': ["curlyfries"],
                }
            }
        ]

    def test_add_user(self):
        for test in self.success_test_params:

            actual_result = add_user(test[USERNAME_INPUT], test[USERS_INPUT])
            expected_result = test[EXPECTED_OUTPUT]
            
            self.assertEqual(actual_result['X'], expected_result['X'])
            self.assertEqual(actual_result['O'], expected_result['O'])
            self.assertEqual(actual_result['Spectators'], expected_result['Spectators'])

WINNER_INPUT = "winner"
PLAYERX_INPUT = "player_x"
CURR_PLAYER_INPUT = "username"
EXPECTED_OUTPUT = "expected"

class CheckWinnerTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                WINNER_INPUT: "X",
                PLAYERX_INPUT: "coldsoup",
                CURR_PLAYER_INPUT: "coldsoup",
                EXPECTED_OUTPUT: True,
            },
            
            {
                WINNER_INPUT: "O",
                PLAYERX_INPUT: "coldsoup",
                CURR_PLAYER_INPUT: "coldsoup",
                EXPECTED_OUTPUT: False,
            },
            
            {
                WINNER_INPUT: "X",
                PLAYERX_INPUT: "cheerios",
                CURR_PLAYER_INPUT: "honey",
                EXPECTED_OUTPUT: False,
            },
            
            {
                WINNER_INPUT: "O",
                PLAYERX_INPUT: "cheerios",
                CURR_PLAYER_INPUT: "cheerios",
                EXPECTED_OUTPUT: False,
            },
            
        ]
        
        self.failure_test_params = [
            {
                WINNER_INPUT: "X",
                PLAYERX_INPUT: "lucky",
                CURR_PLAYER_INPUT: "charms",
                EXPECTED_OUTPUT: True,
            },
            {
                WINNER_INPUT: "O",
                PLAYERX_INPUT: "lucky",
                CURR_PLAYER_INPUT: "lucky",
                EXPECTED_OUTPUT: True,
            }
        ]
        
    def test_winner_status_success(self):
        for test in self.success_test_params:

            actual_result = check_winner(test[WINNER_INPUT], test[PLAYERX_INPUT], test[CURR_PLAYER_INPUT])
            expected_result = test[EXPECTED_OUTPUT]

            self.assertEqual(actual_result, expected_result)

    def test_winner_status_failure(self):
        for test in self.failure_test_params:

            actual_result = check_winner(test[WINNER_INPUT], test[PLAYERX_INPUT], test[CURR_PLAYER_INPUT])
            expected_result = test[EXPECTED_OUTPUT]
            
            self.assertNotEqual(actual_result, expected_result)

if __name__ == '__main__':
    unittest.main()