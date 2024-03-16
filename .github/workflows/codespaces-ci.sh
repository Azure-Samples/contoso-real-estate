#!/bin/bash
set -e

GITHUB_REPOSITORY="Azure-Samples/contoso-real-estate"
BRANCH="codespaces-ci"
CODESPACE_NAME="nightly-build-$(date +%s)"
CODESPACE_ID=""
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# login to GitHub CLI
echo "Login to GitHub CLI..."
echo ${{ $GITHUB_TOKEN }} | gh auth login --with-token

echo "Check auth status..."
gh auth status

# create a codespace
echo "Create a codespace "$CODESPACE_NAME" for $GITHUB_REPOSITORY on branch $BRANCH..."
gh codespace create \
    --repo $GITHUB_REPOSITORY \
    --branch $BRANCH \
    --display-name $CODESPACE_NAME \
    --retention-period "1h" \
    --idle-timeout "1h" \
    --machine "largePremiumLinux" \
    --status \
    --default-permissions

CODESPACE_ID=$(gh codespace list -R $GITHUB_REPOSITORY --jq ".[] | select(.displayName == \"$CODESPACE_NAME\")" --json displayName,name) | jq -r '.name'
echo "Codespace created and started: $CODESPACE_ID"

# connect to the codespace and start the app
echo "Running all services..."
gh codespace ssh -c $CODESPACE_ID "npm start --prefix /workspaces/contoso-real-estate" &

# Wait for the app to start
echo "Waiting 30s for all ports to be fowarded..."
sleep 30

# check all services are running
nb_services_down=0
max_retries=5
while [ $nb_services_down > 0 ]; do

    echo -ne "Fetching registered services..."
    services=$(gh cs ports -c $CODESPACE_ID --json label,browseUrl | jq -r '.[] | select(.label != "") | .browseUrl')
    nb_services=$(echo "$services" | awk 'END { print NR }')
    echo " Found $nb_services"

    nb_services_down=0
    echo "---------------------------------------------------------------------------------------------------------" 
    for service in $services; do
        echo -ne "Inspecting: $service ... "
        status=$(curl -H "X-Github-Token: $GITHUB_TOKEN" -s -o /dev/null -w  "%{http_code}" $service)

        if [ $status == 200 ] || [ $status == 404 ]; then
            echo -e "${GREEN}$status OK${NC}"
        else
            echo -e "${RED}$status ERROR${NC}"
            ((nb_services_down++))
        fi
    done

    if [ $nb_services_down == 0 ]; then
        echo "All services are running!"
        break
    fi

    if [ $max_retries == 0 ]; then
        echo "Max retries reached, exiting..."
        break
    fi

    echo "---------------------------------------------------------------------------------------------------------"
    echo "Found $nb_services_down services down..."
    echo "Wait 10s before retrying... (retries left: $max_retries)"
    sleep 10
    ((max_retries--))
done


# print all codespaces logs
echo "Fetching codespace logs before exiting..."
gh codespace logs -c $CODESPACE_ID 

# stop and delete the codespace
echo "Stopping and deleting codespace $CODESPACE_ID..."
gh codespace stop -R $GITHUB_REPOSITORY
gh codespace delete -R $GITHUB_REPOSITORY

if [ $nb_services_down > 0 ]; then
    echo -e "${RED}ERROR: Some services are still down, exiting with error.${NC}"
    exit 1
else
    echo -e "${GREEN}OK: All services are running, exiting with success.${NC}"
    exit 0
fi