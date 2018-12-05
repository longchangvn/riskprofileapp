# builtin
import os
import glob
import logging
import logging.config

# installed
import yaml
from pprint import pprint, pformat
from flask import Flask, jsonify


log_format = "%(asctime)s.%(msecs)03d | %(levelname)s | elapsed=%(relativeCreated)d ms loc=%(module)s.%(funcName)s:%(lineno)d\n%(message)s"
logging.basicConfig(level=logging.INFO,
                    format=log_format,
                    datefmt="%Y-%m-%d %H:%M:%S")
logger = logging.getLogger('riskeasy')


# creating the Flask application
app = Flask(__name__)

# Flask routes
@app.route('/surveys')
def list_surveys():
    survey_names = []
    for key in SURVEYS:
        survey_names.append(key)
    
    logger.info(f"Available Surveys: {survey_names}")
    return jsonify(survey_names)


@app.route('/surveys/<survey_name>')
def get_survey_questions(survey_name):
    # logger.info(f"PhysicalSafety Questions: {get_survey_questions(surveys["PhysicalSafety"])}")
    return jsonify(SURVEYS[survey_name])


@app.route('/profiles')
def list_profiles():
    profiles = get_local_profile_list()
    logger.info(f"{len(profiles)} profiles found locally")

    return jsonify(profiles)


@app.route('/profiles/<ndis_id>')
def get_risk_profile(ndis_id):
    profile = load_profile(ndis_id)

    return jsonify(profile)



# Utilities
def get_working_dir():
    current_file_dir = os.path.dirname(os.path.realpath(__file__))
    working_dir = os.path.join(current_file_dir, "../../data")
    logger.debug(f"current_file_dir: {current_file_dir}")
    logger.debug(f"working_dir: {working_dir}")

    return working_dir


def read_survey_config():
    survey_file = os.path.join(WORKING_DIR, "surveys.yaml")
    logger.debug(f"survey_file: {survey_file}")

    with open(survey_file, 'r') as f:
        return yaml.load(f)


def get_local_profile_list():
    profile_dir = os.path.join(WORKING_DIR, "profiles")
    file_filter = os.path.join(profile_dir, "*.yaml")
    profile_glob = glob.glob(file_filter)
    logger.debug(f"glob: {profile_glob}")

    return [os.path.splitext(os.path.basename(x))[0] for x in profile_glob]


def load_profile(ndis_id):
    filename = f"{ndis_id}.yaml"
    filepath = os.path.join(WORKING_DIR, "profiles", filename)
    logger.info(f"Loading profile for: {ndis_id}")
    logger.debug(f"Filepath: {filepath}")

    with open(filepath, 'r') as f:
        return yaml.load(f)


# init common stuff
with app.app_context():
    WORKING_DIR = get_working_dir()
    SURVEYS = read_survey_config()
    logger.info("App loaded and ready.")
