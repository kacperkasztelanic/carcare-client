#!/bin/bash

rm -rf build
npm run webpack:prod
./version.sh > build/www/version.js
cd build
zip -r client.zip www
