#!/bin/sh

# Replace config variables
# sed -i "s|DUMMY_API_URL|$API_URL|g" /var/www/*

# Start Nginx
nginx -g "daemon off;"
