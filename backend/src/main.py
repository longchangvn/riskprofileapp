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
from flask import Flask, jsonify, request, abort, render_template, current_app
from flask_cors import CORS
from flask_mail import Mail, Message


log_format = "%(asctime)s.%(msecs)03d | %(levelname)s | elapsed=%(relativeCreated)d ms loc=%(module)s.%(funcName)s:%(lineno)d\n%(message)s"
logging.basicConfig(level=logging.DEBUG,
                    format=log_format,
                    datefmt="%Y-%m-%d %H:%M:%S")
logger = logging.getLogger('riskeasy')


# creating the Flask application w/ CORS enabled & mail config
app = Flask(__name__)
# current_app.config['']
CORS(app)
mail = Mail(app)


# Flask routes
@app.route('/surveys', methods=['GET'])
def _get_surveys():
    survey_names = []
    for key in SURVEYS:
        survey_names.append(key)
    
    logger.info(f"Available Surveys: {survey_names}")
    return jsonify(survey_names)


@app.route('/surveys/<survey_name>', methods=['GET'])
def _get_survey_by_name(survey_name):
    return jsonify(survey_questions=SURVEYS[survey_name], scales=SCALES, survey_name=survey_name)


@app.route('/profiles', methods=['GET'])
def _get_profiles():
    profiles = get_local_profile_list()
    logger.info(f"{len(profiles)} profiles found locally")

    return jsonify(profiles)


@app.route('/profiles/<ndis_id>', methods=['GET', 'PUT'])
def _handle_profile_request(ndis_id):
    if request.method == 'GET':
        try:
            profile = load_profile(ndis_id)
            return jsonify(profile)
        except FileNotFoundError as e:
            abort(404, f"Profile: {ndis_id} not found.")

    elif request.method == 'PUT':
        payload = request.get_json()
        logger.debug(f"PUT received for /profiles/{ndis_id}")
        logger.debug(f"Request:\n{payload}")
        save_profile(payload)
        msg = f"Profile for {ndis_id} saved."
        return jsonify(msg), 201


@app.route('/profiles/<ndis_id>/sync', methods=['POST'])
def _sync_profile(ndis_id):
    merge_profile(ndis_id)  # TODO(divv) this needs try/except error handling
    msg = f"Profile for {ndis_id} synced"
    return jsonify(msg)


@app.route('/profiles/<ndis_id>/notify', methods=['POST'])
def _notify_by_email(ndis_id):
    payload = request.get_json()
    logger.debug(f"POST received for /profiles/{ndis_id}/notify")
    logger.debug(f"Request:\n{payload}")

    logger.info(f"Fetching customer details for ndis_id={ndis_id}")
    try:  # TODO(divv) Should find a way to abstract this try/except logic for profile loading
        profile = load_profile(ndis_id)
    except FileNotFoundError as e:
        msg = f"Profile not found ({ndis_id})"
        return jsonify(msg), 500

    customer_summary = f"{profile["first_name"]} {profile["last_name"]} (NDIS#: {ndis_id})"
    logger.info(f"Found customer details: {customer_summary}")

    msg_body = f"Please review the updated customer risk profile for: {customer_summary}.\n"
    custom_message = profile.get("custom_message")
    if custom_message:
        msg_body = msg_body + f"\n{custom_message}\n\n"
    msg_body = msg_body + f"Synchronise the latest changes using this link:\n"
    msg_body = msg_body + f"\thttp://127.0.0.1:5000/profiles/{ndis_id}/sync"
    msg_body = msg_body + f"\nThen review the changes at this link: \n"
    msg_body = msg_body + f"\thttp://127.0.0.1:5000/profiles/{ndis_id}"

    msg_subject = f"Risk Profile Updated for {customer_summary}"
    email = Message(msg_subject, sender="noreply@newhorizons.org.au")
    email.recipients = payload["recipients"]
    email.body = msg_body

    mail.send(email)
    return jsonify("Email sent"), 202


@app.errorhandler(404)
def _page_not_found(e):
    return render_template('404.html', error_val=e), 404


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
        y = yaml.load(f)
        return y["Surveys"], y["Scales"]


def get_local_profile_list():
    profile_dir = os.path.join(WORKING_DIR, "profiles")
    file_filter = os.path.join(profile_dir, "*.yaml")
    profile_glob = glob.glob(file_filter)
    logger.debug(f"glob: {profile_glob}")
    files = [os.path.splitext(os.path.basename(x))[0] for x in profile_glob]
    response = []
    for file in profile_glob:
        with open(file, 'r') as f:
            profile = yaml.load(f)
            response.append(
                {
                    "first_name": profile["first_name"],
                    "last_name": profile["last_name"],
                    "last_updated": profile["last_updated"],
                    "ndis_id": profile["ndis_id"],
                })
    return response


def load_profile(ndis_id):
    filename = f"{ndis_id}.yaml"
    filepath = os.path.join(WORKING_DIR, "profiles", filename)  # TODO(divv) This should dynamically check both local and remote paths
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


def merge_profile(ndis_id):
    filename = f"{ndis_id}.yaml"
    local_filepath = os.path.join(WORKING_DIR, "profiles", filename)
    remote_filepath = os.path.join(WORKING_DIR, "remote", filename)     # TODO(divv) This path needs to be configurable

    with open(local_filepath, 'r') as f:
        local_yaml = f.read()
    logger.debug(f"**** LOCAL YAML ****:\n{local_yaml}")

    if os.path.isfile(remote_filepath):
        logger.info("Synchronising profiles")

        with open(remote_filepath, 'r') as f:
            remote_yaml = f.read()
        logger.debug(f"**** REMOTE YAML ****:\n{remote_yaml}")

        merged_hypc = hiyapyco.load([remote_yaml, local_yaml],
                                    method=hiyapyco.METHOD_MERGE,
                                    loglevel=logging.INFO,
                                    mergelists=False)
        merged_yaml = hiyapyco.dump(merged_hypc)
        logger.debug(f"**** MERGED YAML ****:\n{merged_yaml}")

        merged_dict = yaml.load(merged_yaml)
        for survey, risks in merged_dict["surveys"].items():
            logger.debug(f"Survey: {survey}")
            logger.debug(f"Risks: {risks}")
            for risk, observations in risks.items():
                logger.debug(f"Risk: {risk}")
                logger.debug(f"observations: {observations}")
                deduped_observations = dedupe_list_of_dicts(observations)
                logger.debug(f"Deduped observations: {deduped_observations}")
                merged_dict["surveys"][survey][risk] = deduped_observations

        logger.debug(f"Overwriting local and remote profiles for {ndis_id}")
        with open(local_filepath, 'w') as f:
            f.write(yaml.dump(merged_dict))
        with open(remote_filepath, 'w') as f:
            f.write(yaml.dump(merged_dict))

        # cleanup
        del(merged_dict)
        del(merged_hypc)
        del(local_yaml)
        del(remote_yaml)
        del(merged_yaml)
        logger.debug("deleted local, remote, merged dictionaries")


def dedupe_list_of_dicts(l):
    seen = set()
    new_l = []
    for d in l:
        t = tuple(d.items())
        if t not in seen:
            seen.add(t)
            new_l.append(d)
    return new_l


# init common stuff
with app.app_context():
    WORKING_DIR = get_working_dir()
    SURVEYS, SCALES = read_survey_config()
    logger.info("READY: Webserver loaded.")
