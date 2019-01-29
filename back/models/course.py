from models import db
from passlib.hash import pbkdf2_sha256 as sha256
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy import String
from datetime import datetime

class Course(db.Model):
    __tablename__ = 'course'

    id :int = db.Column(db.Integer, primary_key=True)
    id_responsible :int = db.Column(db.ForeignKey('user.id'), nullable=False)
    name :str = db.Column(db.String(100), nullable=False)
    description :str = db.Column(db.Text(), nullable=False)
    icon_photo_url :str = db.Column(db.String(256), nullable=True)
    id_theme :str = db.Column(db.ForeignKey('theme.id'), nullable=False)
    hot_keys :str = db.Column(JSONB, nullable=True)
    available :str = db.Column(db.Boolean, nullable=False, default=False)
    timestamp = db.Column(db.DateTime(), nullable=False)

    responsible = db.relationship('User')
    theme = db.relationship('Theme')


    @staticmethod
    def get(id):
        return Course.query.filter_by(id=id).first()

    @staticmethod
    def list():
        return Course.query.all()

    @staticmethod
    def filter_by_responsible(responsible):
        return Course.query.filter_by(responsible=responsible).all()

    @staticmethod
    def filter_by_name(name):
        return Course.query.filter_by(name.like(name)).all()

    @staticmethod
    def filter_by_theme(theme):
        return Course.query.filter_by(theme=theme).all()

    @staticmethod
    def filter_by_hot_keys(hot_keys):
        return Course.query.filter(Course.hot_keys.op('@>')([hot_keys])).all()

    def save(self):
        self.timestamp = datetime.now()
        db.session.merge(self)
        db.session.commit()
