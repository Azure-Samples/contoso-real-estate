#!/usr/bin/env bash

set -euxo pipefail

ipAddress=https://$(docker inspect cosmos-contoso-real-estate -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'):8081

attempts=0
maxAttempts=10
# Try to get the emulator cert in a loop
until (sudo curl -ksf "${ipAddress}/_explorer/emulator.pem" -o '/usr/local/share/ca-certificates/emulator.crt') || ($attempts -eq $maxAttempts); do
  echo "Downloading cert from $ipAddress"
  sleep 1
  attempts=$((attempts+1))
done

if [ $attempts -eq $maxAttempts ]; then
  echo Failed to retrive the CosmosDB certificate. Ensure the container is running and then re-execute this script
else
  sudo update-ca-certificates

  echo "CosmosDB=AccountEndpoint=$ipAddress/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=="
fi

