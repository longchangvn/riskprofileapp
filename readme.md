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
flask run -h localhost
```
After launching the Flask webserver, connect <http://localhost:5000>


## Endpoints
### /surveys
Returns a list of available surveys.
e.g. <http://localhost:5000/surveys>

Status Code: ```200 OK```
<details>
  <summary>Sample Response:</summary>

  ```python
  ["Qualification","Proposed","PhysicalSafety","MedicalHistory","SubstanceUse","Other"]
  ```
</details>

### /surveys/<survey_name>
Returns the set of questions within a given survey.
e.g. <http://localhost:5000/surveys/Qualification>

Status Code: ```200 OK```
<details>
  <summary>Sample Response:</summary>

  ```python
  {
    "scales": [
      "NoRisk",
      "Low",
      "Med",
      "High"
    ],
    "survey_name": "Qualification",
    "survey_questions": {
      "AccessingServices": "Risk due to assessing services",
      "Environment": "Risk associated with environment",
      "LackOfValue": "Risks due to lack of valued role",
      "MentalHealth": "Risk associated with mental health",
      "Substance": "Drug and alcohol risks",
      "Trauma": "Risk due to trauma/torture",
      "Violence": "Risk of violence/aggression"
    }
  }
  ```
</details>

### /profiles
A list of profiles found on the local disk (/path/to/project/data/profiles).
e.g. <http://localhost:5000/profiles>

Status Code: ```200 OK```

<details>
  <summary>Sample Response:</summary>

  ```python
  ["123456","984161"]
  ```
</details>

### /profiles/<ndis_id> GET
Returns the contents of the selected profile on the local disk (/path/to/project/data/profiles/${ndis_id}.yaml)
e.g. <http://localhost:5000/profiles/123456>

Status Code: ```200 OK```

<details>
  <summary>Sample Response:</summary>

  ```python
  {  
    "first_name":"Bob",
    "last_name": "Jones",
    "ndis_id":123456,
    "last_updated": "2018-12-06 17:03"
    "surveys":{  
      "Qualification": {
        "MentalHealth": [
          {
            "Notes": "None",
            "Date": "2018-12-04",
            "Scale": "Low"
          }
        ],
        "AccessingServices": [
          {
            "Notes": "None",
            "Date": "2018-12-04",
            "Scale": "Low"
          }
        ],
        "Trauma": [
          {
            "Notes": "None",
            "Date": "2018-12-04",
            "Scale": "Low"
          }
        ],
        "Violence": [
          {
            "Notes": "None",
            "Date": "2018-12-04",
            "Scale": "Low"
          }
        ],
        "Environment": [
          {
            "Notes": "None",
            "Date": "2018-12-04",
            "Scale": "Low"
          }
        ],
        "Substance": [
          {
            "Notes": "None",
            "Date": "2018-12-04",
            "Scale": "Low"
          }
        ],
        "LackOfValue": [
          {
            "Notes": "None",
            "Date": "2018-12-04",
            "Scale": "Low"
          }
        ]
      },
      "PhysicalSafety":{  
        "PhysicalRisk1":[  
          {  
            "Notes": "Customer lives in a bouncy castle",
            "Date": "2018-12-04",
            "Scale": "Low"
          },
          {  
            "Notes": "Bouncy castle deflated.\nCustomer still on soft grass",
            "Date": "2018-12-05",
            "Scale": "Med"
          }
        ],
        "PhysicalRisk2":[  
          {  
            "Date": "2018-12-04",
            "Scale": "Med"
          }
        ]
      },
      "SubstanceUse":{  
        "SubstanceRisk2":[  
          {  
            "Notes": "Disoriented.",
            "Date": "2018-12-05",
            "Scale": "High"
          }
        ]
      }
    }
  }
  ```
</details>

### /profiles/<ndis_id> PUT
Replaces the existing profile, with an updated one
e.g. <http://localhost:5000/profiles/123456 PUT>

Status Code: ```201 CREATED```

<details>
  <summary>Sample Payload:</summary>

  ```python
  {  
    "first_name":"Bob",
    "last_name": "Jones",
    "ndis_id":123456,
    "last_updated": "2018-12-06 17:10"
    "surveys":{  
      "Qualification": {
        "MentalHealth": [
          {
            "Notes": "None",
            "Date": "2018-12-04",
            "Scale": "Low"
          }
        ],
        "AccessingServices": [
          {
            "Notes": "None",
            "Date": "2018-12-04",
            "Scale": "Low"
          }
        ],
        "Trauma": [
          {
            "Notes": "None",
            "Date": "2018-12-04",
            "Scale": "Low"
          }
        ],
        "Violence": [
          {
            "Notes": "None",
            "Date": "2018-12-04",
            "Scale": "Low"
          }
        ],
        "Environment": [
          {
            "Notes": "None",
            "Date": "2018-12-04",
            "Scale": "Low"
          }
        ],
        "Substance": [
          {
            "Notes": "None",
            "Date": "2018-12-04",
            "Scale": "Low"
          }
        ],
        "LackOfValue": [
          {
            "Notes": "None",
            "Date": "2018-12-04",
            "Scale": "Low"
          }
        ]
      },
      "PhysicalSafety":{  
        "PhysicalRisk1":[  
          {  
            "Notes": "Customer lives in a bouncy castle",
            "Date": "2018-12-04",
            "Scale": "Low"
          },
          {  
            "Notes": "Bouncy castle deflated.\nCustomer still on soft grass",
            "Date": "2018-12-05",
            "Scale": "Med"
          }
        ],
        "PhysicalRisk2":[  
          {  
            "Date": "2018-12-04",
            "Scale": "Med"
          }
        ]
      },
      "SubstanceUse":{  
        "SubstanceRisk2":[  
          {  
            "Notes": "Disoriented.",
            "Date": "2018-12-05",
            "Scale": "High"
          }
        ]
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
  }
  ```
</details>


### /profiles/<ndis_id>/sync POST
Synchronises the local and remote files
e.g. <http://localhost:5000/profiles/123456/sync POST>

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

Status Code: ```200 OK```


### /profiles/<ndis_id>/notify POST
Send a payload to this endpoint to trigger email notification
e.g. e.g. <http://localhost:5000/notify POST>

Status Code: ```202 ACCEPTED```

<details>
  <summary>Sample Payload:</summary>

  ```python
  {
    "ndis_id": 123456,
    "recipients": [
        "email@example.com",
        "emai2@example.com"
      ],
    "custom_message": "Hi, I've just updated RiskX, please be aware"
  }
  ```
</details>
