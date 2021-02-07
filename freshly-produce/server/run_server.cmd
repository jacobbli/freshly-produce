@echo off

set PGUSER=postgres
set PGPASSWORD=postgres

createdb --host=127.0.0.1 --port=5432 freshly_produce
psql --host=127.0.0.1 --port=5432 --file=init_db.sql --dbname=freshly_produce

set DEBUG=myapp:* & npm start