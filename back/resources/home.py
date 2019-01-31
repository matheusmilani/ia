from flask import redirect, request, Response
from flask_restful import Resource


class HomeResource(Resource):
    def get(self):
        return {}, 200
