# Unboxd Riskeasy
A prototype data collection tool for risk profile creation

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)

## Installation
Install Python 3.7 and the pip dependencies
```sh
pip install -r requirements.txt
```

## Usage
Launch the Flask webserver..
```sh
cd /path/to/project/backend
export $FLASK_APP=./src/main.py
flask run -h 0.0.0.0
```
After launching the Flask webserver, connect <http://127.0.0.1:5000>


## Endpoints
### /surveys
Returns a list of available surveys.

e.g. <http://127.0.0.1:5000/surveys>

```python
["PhysicalSafety","MedicalHistory","SubstanceUse","Other"]
```

### /surveys/<survey_name>
Returns the set of questions within a given survey.

e.g. <http://127.0.0.1:5000/surveys/MedicalHistory>
```python
{"MedicalRisk1":["Low","Med","High"],"MedicalRisk2":[1,2,3,4,5],"MedicalRisk3":[true,false]}
```

### /profiles
A list of profiles found on the local disk (/path/to/project/data/profiles).

e.g. <http://127.0.0.1:5000/profiles>
```
["123456","984161"]
```

### /profiles/<ndis_id>
Returns the contents of the selected profile on the local disk (/path/to/project/data/profiles/${ndis_id}.yaml)

e.g. <http://127.0.0.1:5000/profiles/123456>

```python
{"name":"Bob Jones","ndis_id":123456,"surveys":{"PhysicalSafety":{"PhysicalRisk1":[{"Comments":"Customer lives in a bouncy castle\n","Date":"Tue, 04 Dec 2018 00:00:00 GMT","Level":"Low"},{"Comments":"Bouncy castle deflated.\nCustomer still on soft grass\n","Date":"Wed, 05 Dec 2018 00:00:00 GMT","Level":"Med"}],"PhysicalRisk2":[{"Date":"Tue, 04 Dec 2018 00:00:00 GMT","Level":3}]},"SubstanceUse":{"SubstanceRisk2":[{"Comments":"Disorientated. Lighter found on ground.\nPossibly the reason why bouncy castle was damaged and deflated\n","Date":"Wed, 05 Dec 2018 00:00:00 GMT","Level":4}]}}}
```
