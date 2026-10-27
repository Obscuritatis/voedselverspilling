#!/bin/sh
# Zet één nieuw versienummer in app.js, index.html, sw.js en version.json.
# Gebruik: ./nieuwe-versie.sh 20261027m   (na elke wijziging aan de app, vóór de commit)
set -e
v="$1"; [ -n "$v" ] || { echo "Gebruik: $0 <versie>"; exit 1; }
cd "$(dirname "$0")"
sed -i -E "s/const APP_VERSIE = \"[^\"]*\"/const APP_VERSIE = \"$v\"/" app.js
sed -i -E "s/\?v=[0-9a-z]+\"/?v=$v\"/g" index.html
sed -i -E "s/const CACHE = \"vv-[^\"]*\"/const CACHE = \"vv-$v\"/" sw.js
printf '{ "versie": "%s" }\n' "$v" > version.json
grep -h -o -E "APP_VERSIE = \"[^\"]*\"|\?v=[0-9a-z]+|vv-[0-9a-z]+|\"versie\": \"[^\"]*\"" app.js index.html sw.js version.json
