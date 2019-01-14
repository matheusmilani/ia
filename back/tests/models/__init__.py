from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from schema.seed.seed_file import Seed
from schema.schema_file import Schema
db = SQLAlchemy()

def create_test_app():
    global db
    global app

    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://global:123abc@localhost:5432/ai_teacher_test'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.app_context().push()
    db.init_app(app)
    db.reflect()
    db.drop_all()
    Schema.migration()
    Seed.user_student()
    Seed.user_instructor()
