from models import db
from passlib.hash import pbkdf2_sha256 as sha256
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy import String
from datetime import datetime


class HotKey(db.Model):
    __tablename__ = 'hot_key'

    id: int = db.Column(db.Integer, primary_key=True)
    name: str = db.Column(db.String(100), nullable=False)
    timestamp = db.Column(db.DateTime(), nullable=False)

    @staticmethod
    def get(id):
        return HotKey.query.filter_by(id=id).first()

    @staticmethod
    def list():
        return HotKey.query.all()

    @staticmethod
    def list_by_ids(ids):
        return HotKey.query.filter(HotKey.id.in_(ids)).all()

    @staticmethod
    def filter_by_name(name):
        name = name.lower()
        return HotKey.query.filter_by(name=name).first()

    def save(self):
        self.name = self.name.lower()
        self.timestamp = datetime.now()
        db.session.merge(self)
        db.session.commit()
