
// Add secrets to key vaults, to avoid
// leaked secrets in Azure deployment log
// leaked secrets in .env files

param keyVaultName string

// POSTGRESQL PASSWORD - NAME in KEY VAULT
param administratorLoginPasswordSecretName string = 'STRAPI-DATABASE-PASSWORD'
@secure()
param administratorLoginPasswordKSecretValue string

// COSMOS DB CONNECTION STRING - NAME in KEY VAULT
param cosmosDbSecretName string = 'AZURE-COSMOS-CONNECTION-STRING'
@secure()
param cosmosDbSecretNameValue string

// APP INSIGHT CONNECTION STRING - NAME in KEY VAULT
param appInsightsConnectionStringName string = 'APPLICATIONINSIGHTS-CONNECTION-STRING'
@secure ()
param appInsightsConnectionStringValue string

// POSTGRESQL PASSWORD
resource postgresPassword 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  parent: keyVault
  name: administratorLoginPasswordSecretName
  properties: {
    value: administratorLoginPasswordKSecretValue
  }
}

// COSMOS DB CONNECTION STRING
resource cosmosDbConnectionString 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  parent: keyVault
  name: cosmosDbSecretName
  properties: {
    value: cosmosDbSecretNameValue
  }
}

// APPLICATIONINSIGHTS CONNECTION STRING
resource appInsightsConnectionString 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {
  parent: keyVault
  name: appInsightsConnectionStringName
  properties: {
    value: appInsightsConnectionStringValue
  }
}
resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' existing = {
  name: keyVaultName
}
