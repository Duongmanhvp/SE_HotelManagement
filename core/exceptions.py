from rest_framework import status
from rest_framework.exceptions import APIException

class PasswordMismatchException(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'Password mismatch'
    default_code = 'invalid'

class EmailExistedException(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    errors = 'Email exited'
    default_detail = 'Email existed'
    default_code = 'invalid'
