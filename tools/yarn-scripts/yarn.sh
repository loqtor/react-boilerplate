#!/bin/bash

echo 'running `yarn install`';

rm -rf node_modules/ tmp/
yarn -v
yarn install
yarn start
