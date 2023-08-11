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
        nvm install $(echo .nvmrc)
        nvm use
        npm install
        npm run build

        echo "🚀 Killing existing setoelkahfi.com process..."
        kill $(lsof -t -i:3002)
        echo "🚀 Starting server..."
        
        npm run server:start > /dev/null 2>&1 &

        echo "✅ Deployment complete."
    else
        echo "Ref $ref successfully received.  Doing nothing: only the main branch may be deployed on this server."
    fi
done
