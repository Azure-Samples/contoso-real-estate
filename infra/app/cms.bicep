param name string
param location string = resourceGroup().location
param tags object = {}

@secure()
param adminJwtSecret string
@secure()
param apiTokenSalt string
@secure()
param appKeys string
param applicationInsightsName string
param containerAppsEnvironmentName string
param containerRegistryName string
param databaseHost string
param databaseName string = 'strapi'
@secure()
param databasePassword string
param databaseUsername string = 'contoso'
param cmsImageName string = ''
@secure()
param jwtSecret string
param keyVaultName string
param serviceName string = 'cms'
param storageAccountName string
param storageContainerName string

module cms '../core/host/container-app.bicep' = {
  name: '${serviceName}-container-app-module'
  params: {
    name: name
    location: location
    tags: union(tags, { 'azd-service-name': serviceName })
    containerAppsEnvironmentName: containerAppsEnvironmentName
    containerRegistryName: containerRegistryName
    containerCpuCoreCount: '1.0'
    containerMemory: '2.0Gi'
    secrets: [
      {
        name: 'appinsights-cs'
        value: applicationInsights.properties.ConnectionString
      }
      {
        name: 'database-username'
        value: databaseUsername
      }
      {
        name: 'database-password'
        value: databasePassword
      }
      {
        name: 'jwt-secret'
        value: jwtSecret
      }
      {
        name: 'app-keys'
        value: appKeys
      }
      {
        name: 'api-token-salt'
        value: apiTokenSalt
      }
      {
        name: 'admin-jwt-secret'
        value: adminJwtSecret
      }
      {
        name: 'storage-account-key'
        value: storageAccount.listKeys().keys[0].value
      }
    ]
    env: [
      {
        name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
        value: 'secretref:appinsights-cs'
      }
      {
        name: 'DATABASE_HOST'
        value: databaseHost
      }
      {
        name: 'DATABASE_USERNAME'
        value: 'secretref:database-username'
      }
      {
        name: 'DATABASE_PASSWORD'
        value: 'secretref:database-password'
      }
      {
        name: 'DATABASE_NAME'
        value: databaseName
      }
      {
        name: 'JWT_SECRET'
        value: 'secretref:jwt-secret'
      }
      {
        name: 'APP_KEYS'
        value: 'secretref:app-keys'
      }
      {
        name: 'API_TOKEN_SALT'
        value: 'secretref:api-token-salt'
      }
      {
        name: 'ADMIN_JWT_SECRET'
        value: 'secretref:admin-jwt-secret'
      }
      {
        name: 'NODE_ENV'
        value: 'production'
      }
      {
        name: 'STORAGE_ACCOUNT'
        value: storageAccount.name
      }
      {
        name: 'STORAGE_ACCOUNT_KEY'
        value: 'secretref:storage-account-key'
      }
      {
        name: 'STORAGE_CONTAINER_NAME'
        value: storageContainerName
      }
      {
        name: 'STORAGE_URL'
        value: storageAccount.properties.primaryEndpoints.blob
      }
      {
        name: 'AZURE_KEY_VAULT_ENDPOINT'
        value: keyVault.properties.vaultUri
      }
    ]
    imageName: !empty(cmsImageName) ? cmsImageName : 'nginx:latest'
    keyVaultName: keyVault.name
    targetPort: 1337
  }
}

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' existing = {
  name: applicationInsightsName
}

resource keyVault 'Microsoft.KeyVault/vaults@2022-11-01' existing = {
  name: keyVaultName
}

resource storageAccount 'Microsoft.Storage/storageAccounts@2022-09-01' existing = {
  name: storageAccountName
}

output SERVICE_CMS_IDENTITY_PRINCIPAL_ID string = cms.outputs.identityPrincipalId
output SERVICE_CMS_NAME string = cms.outputs.name
output SERVICE_CMS_URI string = cms.outputs.uri
output SERVICE_CMS_IMAGE_NAME string = cms.outputs.imageName
