from dotenv import load_dotenv
from flask import Flask
from models import initialize_database
from os import environ
from resources import initialize_resources

# Starting Flask application
application = Flask(__name__)

# Loading environment variables from .env file only in development
if not environ.get('EBS_ENVIRONMENT', None):
    print('Loading environment variables from .env file')
    load_dotenv('./environments/local.env')

# Loading environment variables into Flask application
for item in environ.items():
    application.config[item[0]] = item[1]

# Starting database configuration
initialize_database(application)

# Starting RESTful endpoints
initialize_resources(application)

# Run application
if __name__ == '__main__':
    application.run()
