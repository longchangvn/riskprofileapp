FROM python:3.7.0-alpine3.7

EXPOSE 5000

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app
WORKDIR /app/backend/src

ENV FLASK_APP=./main.py

CMD ["flask", "run", "--host=0.0.0.0"]
