#!/bin/bash

DB_USER=$(grep PGUSER .env | xargs)
DB=$(grep PGDATABASE .env | xargs)
IFS='=' read -ra DB_USER <<< "$DB_USER"
DB_USER=${DB_USER[1]}
IFS='=' read -ra DB <<< "$DB"
DB=${DB[1]}

echo 'Configuring db'

dropdb -U ${DB_USER} ${DB}
createdb -U ${DB_USER} ${DB}

psql -U ${DB_USER} ${DB} < ./bin/sql/wastenot_user.sql
psql -U ${DB_USER} ${DB} < ./bin/sql/list.sql
psql -U ${DB_USER} ${DB} < ./bin/sql/section.sql
psql -U ${DB_USER} ${DB} < ./bin/sql/list_item_map.sql
psql -U ${DB_USER} ${DB} < ./bin/sql/list_item.sql
psql -U ${DB_USER} ${DB} < ./bin/sql/expiration.sql
psql -U ${DB_USER} ${DB} < ./bin/sql/setting.sql

echo 'db configured'