FROM python:3.9-alpine

RUN apk update \
    && apk add \
    build-base \
    gcc  \
    pcre-dev \
    python3-dev \
    zlib-dev \
    musl-dev \
    mariadb-dev \
    libc-dev \
    linux-headers
WORKDIR /app

COPY Pipfile /app
COPY Pipfile.lock /app

RUN pip install pipenv && \
    pipenv install --deploy --system

COPY . /app
CMD ["uwsgi", "--http", ":8000", "--ini", "uwsgi.ini"]
