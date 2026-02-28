#!/bin/sh

export MYSQL_PASSWORD=$$(cat /run/secrets/mysql_password)

exec node server.js
