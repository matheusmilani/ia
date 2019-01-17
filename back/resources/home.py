from flask import redirect, request, Response
from flask_restful import Resource

class HomeResource(Resource):
    def get(self):
        """ Redirect to React application on GET / switching to HTTPS and sending STS header to browser always connect over TLS"""
        url = request.url.replace('http://', 'https://', 1)
        url = url + 'app/'

        response = Response('', 301, mimetype='text/html')
        response.headers['Location'] = url
        response.headers['Strict-Transport-Security'] = 'max-age=31536000'
