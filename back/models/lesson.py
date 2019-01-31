from models import db
from passlib.hash import pbkdf2_sha256 as sha256
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy import String
from datetime import datetime


class Lesson(db.Model):
    __tablename__ = 'lesson'

    id: int = db.Column(db.Integer, primary_key=True)
    name: str = db.Column(db.String(100), nullable=False)
    description: str = db.Column(db.Text, nullable=False)
    required: str = db.Column(db.Boolean, nullable=False, default=True)
    position: int = db.Column(db.Integer, nullable=False)
    id_module: int = db.Column(
        db.ForeignKey(
            'module.id',
            onupdate='CASCADE',
            ondelete='CASCADE'),
        nullable=False)
    timestamp = db.Column(db.DateTime(), nullable=False)

    module = db.relationship('Module', cascade="save-update, merge, delete")

    @staticmethod
    def get(id):
        return Lesson.query.filter_by(id=id).first()

    @staticmethod
    def list_by_module(id_module):
        return Lesson.query.filter_by(id_module=id_module).all()

    def save(self):
        self.name = self.name.lower()
        self.timestamp = datetime.now()
        db.session.merge(self)
        db.session.commit()

    @staticmethod
    def delete(id):
        Lesson.query.filter_by(id=id).delete()
        db.session.commit()
