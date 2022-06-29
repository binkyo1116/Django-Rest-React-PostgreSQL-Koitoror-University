upstream django {
	server backend-django-app:8000;
}

server {
    listen ${LISTEN_PORT};

    location /static {
        alias /vol/static;
    }

    location / {
        uwsgi_pass              ${APP_HOST}:${APP_PORT};
        include                 /etc/nginx/uwsgi_params;
        client_max_body_size    10M;

        # proxy_set_header X-Real-IP $remote_addr;
        # proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        # proxy_set_header Host $http_host;
        # proxy_set_header X-NginX-Proxy true;

        proxy_pass http://django;
        # proxy_pass http://frontend-react-app:3000;
        # proxy_redirect off;

    }
}
