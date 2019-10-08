#!/bin/bash

DB_USER=$(grep DB_USER .env | xargs)
IFS='=' read -ra DB_USER <<< "$DB_USER"
DB_USER=${DB_USER[1]}

echo 'Configuring waste_not_db'

dropdb -U ${DB_USER} waste_not_db
createdb -U ${DB_USER} waste_not_db

psql -U ${DB_USER} waste_not_db < ./bin/sql/wastenot_user.sql
psql -U ${DB_USER} waste_not_db < ./bin/sql/list.sql
psql -U ${DB_USER} waste_not_db < ./bin/sql/list_item.sql
psql -U ${DB_USER} waste_not_db < ./bin/sql/expiration.sql

echo 'waste_not_db configured'