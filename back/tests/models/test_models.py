import pytest
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from . import create_test_app
from . import db

from models.user import User
from models.theme import Theme
from models.course import Course

@pytest.fixture(scope="session", autouse=True)
def before_all():
    create_test_app()

class TestUser:
    def test_get_user(self):
        student = User.get('1')
        assert student.email == 'student@student.com'
        assert student.name == 'Estudante'
        assert student.social_name == 'Estudante nome social'
        assert student.roles == ['student']

        instructor = User.get('2')
        assert instructor.email == 'instructor@instructor.com'
        assert student.profile_photo_url == 'http://img.img.com'
        assert instructor.name == 'Instrutor'
        assert instructor.roles == ['instructor']


    def test_list_user(self):
        users = User.list()
        assert len(users) == 2


    def test_find_user_by_email(self):
        instructor = User.filter_by_email('instructor@instructor.com')
        assert instructor.email == 'instructor@instructor.com'
        assert instructor.name == 'Instrutor'
        assert instructor.roles == ['instructor']

        student = User.filter_by_email('student@student.com')
        assert student.email == 'student@student.com'
        assert student.name == 'Estudante'
        assert student.roles == ['student']


    def test_find_user_by_name(self):
        instructor = User.filter_by_name('Instrutor')
        assert instructor.email == 'instructor@instructor.com'
        assert instructor.name == 'Instrutor'
        assert instructor.roles == ['instructor']

        student = User.filter_by_name('Estudante')
        assert student.email == 'student@student.com'
        assert student.name == 'Estudante'
        assert student.roles == ['student']


    def test_find_user_by_role(self):
        instructor = User.filter_by_role('instructor')
        assert instructor[0].email == 'instructor@instructor.com'
        assert instructor[0].name == 'Instrutor'
        assert instructor[0].roles == ['instructor']

        student = User.filter_by_role('student')
        assert student[0].email == 'student@student.com'
        assert student[0].name == 'Estudante'
        assert student[0].roles == ['student']


    def test_save_user(self):
        count_user = User.query.count()

        new_user = User()
        new_user.email = 'new_user@new_user.com'
        new_user.name = 'New User'
        new_user.password = '1234'
        new_user.roles = ['student']
        new_user.save()

        new_user_find = User.filter_by_email('new_user@new_user.com')

        assert User.query.count() == (count_user + 1)
        assert new_user_find.email == 'new_user@new_user.com'
        assert new_user_find.name == 'New User'
        assert new_user_find.roles == ['student']


    def test_authenticate_correct_user(self):
        authenticate = User.authenticate('student@student.com', '1234')
        assert authenticate == User.query.filter_by(email='student@student.com').first()

        authenticate = User.authenticate('instructor@instructor.com', '1234')
        assert authenticate == User.query.filter_by(email='instructor@instructor.com').first()


    def test_no_authenticate_wrong_user(self):
        authenticate = User.authenticate('wrong_user@wrong_user.com', '1234')
        assert authenticate == None


    def test_no_authenticate_wrong_password(self):
        authenticate = User.authenticate('new_user@new_user.com', 'wrong-pass')
        assert authenticate == None


class TestTheme:
    def test_get_theme(self):
        theme = Theme.get('1')
        assert theme.name == 'web'

    def test_list_theme(self):
        theme = Theme.list()
        assert len(theme) == 1

    def test_filter_by_name_theme_camelcase(self):
        theme = Theme.filter_by_name('Web')
        assert len(theme) == 1
        assert theme[0].name == 'web'

    def test_filter_by_name_theme_lowercase(self):
        theme = Theme.filter_by_name('web')
        assert len(theme) == 1
        assert theme[0].name == 'web'

    def test_filter_by_name_theme_uppercase(self):
        theme = Theme.filter_by_name('WEB')
        assert len(theme) == 1
        assert theme[0].name == 'web'

    def test_filter_by_name_theme_does_not_exists(self):
        theme = Theme.filter_by_name('Not exists')
        assert len(theme) == 0

    def test_filter_by_name_theme(self):
        count_initial = len(Theme.list())

        theme = Theme()
        theme.name = "New Theme"
        theme.save()

        assert len(Theme.list()) == (count_initial + 1)
        assert len(Theme.filter_by_name('new theme')) == 1


class TestCourse:
    def test_get_course(self):
        course = Course.get('1')
        assert course.name == 'Curso 01'

    def test_list_course(self):
        course = Course.list()
        assert len(course) == 1

    def test_save_course(self):
        initial_count = len(Course.list())

        course = Course()
        course.name = 'Curso 02'
        course.description = 'Fusce eu placerat odio.'
        course.responsible = User.filter_by_role('instructor')[0]
        course.theme = Theme.filter_by_name('web')[0]
        course.icon_photo_url = 'http://img.img.com'
        course.hot_keys = ['python', 'web', 'desenvolvimento', '01', 'mais', 'outro', 'hot_key']
        course.save()

        assert len(Course.list()) == (initial_count + 1)

    def test_filter_by_responsible_course(self):
        course = Course.filter_by_responsible(User.filter_by_role('instructor')[0])
        assert len(course) == 2

    def test_filter_by_responsible_course(self):
        course = Course.filter_by_responsible(User.filter_by_role('student')[0])
        assert len(course) == 0

    def test_filter_by_theme(self):
        course = Course.filter_by_theme(Theme.filter_by_name('web')[0])
        assert len(course) == 2

    def test_filter_by_theme(self):
        theme = Theme()
        theme.name = "test"
        theme.save()

        course = Course.filter_by_theme(Theme.filter_by_name('test')[0])
        assert len(course) == 0

    def test_filter_by_hot_keys(self):
        course = Course.filter_by_hot_keys('python')
        assert len(course) == 2

    def test_filter_by_hot_keys(self):
        course = Course.filter_by_hot_keys('outro')
        assert len(course) == 1

    def test_filter_by_hot_keys(self):
        course = Course.filter_by_hot_keys('blergh')
        assert len(course) == 0
