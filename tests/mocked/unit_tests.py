import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

sys.path.append(os.path.abspath('../../'))
from app import add_user_to_db
from app import check_if_exists
import models

KEY_INPUT = 'input'
KEY_EXPECTED = 'expected'

INITIAL_USERNAME = 'soup'

class AddUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: "chicken",
                KEY_EXPECTED: [INITIAL_USERNAME, "chicken"],
            },
            
            {
                KEY_INPUT: "noodle",
                KEY_EXPECTED: [INITIAL_USERNAME, "chicken", "noodle"],
            },
            
            {
                KEY_INPUT: "clam",
                KEY_EXPECTED: [INITIAL_USERNAME, "chicken", "noodle", "clam"],
            },
            
            {
                KEY_INPUT: "chowder",
                KEY_EXPECTED: [INITIAL_USERNAME, "chicken", "noodle", "clam", "chowder"],
            },
        ]
        
        initial_person = models.Person(username=INITIAL_USERNAME, score=100)
        self.initial_db_mock = [initial_person]
    
 
    def mocked_db_session_add(self, username):
        self.initial_db_mock.append(username)

    def mocked_db_session_commit(self):
        pass
    
    def mocked_person_query_all(self):
        return self.initial_db_mock
        
    def test_success(self):
        for test in self.success_test_params:
            with patch('app.db.session.add', self.mocked_db_session_add):
                with patch('app.db.session.commit', self.mocked_db_session_commit):
                    with patch('models.Person.query') as mocked_query:
                        mocked_query.all = self.mocked_person_query_all

                        
                        actual_result = add_user_to_db(test[KEY_INPUT])
                        expected_result = test[KEY_EXPECTED]
                        self.assertEqual(len(actual_result), len(expected_result))
                        self.assertEqual(actual_result[0], expected_result[0])
                        self.assertEqual(actual_result[1], expected_result[1])

USER_INPUT = "username"
EXPECTED_OUTPUT = "expected"

class CheckExistsTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: "parm",
                KEY_EXPECTED: False,
            },
            
            {
                KEY_INPUT: "noodle",
                KEY_EXPECTED: True,
            },
            
            {
                KEY_INPUT: "water",
                KEY_EXPECTED: False,
            },
            
            {
                KEY_INPUT: "soup",
                KEY_EXPECTED: True,
            },
        ]
        
        self.failure_test_params = [
            {
                KEY_INPUT: "honey",
                KEY_EXPECTED: True,
            },
            {
                KEY_INPUT: "cheerios",
                KEY_EXPECTED: True,
            }
        ]
        
        user1 = models.Person(username="noodle", score=100)
        user2 = models.Person(username="soup", score=105)
        self.initial_db_mock = [user1, user2]
    
    def mocked_db_session_filter(self, username):
        for each in self.initial_db_mock:
            if each.username == username:
                return True
        return False
        
    def test_exists_success(self):
        for test in self.success_test_params:
            with patch('models.Person.query.filter_by', self.mocked_db_session_filter): 
                actual_result = self.mocked_db_session_filter(test[KEY_INPUT])
                expected_result = test[KEY_EXPECTED]

                self.assertEqual(actual_result, expected_result)
    
    def test_exists_failure(self):
        for test in self.failure_test_params:
            with patch('models.Person.query.filter_by', self.mocked_db_session_filter): 
                actual_result = self.mocked_db_session_filter(test[KEY_INPUT])
                expected_result = test[KEY_EXPECTED]        

                self.assertNotEqual(actual_result, expected_result)


if __name__ == '__main__':
    unittest.main()