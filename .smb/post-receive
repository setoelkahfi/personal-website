#!/bin/bash

# The bare git directory
GIT_DIR=/home/deploy/setoelkahfi.com
# The app directory
WORK_TREE=/home/deploy/apps/ssr/setoelkahfi.com

# Put environment variabels here
. ~/.profile

while read oldrev newrev ref
do
    if [[ $ref =~ .*/main$ ]];
    then
        echo "🚀 Main ref received. Deploying main branch to production..."
        mkdir -p $WORK_TREE
        git --work-tree=$WORK_TREE --git-dir=$GIT_DIR checkout -f main

        # start deploy tasks
        cd $WORK_TREE
        # Configure nvm
        nvm install $(cat .nvmrc)
        nvm use

        # Install dependencies and build the app
        npm install
        npm run build

        # Check if SETOELKAHFI_COM_PORT defined in the environment variable.
        # If not, cancel the deployment.
        if [ -z ${SETOELKAHFI_COM_PORT+x} ]; then
            echo "❌ Deployment failed. SETOELKAHFI_COM_PORT is not defined."
            exit 1
        fi

        # Check if SETOELKAHFI_COM_PORT is a number.
        # If not, cancel the deployment.
        if ! [[ "$SETOELKAHFI_COM_PORT" =~ ^[0-9]+$ ]]; then
            echo "❌ Deployment failed. SETOELKAHFI_COM_PORT is not a number."
            exit 1
        fi

        # Kill existing SETOELKAHFI_COM_PORT process and start the server
        echo "🚀 Killing existing setoelkahfi.com process..."
        kill $(lsof -t -i:$SETOELKAHFI_COM_PORT)
        echo "🚀 Starting server..."
        npm run start > /dev/null 2>&1 &

        echo "✅ Deployment complete."
    else
        echo "Ref $ref successfully received.  Doing nothing: only the main branch may be deployed on this server."
    fi
done
