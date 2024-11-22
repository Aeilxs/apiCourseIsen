#!bin/bash

curl -X POST "http://localhost:8080/realms/myrealm/protocol/openid-connect/token" \
     -H "Content-Type: application/x-www-form-urlencoded"                         \
     -d "client_id=myclient"                                                      \
     -d "grant_type=password"                                                     \
     -d "username=user"                                                           \
     -d "password=user"
