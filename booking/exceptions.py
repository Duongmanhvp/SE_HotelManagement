from rest_framework import status
from rest_framework.exceptions import APIException

class NotEnoughStockException(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'There is not enough stock'
    default_code = 'invalid'

class NotAProperRatingNumberException(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'Not a proper input for rating'
    default_code = 'invalid'
