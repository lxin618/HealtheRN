#!/bin/sh

if [ -z $1 ]; then
  echo "You must specify an environment!"
  exit 1
fi

ENV_NAME=$1

ENV_FILE="env/env.$ENV_NAME.json"

if [ ! -f $ENV_FILE ]; then
  echo "Environment file does not exist for '$ENV_NAME'"
  exit 1
fi

echo "Setting environment to '$ENV_NAME'"

cp $ENV_FILE env/env.json
