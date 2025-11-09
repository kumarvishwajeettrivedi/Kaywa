#!/bin/bash
set -e

echo "Deployment started ..."
pwd


# Load nvm - CRITICAL FOR ROOT USER
echo "LOADING NVM"
export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "ASSIGNING PATH"
# Load Node.js version (replace v20.18.1 with your actual version if different)
export PATH="/root/.nvm/versions/node/v20.18.1/bin:$PATH"

echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"


# Pull the latest version of the app
git pull origin master
echo "New changes copied to server !"

echo "Installing Dependencies..."
npm install --yes

echo "building the project"
npm run build


echo "PM2 Reload"
pm2 reload kaiwa

echo "Deployment Finished!" 