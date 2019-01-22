from datetime import datetime, timedelta
from enum import IntEnum
from flask import current_app, jsonify
from flask_cors import CORS
from flask_jwt_simple import JWTManager, get_jwt
from flask_restful import Api
from functools import wraps
from werkzeug.exceptions import HTTPException
from os import environ
import jwt

def initialize_resources(application):
    api = Api(application)
    jwt = JWTManager(application)
    CORS(application, supports_credentials=True)

    # Endpoints
    from resources.home import HomeResource
    from resources.authentication import AuthenticationResource
    from resources.user import UserResource
    from resources.theme import ThemeResource
    from resources.hot_key import HotKeyResource
    from resources.course import CourseResource

    api.add_resource(HomeResource, '/')
    api.add_resource(AuthenticationResource, '/api/authentication')
    api.add_resource(UserResource, '/api/user')
    api.add_resource(ThemeResource, '/api/theme')
    api.add_resource(HotKeyResource, '/api/hot_key')
    api.add_resource(CourseResource, '/api/course')

    def handle_error(e):
        code = 500
        if isinstance(e, HTTPException):
            code = e.code
        return jsonify(message=str(e)), code

    @application.after_request
    def nocache_control(response):
        response.headers['Last-Modified'] = datetime.now()
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '-1'

        return response

    @jwt.jwt_data_loader
    def add_claims_to_access_token(identity):
        now = datetime.utcnow()

        return {
            'exp': now + timedelta(hours=24),
            'iat': now,
            'nbf': now,
            'sub': identity['email'],
            'id_user': identity['id_user'],
            'name': identity['name'],
            'roles': identity['roles']
        }

def require_roles(token, permitted_roles):
    jwt_decoded = jwt.decode(token, environ['JWT_SECRET_KEY'], options={'verify_exp': False})
    if 'roles' in jwt_decoded:
        if any(role in permitted_roles for role in jwt_decoded['roles']):
            return True
        else:
            return False
    return False

class HttpCode(IntEnum):
    Ok = 200
    BadRequest = 400
    Unauthorized = 401
    Forbidden = 403
    NotFound = 404
