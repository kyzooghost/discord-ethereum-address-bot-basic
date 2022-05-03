#!/bin/bash
. env.sh

curl -X POST \
-H 'Content-Type: application/json' \
-H "Authorization: Bot $TOKEN" \
-d '{"name":"connect","description":"Connect your Ethereum address","options":[{"name":"ethereum-address","description":"Your Ethereum address","type":3,"required":true}]}' \
"https://discord.com/api/v8/applications/$CLIENT_ID/commands"

curl -X POST \
-H 'Content-Type: application/json' \
-H "Authorization: Bot $TOKEN" \
-d '{"name":"delete","description":"Delete your connected Ethereum address"}' \
"https://discord.com/api/v8/applications/$CLIENT_ID/commands"

curl -X POST \
-H 'Content-Type: application/json' \
-H "Authorization: Bot $TOKEN" \
-d '{"name":"view","description":"View your Ethereum address"}' \
"https://discord.com/api/v8/applications/$CLIENT_ID/commands"