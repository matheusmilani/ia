from flask import request, jsonify
from flask_restful import Resource
from resources import require_roles
from models.user import User
from models.theme import Theme
from models.hot_key import HotKey
from models.course import Course


class CourseResource(Resource):
    def get(self):
        if 'Authorization' not in request.headers:
            return {}, 401
        auth = require_roles(
            request.headers['Authorization'], [
                'student', 'instructor'])
        if auth is False:
            return {}, 401

        if 'id' in request.args:
            course = Course.get(request.args['id'])

            if course is None:
                return {}, 400

            return {
                'id': course.id,
                'name': course.name,
                'description': course.description,
                'responsible': course.responsible.id,
                'image': course.icon_photo_url,
                'theme': {'value': course.theme.id,
                          'label': course.theme.name
                          },
                'hot_keys': list(map(lambda hot_key: {
                    'value': hot_key.id,
                    'label': hot_key.name
                }, HotKey.list_by_ids(course.hot_keys)))
            }
        else:
            # Get all courses
            courses = Course.list()

            if courses is None:
                return {}, 400

            return list(map(lambda course: {
                'id': course.id,
                'name': course.name,
                'photo': course.icon_photo_url
            }, courses))

    def post(self):
        if 'Authorization' not in request.headers:
            return {}, 401
        auth = require_roles(request.headers['Authorization'], ['instructor'])
        if auth is False:
            return {}, 401

        data = request.get_json()
        name = data['name']
        description = data['description']
        theme_id = data['theme']['value']
        user_id = data['user_id']
        photo = data['image']
        hot_keys_ids = []

        if 'hot_keys' in data:
            for hot_key in data['hot_keys']:
                hot_keys_ids.append(hot_key['value'])
        else:
            hot_keys_ids = ['']

        if 'id' not in data:
            course = Course()
            course.name = name
            course.description = description
            course.responsible = User.get(user_id)
            course.theme = Theme.get(theme_id)
            course.icon_photo_url = photo
            course.hot_keys = hot_keys_ids
            course.save()
            return {}, 200
        else:
            course = Course.get(data['id'])
            course.name = name
            course.description = description
            course.responsible = User.get(user_id)
            course.theme = Theme.get(theme_id)
            course.icon_photo_url = photo
            course.hot_keys = hot_keys_ids
            course.save()
            return {}, 200

        return {}, 400
