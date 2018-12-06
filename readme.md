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

### /profiles/<ndis_id> GET
Returns the contents of the selected profile on the local disk (/path/to/project/data/profiles/${ndis_id}.yaml)

e.g. <http://127.0.0.1:5000/profiles/123456>

```python
{  
  "name":"Bob Jones",
  "ndis_id":123456,
  "surveys":{  
    "PhysicalSafety":{  
      "PhysicalRisk1":[  
        {  
          "Comments":"Customer lives in a bouncy castle\n",
          "Date":"Tue, 04 Dec 2018 00:00:00 GMT",
          "Level":"Low"
        },
        {  
          "Comments":"Bouncy castle deflated.\nCustomer still on soft grass\n",
          "Date":"Wed, 05 Dec 2018 00:00:00 GMT",
          "Level":"Med"
        }
      ],
      "PhysicalRisk2":[  
        {  
          "Date":"Tue, 04 Dec 2018 00:00:00 GMT",
          "Level":3
        }
      ]
    },
    "SubstanceUse":{  
      "SubstanceRisk2":[  
        {  
          "Comments":"Disorientated. Lighter found on ground.\nPossibly the reason why bouncy castle was damaged and deflated\n",
          "Date":"Wed, 05 Dec 2018 00:00:00 GMT",
          "Level":4
        }
      ]
    }
  }
}
```

### /profiles/<ndis_id> PUT
Replaces the existing profile, with an updated one

e.g. <http://127.0.0.1:5000/profiles/123456 PUT>

```python
{  
  "ndis_id": 123456,
  "name":"Bob Jones",
  "surveys":{  
    "PhysicalSafety":{  
      "PhysicalRisk1":[  
        {  
          "Comments":"Customer lives in a bouncy castle",
          "Date":"Tue, 04 Dec 2018 00:00:00 GMT",
          "Level":"Low"
        },
        {  
          "Comments":"Bouncy castle deflated.\nCustomer still on soft grass",
          "Date":"Wed, 05 Dec 2018 00:00:00 GMT",
          "Level":"Med"
        }
      ],
      "PhysicalRisk2":[  
        {  
          "Date":"Tue, 04 Dec 2018 00:00:00 GMT",
          "Level":3
        }
      ]
    },
    "SubstanceUse":{  
      "SubstanceRisk2":[  
        {  
          "Comments":"Disorientated. Lighter found on ground.\nPossibly the reason why bouncy castle was damaged and deflated",
          "Date":"Wed, 05 Dec 2018 00:00:00 GMT",
          "Level":4
        }
      ]
    }
  },
    "MedicalHistory": {
      "MedicalRisk2": [
        {
          "Date": "2018-12-09",
          "Level": "High",
          "Comments": "Even worse influenza."
        }
      ]
    }
}
```



### /profiles/<ndis_id>/sync POST
Synchronises the local and remote files

e.g. <http://127.0.0.1:5000/profiles/123456/sync POST>


The two files will be merged together, which may result in duplicates.
The results are then deduped, but with minimal logic.

Please note the following cases and expected behaviour regarding risk observations

* Entries that exist locally, will be copied remotely
* Entries that exist remotely, will be copied locally
* Entries for the same risk, with the same date, but different Levels or Comments will remain duplicated

| Case | Local File | Remote File | Expected Output |
|------|------------|-------------|-----------------|
 Local change | Date: 2018-01-01, Level: Medium, Comments: blah | | Date: 2018-01-01, Level: Medium, Comments: blah
 Remote change | | Date: 2018-03-20, Level: High, Comments: No comment | Date: 2018-03-20, Level: High, Comments: No comment
 Conflicting dates | Date: 2018-05-17, Level: High, Comments: Important! | Date: 2018-05-19, Level: Low, Comments: Not important | Date: 2018-05-17, Level: High, Comments: Important!, Date: 2018-05-19, Level: Low, Comments: Not important
