# builtin
import os
from sys import stdout
import glob
import logging
import logging.config

# installed
import yaml
import hiyapyco
from pprint import pprint, pformat
from flask import Flask, jsonify, request



log_format = "%(asctime)s.%(msecs)03d | %(levelname)s | elapsed=%(relativeCreated)d ms loc=%(module)s.%(funcName)s:%(lineno)d\n%(message)s"
logging.basicConfig(level=logging.DEBUG,
                    format=log_format,
                    datefmt="%Y-%m-%d %H:%M:%S")
logger = logging.getLogger('riskeasy')


# creating the Flask application
app = Flask(__name__)

# Flask routes
@app.route('/surveys', methods=['GET'])
def list_surveys():
    survey_names = []
    for key in SURVEYS:
        survey_names.append(key)
    
    logger.info(f"Available Surveys: {survey_names}")
    return jsonify(survey_names)


@app.route('/surveys/<survey_name>', methods=['GET'])
def get_survey_questions(survey_name):
    # logger.info(f"PhysicalSafety Questions: {get_survey_questions(surveys["PhysicalSafety"])}")
    return jsonify(SURVEYS[survey_name])


@app.route('/profiles', methods=['GET'])
def list_profiles():
    profiles = get_local_profile_list()
    logger.info(f"{len(profiles)} profiles found locally")

    return jsonify(profiles)


@app.route('/profiles/<ndis_id>', methods=['GET', 'PUT'])
def handle_profile(ndis_id):
    if request.method == 'GET':
        return jsonify(load_profile(ndis_id))
    elif request.method == 'PUT':
        payload = request.get_json()
        logger.debug(f"PUT received for /profiles/{ndis_id}")
        logger.debug(f"Request:\n{payload}")
        save_profile(payload)
        msg = f"Profile for {ndis_id} saved."
        return jsonify(msg), 201


# @app.route('/profiles/')


# Utilities
def get_working_dir():
    current_file_dir = os.path.dirname(os.path.realpath(__file__))
    working_dir = os.path.realpath(os.path.join(current_file_dir, "../../data"))
    logger.debug(f"main.py path: {current_file_dir}\main.py")
    logger.debug(f"WORKING_DIR: {working_dir}")

    return working_dir


def read_survey_config():
    survey_file = os.path.join(WORKING_DIR, "surveys.yaml")
    logger.info(f"Survey file: {survey_file}")

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


def save_profile(json_payload):
    ndis_id = json_payload['ndis_id']
    logger.debug(f"Converting JSON to YAML")
    recvd_yaml = yaml.dump(json_payload)
    logger.debug(f"**** Received YAML ****:\n{recvd_yaml}")

    filename = f"{ndis_id}.yaml"
    filepath = os.path.join(WORKING_DIR, "profiles", filename)
    logger.debug(f"Writing profile to {filepath} for {ndis_id}")
    with open(filepath, 'w') as f:
        f.write(recvd_yaml)
    logger.info(f"Saved profile successfully.")


def merge_profile(json_payload):
    ndis_id = json_payload['ndis_id']
    logger.debug(f"Converting JSON to YAML")
    recvd_yaml = yaml.dump(json_payload)
    logger.debug(f"**** Received YAML ****:\n{recvd_yaml}")

    filename = f"{ndis_id}.yaml"
    filepath = os.path.join(WORKING_DIR, "profiles", filename)
    if os.path.isfile(filepath):
        logger.info("Merging into existing profile")

        with open(filepath, 'r') as f:
            existing_yaml = f.read()
        logger.debug(f"**** Existing YAML ****:\n{existing_yaml}")

        merged_obj = hiyapyco.load([existing_yaml, recvd_yaml],
                                    method=hiyapyco.METHOD_MERGE,
                                    loglevel=logging.INFO,
                                    mergelists=False)
        merged_yaml = hiyapyco.dump(merged_obj)
        logger.debug(f"**** Merged YAML ****:\n{merged_yaml}")

        logger.debug(f"Overwriting profile at {filepath} for {ndis_id}")
        with open(filepath, 'w') as f:
            f.write(merged_yaml)


# init common stuff
with app.app_context():
    WORKING_DIR = get_working_dir()
    SURVEYS = read_survey_config()
    logger.info("READY: Webserver loaded.")
