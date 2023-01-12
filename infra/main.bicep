targetScope = 'subscription'

@minLength(1)
@maxLength(64)
@description('Name of the the environment which is used to generate a short unique hash used in all resources.')
param environmentName string

@minLength(1)
@description('Primary location for all resources')
param location string

@description('Id of the user or app to assign application roles')
param principalId string = ''

param containerAppsEnvironmentName string = ''
param containerRegistryName string = ''

@secure()
param appKeys string
@secure()
param apiTokenSalt string

@secure()
param jwtSecret string

@secure()
param adminJwtSecret string

param cmsDatabaseServerName string = ''

@secure()
param cmsDatabasePassword string

var abbrs = loadJsonContent('./abbreviations.json')
var resourceToken = toLower(uniqueString(subscription().id, environmentName, location))
var tags = { 'azd-env-name': environmentName }

resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: '${abbrs.resourcesResourceGroups}${environmentName}'
  location: location
  tags: tags
}

// The application frontend
module web './app/web.bicep' = {
  name: 'web'
  scope: rg
  params: {
    environmentName: environmentName
    location: location
    applicationInsightsName: monitoring.outputs.applicationInsightsName
  }
}

// The application database
module cosmos './app/db.bicep' = {
  name: 'cosmos'
  scope: rg
  params: {
    environmentName: environmentName
    location: location
    keyVaultName: keyVault.outputs.keyVaultName
  }
}

// Store secrets in a keyvault
module keyVault './core/security/keyvault.bicep' = {
  name: 'keyvault'
  scope: rg
  params: {
    environmentName: environmentName
    location: location
    principalId: principalId
  }
}

// Monitor application with Azure Monitor
module monitoring './core/monitor/monitoring.bicep' = {
  name: 'monitoring'
  scope: rg
  params: {
    environmentName: environmentName
    location: location
  }
}

// Container apps host (including container registry)
module containerApps './core/host/container-apps.bicep' = {
  name: 'container-apps'
  scope: rg
  params: {
    environmentName: 'app'
    containerAppsEnvironmentName: !empty(containerAppsEnvironmentName) ? containerAppsEnvironmentName : '${abbrs.appManagedEnvironments}${resourceToken}'
    containerRegistryName: !empty(containerRegistryName) ? containerRegistryName : '${abbrs.containerRegistryRegistries}${resourceToken}'
    location: location
    logAnalyticsWorkspaceName: monitoring.outputs.logAnalyticsWorkspaceName
  }
}

module storageAccount 'core/storage/storage-account.bicep' = {
  name: 'storage'
  scope: rg
  params: {
    environmentName: 'storage'
    allowBlobPublicAccess: true
    location: location
  }
}

module cms './app/blog-cms.bicep' = {
  name: 'cms'
  scope: rg
  params: {
    containerAppsEnvironmentName: !empty(containerAppsEnvironmentName) ? containerAppsEnvironmentName : '${abbrs.appManagedEnvironments}${resourceToken}'
    containerRegistryName: !empty(containerRegistryName) ? containerRegistryName : '${abbrs.containerRegistryRegistries}${resourceToken}'
    applicationInsightsName: monitoring.outputs.applicationInsightsName
    location: location
    adminJwtSecret: adminJwtSecret
    apiTokenSalt: apiTokenSalt
    appKeys: appKeys
    jwtSecret: jwtSecret
    databasePassword: cmsDatabasePassword
    serverName: !empty(cmsDatabaseServerName) ? cmsDatabaseServerName : '${abbrs.dBforPostgreSQLServers}db-${resourceToken}'
    environmentName: environmentName
    storageAccountName: storageAccount.outputs.name
    databaseName: 'strapi-${resourceToken}'
  }
}

module blog 'app/blog.bicep' = {
  name: 'blog'
  scope: rg
  params: {
    cmsUrl: cms.outputs.SERVICE_BLOG_CMS_URI
    containerAppsEnvironmentName: !empty(containerAppsEnvironmentName) ? containerAppsEnvironmentName : '${abbrs.appManagedEnvironments}${resourceToken}'
    containerRegistryName: !empty(containerRegistryName) ? containerRegistryName : '${abbrs.containerRegistryRegistries}${resourceToken}'
    applicationInsightsName: monitoring.outputs.applicationInsightsName
    location: location
    environmentName: environmentName
    storageAccountName: storageAccount.outputs.name
  }
}

output APPLICATIONINSIGHTS_CONNECTION_STRING string = monitoring.outputs.applicationInsightsConnectionString
output APPLICATIONINSIGHTS_NAME string = monitoring.outputs.applicationInsightsName
output AZURE_COSMOS_CONNECTION_STRING_KEY string = cosmos.outputs.cosmosConnectionStringKey
output AZURE_COSMOS_DATABASE_NAME string = cosmos.outputs.cosmosDatabaseName
output AZURE_KEY_VAULT_ENDPOINT string = keyVault.outputs.keyVaultEndpoint
output AZURE_LOCATION string = location
output AZURE_TENANT_ID string = tenant().tenantId
output WEB_PORTAL_URI string = web.outputs.WEB_PORTAL_URI
output WEB_BLOG_URI string = blog.outputs.WEB_BLOG_URI
output WEB_BLOG_NAME string = blog.outputs.WEB_BLOG_NAME
output AZURE_CONTAINER_ENVIRONMENT_NAME string = containerApps.outputs.containerAppsEnvironmentName
output AZURE_CONTAINER_REGISTRY_ENDPOINT string = containerApps.outputs.containerRegistryEndpoint
output AZURE_CONTAINER_REGISTRY_NAME string = containerApps.outputs.containerRegistryName
output SERVICE_BLOG_CMS_URL string = cms.outputs.SERVICE_BLOG_CMS_URI
output SERVICE_BLOG_CMS_NAME string = cms.outputs.SERVICE_BLOG_CMS_NAME
output STORAGE_ACCOUNT_NAME string = storageAccount.outputs.name
output SERVICE_BLOG_CMS_SERVER_HOST string = cms.outputs.SERVICE_BLOG_CMS_SERVER_HOST
output SERVICE_CMS_POSTGRESQL_DATABASE_NAME string = cms.outputs.SERVICE_BLOG_CMS_DATABASE_NAME
