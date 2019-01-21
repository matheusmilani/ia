from models import db
from models.account_lookup import AccountLookupModel
from models.company import CompanyModel
from models.fact import FactModel
from models.file_type import FileTypeModel
from models.process_input_I01 import ProcessInputI01Model
from models.process_input_i02 import ProcessInputI02Model
from models.process_input_i04 import ProcessInputI04Model
from models.process_input_i06 import ProcessInputI06Model
from models.process_input_i08 import ProcessInputI08Model
from models.process_input_i11 import ProcessInputI11Model
from models.process_input_i13 import ProcessInputI13Model
from models.process_input_i15 import ProcessInputI15Model
from models.process_input import ProcessInputModel
from models.process_status import ProcessStatusModel
from models.process_type import ProcessTypeModel
from models.process import ProcessModel
from models.product import ProductModel
from models.product import ProductModel
from models.segment import SegmentModel
from models.translate import TranslateModel
from models.user import UserModel
from models.kpi import KpiModel
from models.kpi_values import KpiValuesModel
from models.fact_values import FactValuesModel

from sqlalchemy import create_engine

class Schema:
    @staticmethod
    def migration():
        # engine = create_engine('postgres://deals_flight:J&Z%auHPTnQENqwB2Rw39RV%mwscXkGgt=mcX*qW@dev-flight-e.c1nnizx7upiv.sa-east-1.rds.amazonaws.com:5432/deals_flight', echo=False)
        # KpiValuesModel.__table__.drop(engine)
        db.create_all()

        user = UserModel.query.filter_by(email='flight@pwc.com').first()

        if not user:
            company = CompanyModel()
            company.id_segment = 13
            company.country = 'BR'
            company.identifier = ''
            company.keyword = 'assurance'
            company.name = 'PwC Brasil'
            company.state = 'SP'
            company.save()

            user1 = UserModel()
            user1.id_company = 1
            user1.email = 'flight@pwc.com'
            user1.name = 'Administrator'
            user1.password = 'Pwc@2018'
            user1.roles = ['admin', 'operation', 'partner']
            user1.save()
