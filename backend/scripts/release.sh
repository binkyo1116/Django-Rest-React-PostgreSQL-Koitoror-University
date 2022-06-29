# !/bin/sh

set -e

ls -la /app/frontend/staticfiles/
ls -la /app/frontend/build

whoami

echo "Running Release Tasks"

# python backend/manage.py wait_for_db
# python backend/manage.py collectstatic --noinput

echo "Running Database migrations and migrating the new changes"
# python backend/manage.py makemigrations account admin assignment auth authtoken contenttypes sessions sites socialaccount profiles
python backend/manage.py makemigrations account admin assignment auth authtoken base contenttypes core profiles sessions sites socialaccount token_blacklist
# python backend/manage.py makemigrations

python backend/manage.py migrate --plan
python backend/manage.py migrate --noinput

echo "Running Server"
# python backend/manage.py runserver 0.0.0.0:8000
# uwsgi --socket :8000 --workers 4 --master --enable-threads --module app.wsgi.dev
# uwsgi --socket :8000 --workers 4 --master --enable-threads --module app.wsgi.prod
# gunicorn  --chdir backend app.wsgi.prod
# gunicorn backend.app.wsgi.prod --bind 0.0.0.0:8000

echo "Done.."