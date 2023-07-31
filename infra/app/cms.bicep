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
        name: 'APPINSIGHTS_CS'
        value: applicationInsights.properties.ConnectionString
      }
      {
        name: 'DATABASE_USERNAME'
        value: databaseUsername
      }
      {
        name: 'DATABASE_PASSWORD'
        value: databasePassword
      }
      {
        name: 'JWT_SECRET'
        value: jwtSecret
      }
      {
        name: 'APP_KEYS'
        value: appKeys
      }
      {
        name: 'API_TOKEN_SALT'
        value: apiTokenSalt
      }
      {
        name: 'ADMIN_JWT_SECRET'
        value: adminJwtSecret
      }
      {
        name: 'STORAGE_ACCOUNT_KEY'
        value: storageAccount.listKeys().keys[0].value
      }
    ]
    env: [
      {
        name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
        value: 'secretref:APPINSIGHTS_CS'
      }
      {
        name: 'DATABASE_HOST'
        value: databaseHost
      }
      {
        name: 'DATABASE_USERNAME'
        value: 'secretref:DATABASE_USERNAME'
      }
      {
        name: 'DATABASE_PASSWORD'
        value: 'secretref:DATABASE_PASSWORD'
      }
      {
        name: 'DATABASE_NAME'
        value: databaseName
      }
      {
        name: 'JWT_SECRET'
        value: 'secretref:JWT_SECRET'
      }
      {
        name: 'APP_KEYS'
        value: 'secretref:APP_KEYS'
      }
      {
        name: 'API_TOKEN_SALT'
        value: 'secretref:API_TOKEN_SALT'
      }
      {
        name: 'ADMIN_JWT_SECRET'
        value: 'secretref:ADMIN_JWT_SECRET'
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
        value: 'secretref:STORAGE_ACCOUNT_KEY'
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
