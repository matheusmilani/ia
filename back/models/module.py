from models import db
from passlib.hash import pbkdf2_sha256 as sha256
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy import String
from datetime import datetime

class Module(db.Model):
    __tablename__ = 'module'

    id :int = db.Column(db.Integer, primary_key=True)
    name :str = db.Column(db.String(100), nullable=False)
    description :str = db.Column(db.Text, nullable=False)
    required :str = db.Column(db.Boolean, nullable=False, default=True)
    position :int = db.Column(db.Integer, nullable=False)
    id_course :int = db.Column(db.ForeignKey('course.id'), nullable=False)
    timestamp = db.Column(db.DateTime(), nullable=False)

    course = db.relationship('Course')

    @staticmethod
    def get(id):
        return Module.query.filter_by(id=id).first()

    @staticmethod
    def list_by_course(id_course):
        return Module.query.filter_by(id_course=id_course).all()

    @staticmethod
    def filter_by_name_inside_course(name, id_course):
        name = name.lower()
        return Module.query.filter_by(name=name, id_course=id_course).first()

    def save(self):
        self.name = self.name.lower()
        self.timestamp = datetime.now()
        db.session.merge(self)
        db.session.commit()

    @staticmethod
    def delete(id):
        Module.query.filter_by(id=id).delete()
        db.session.commit()
