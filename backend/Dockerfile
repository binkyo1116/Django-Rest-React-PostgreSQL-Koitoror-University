FROM python:3.9-alpine3.13
LABEL maintainer="koitororuniversity.ml"

ENV PYTHONUNBUFFERED 1
ENV CRYPTOGRAPHY_DONT_BUILD_RUST=1

COPY ./requirements.txt /requirements.txt
COPY ./backend /backend
COPY ./backend/scripts /scripts
COPY ./frontend/build /frontend/build

WORKDIR /
EXPOSE 8000

RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    # apk add --update --no-cache postgresql-client && \
    # apk add --update --no-cache --virtual .tmp-deps \
    apk add --update postgresql-client && \
    apk add --update libffi-dev && \
    apk add --update --virtual .tmp-deps \
        build-base postgresql-dev musl-dev libffi-dev linux-headers && \
    /py/bin/pip cache purge && \
    /py/bin/pip install -r /requirements.txt && \
    # /py/bin/pip install --no-cache-dir -r /requirements.txt && \
    apk del .tmp-deps && \
    adduser --disabled-password --no-create-home app && \
    mkdir -p /vol/web/static && \
    mkdir -p /vol/web/media && \
    chown -R app:app /vol && \
    chmod -R 755 /vol && \
    chmod -R +x /scripts

ENV PATH="/scripts:/py/bin:$PATH"

USER app
# USER root

CMD ["release.sh"]

# ENTRYPOINT ["sh", "./app.sh"]
# ENTRYPOINT ["sh", "./data.sh"]
