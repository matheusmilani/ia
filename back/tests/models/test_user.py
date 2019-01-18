import pytest
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from . import create_test_app
from . import db

from models.user import User

@pytest.fixture(scope="session", autouse=True)
def before_all():
    create_test_app()


def test_get_user():
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


def test_list_user():
    users = User.list()
    assert len(users) == 2


def test_find_user_by_email():
    instructor = User.filter_by_email('instructor@instructor.com')
    assert instructor.email == 'instructor@instructor.com'
    assert instructor.name == 'Instrutor'
    assert instructor.roles == ['instructor']

    student = User.filter_by_email('student@student.com')
    assert student.email == 'student@student.com'
    assert student.name == 'Estudante'
    assert student.roles == ['student']


def test_find_user_by_name():
    instructor = User.filter_by_name('Instrutor')
    assert instructor.email == 'instructor@instructor.com'
    assert instructor.name == 'Instrutor'
    assert instructor.roles == ['instructor']

    student = User.filter_by_name('Estudante')
    assert student.email == 'student@student.com'
    assert student.name == 'Estudante'
    assert student.roles == ['student']


def test_find_user_by_role():
    instructor = User.filter_by_role('instructor')
    assert instructor[0].email == 'instructor@instructor.com'
    assert instructor[0].name == 'Instrutor'
    assert instructor[0].roles == ['instructor']

    student = User.filter_by_role('student')
    assert student[0].email == 'student@student.com'
    assert student[0].name == 'Estudante'
    assert student[0].roles == ['student']


def test_save_user():
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


def test_authenticate_correct_user():
    authenticate = User.authenticate('student@student.com', '1234')
    assert authenticate == User.query.filter_by(email='student@student.com').first()

    authenticate = User.authenticate('instructor@instructor.com', '1234')
    assert authenticate == User.query.filter_by(email='instructor@instructor.com').first()


def test_no_authenticate_wrong_user():
    authenticate = User.authenticate('wrong_user@wrong_user.com', '1234')
    assert authenticate == None


def test_no_authenticate_wrong_password():
    authenticate = User.authenticate('new_user@new_user.com', 'wrong-pass')
    assert authenticate == None
