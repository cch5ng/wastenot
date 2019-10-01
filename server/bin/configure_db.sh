#!/bin/bash

echo 'Configuring waste_not_db'

dropdb -U waste_not_user waste_not_db
createdb -U waste_not_user waste_not_db

psql -U waste_not_user waste_not_db < ./bin/sql/wastenot_user.sql
psql -U waste_not_user waste_not_db < ./bin/sql/list.sql
psql -U waste_not_user waste_not_db < ./bin/sql/list_item.sql
psql -U waste_not_user waste_not_db < ./bin/sql/expiration.sql

echo 'waste_not_db configured'