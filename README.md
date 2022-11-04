# swppfall2022-team15

## NotiManager

---

[![Build Status](https://travis-ci.com/swsnu/swppfall2022-team15.svg?branch=main)](https://travis-ci.com/swsnu/swppfall2022-team15)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swppfall2022-team15&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swppfall2022-team15)

### How to run backend

```shell
cd backend
pip install pipenv

pipenv install
pipenv shell

(python manage.py migrate)
python manage.py runserver:8000
```

### How to run frontend

```shell
cd frontend
yarn install
yarn start
```
