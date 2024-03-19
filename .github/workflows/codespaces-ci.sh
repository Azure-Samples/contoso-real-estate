#!/bin/bash
set -e

GITHUB_REPOSITORY="Azure-Samples/contoso-real-estate"
BRANCH="codespaces-ci"
CODESPACE_NAME="ci-nightly-build-$(date +%s)"
CODESPACE_ID=""
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# login to GitHub CLI
function gh_login() {
    echo "Loging in with GitHub CLI as admin..."
    echo $X_GITHUB_TOKEN | gh auth login --with-token 

    echo "Checking auth status..."
    gh auth status
}

# create a codespace
function gh_create_codespace() {
    echo "Creating a codespace $CODESPACE_NAME for $GITHUB_REPOSITORY on branch $BRANCH (w/ ssh)..."
    gh codespace create \
        --repo $GITHUB_REPOSITORY \
        --branch $BRANCH \
        --display-name $CODESPACE_NAME \
        --retention-period "15min" \
        --idle-timeout "5min" \
        --machine "largePremiumLinux" \
        --status \
        --default-permissions
}
function api_create_codespace() {
    echo "Creating a codespace $CODESPACE_NAME for $GITHUB_REPOSITORY on branch $BRANCH (w/ api)..."
    CODESPACE_ID=$(gh api \
        /repos/$GITHUB_REPOSITORY/codespaces \
        -X POST \
        -H 'Accept: application/vnd.github+json' \
        -H "X-GitHub-Api-Version: 2022-11-28" \
        -f owner="$GITHUB_REPOSITORY" \
        -f repo="$GITHUB_REPOSITORY" \
        -f ref="$BRANCH" \
        -f display_name="$CODESPACE_NAME" \
        -f retentionPeriod='15min' \
        -f idleTimeout='5min' \
        -f machineType=l'argePremiumLinux' \
        -f status='true' \
        -f defaultPermissions='true' \
        -q '.name')
    echo "Codespace created and started: $CODESPACE_ID"
}

# fetch the codespace ID
function gh_fetch_codespace_id() {
    CODESPACE_ID=$(gh codespace list -R $GITHUB_REPOSITORY --jq ".[] | select(.displayName == \"$CODESPACE_NAME\")" --json displayName,name | jq -r '.name')
    echo "Codespace created and started: $CODESPACE_ID"
}

# connect to the codespace and start the services
function gh_codespace_start_services() {
    echo "Running all services (over SSH)..."
    # (gh codespace ssh -c $CODESPACE_ID "npm start --prefix /workspaces/contoso-real-estate") &
    (gh codespace ssh -c $CODESPACE_ID "env")
}

# check all services are running
function gh_codespace_check_services_status() {
    nb_services_down=0
    max_retries=5
    while [ $nb_services_down > 0 ]; do

        echo -ne "Fetching registered services..."
        services=$(gh codespace ports -c $CODESPACE_ID --json label,browseUrl | jq -r '.[] | select(.label != "") | .browseUrl')
        nb_services=$(echo "$services" | awk 'END { print NR }')
        echo " Found $nb_services"

        if [ -z "$services" ]; then
            echo "No services found, exiting..."
            break
        fi

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
}

# Wait for the services to start
function wait_for_services() {
    echo -ne "Waiting 30s for all services to start"
    for i in {1..30}; do
        echo -ne "."
        sleep 1
    done
    echo ""
}

# stop and delete the codespace
function gh_codespace_stop_and_delete() {
    echo "Stopping and deleting codespace $CODESPACE_ID..."
    gh codespace stop -c $CODESPACE_ID
    gh codespace delete -c $CODESPACE_ID -f
}

function print_report_and_exit() {
    if [ $nb_services == 0 ]; then
        echo -e "${RED}ERROR: No services found. Inspect the logs above for more details.${NC}"
        exit 1
    elif [ $nb_services_down > 0 ]; then
        echo -e "${RED}ERROR: $nb_services_down services are still down. Inspect the logs above for more details.${NC}"
        exit 1
    else
        echo -e "${GREEN}OK: All services are running, exiting with success.${NC}"
        exit 0
    fi
}

############################################
gh_login;
# gh_create_codespace;
api_create_codespace;
# gh_fetch_codespace_id;
wait_for_services;
# gh_codespace_start_services;
wait_for_services;
gh_codespace_check_services_status;
gh_codespace_stop_and_delete;
print_report_and_exit;