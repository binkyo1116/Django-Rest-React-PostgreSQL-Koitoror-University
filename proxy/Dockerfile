FROM nginxinc/nginx-unprivileged:1-alpine
# FROM nginx:1.19.0-alpine

LABEL maintainer="koitororuniversity.ml"

COPY ./default.conf.tpl /etc/nginx/default.conf.tpl
# COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./uwsgi_params /etc/nginx/uwsgi_params
COPY ./run.sh /run.sh

ENV LISTEN_PORT=8000
ENV APP_HOST=backend-django-app
ENV APP_PORT=9000

USER root

RUN mkdir -p /vol/static && \
    chmod 755 /vol/static && \
    touch /etc/nginx/conf.d/default.conf && \
    chown nginx:nginx /etc/nginx/conf.d/default.conf && \
    chmod +x /run.sh

VOLUME /vol/static

USER nginx

CMD ["/run.sh"]
# CMD ["run.sh"]
# ENTRYPOINT ["sh", "./run.sh"]
