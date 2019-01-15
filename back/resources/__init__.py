from datetime import datetime, timedelta
from enum import IntEnum
from flask import current_app, jsonify
from flask_cors import CORS
from flask_jwt_simple import JWTManager, get_jwt
from flask_restful import Api
from functools import wraps
from werkzeug.exceptions import HTTPException

def initialize_resources(application):
    api = Api(application)
    jwt = JWTManager(application)
    CORS(application, supports_credentials=True)

    # Endpoints
    from resources.home import HomeResource
    from resources.authentication import AuthenticationResource

    api.add_resource(HomeResource, '/')
    api.add_resource(AuthenticationResource, '/api/authentication')

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
            'exp': now + timedelta(hours=8),
            'iat': now,
            'nbf': now,
            'sub': identity['email'],
            'id_user': identity['id_user'],
            'name': identity['name'],
            'roles': identity['roles']
        }

def require_roles(*roles):
    def wrapper(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            jwt = get_jwt()

            if 'roles' in jwt:
                if any(role in jwt['roles'] for role in roles):
                    return f(*args, **kwargs)

            return {'message':'Unauthorized'}, 403
        return wrapped
    return wrapper

class HttpCode(IntEnum):
    Ok = 200
    BadRequest = 400
    Unauthorized = 401
    Forbidden = 403
    NotFound = 404
