#!/bin/bash

GITHUB_REPOSITORY="Azure-Samples/contoso-real-estate"
BRANCH="codespaces-ci"
APP_PORT="4280"

# gh auth login --with-token $GITHUB_TOKEN
gh codespace create \
    --repo $GITHUB_REPOSITORY \
    --branch $BRANCH \
    --retention-period "1h" \
    --display-name "Contoso Real Estate Nightly" \
    --idle-timeout "30m" \
    --machine "largePremiumLinux" \
    --status \
    --default-permissions

# gh codespace stop -R $GITHUB_REPOSITORY
# gh codespace delete -R $GITHUB_REPOSITORY
