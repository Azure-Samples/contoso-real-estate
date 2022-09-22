targetScope = 'subscription'

@minLength(1)
@maxLength(64)
@description('Name of the the environment which is used to generate a short unique hash used in all resources.')
param name string

@minLength(1)
@description('Primary location for all resources')
param location string

@description('Id of the user or app to assign app roles')
param principalId string = ''

var resourceToken = toLower(uniqueString(subscription().id, name, location))
var tags = { 'azd-env-name': name }
var abbrs = loadJsonContent('abbreviations.json')

var azureCosmosConnectionStringKey = 'AZURE_COSMOS_CONNECTION_STRING_KEY'

// Note: Application Insights is required for "azd monitor"
var deployAppInsights = true

resource resourceGroup 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: '${abbrs.resourcesResourceGroups}${name}'
  location: location
  tags: tags
}

module keyVaultResources 'resources/key-vault.bicep' = {
  name: 'key-vault-resources'
  scope: resourceGroup
  params: {
    tenantId: subscription().tenantId
    enableSoftDelete: false
    keyVaultName: '${abbrs.keyVaultVaults}${resourceToken}'
    location: location
    databaseConnectionString: databaseResources.outputs.ConnectionString
    principalId: principalId
    tags: tags
  }
}

module storageResources 'resources/storage.bicep' = {
  name: 'storage-resources'
  scope: resourceGroup
  params: {
    location: location
    storageName: '${abbrs.storageStorageAccounts}${resourceToken}'
    tags: tags
  }
}

module logAnalyticsResources 'resources/log-analytics.bicep' = {
  name: 'log-analytics-resources'
  scope: resourceGroup
  params: {
    logAnalyticsName: '${abbrs.operationalInsightsWorkspaces}${resourceToken}'
    location: location
    tags: tags
  }
}

module applicationInsightsResources 'resources/applicationinsights.bicep' = {
  name: 'applicationinsights-resources'
  scope: resourceGroup
  params: {
    applicationInsightsName: '${abbrs.insightsComponents}${resourceToken}'
    location: location
    logAnalyticsWorkspaceId: logAnalyticsResources.outputs.id
    tags: tags
  }
}

module databaseResources 'resources/database.bicep' = {
  name: 'database-resources'
  scope: resourceGroup
  params: {
    databaseAccountName: '${abbrs.documentDBDatabaseAccounts}${resourceToken}'
    location: location
    tags: tags
  }
}

module containerAppsResources 'resources/container-apps.bicep' = {
  name: 'containerapps-resources'
  scope: resourceGroup
  params: {
    logAnalyticsWorkspaceId: logAnalyticsResources.outputs.id
    environmentName: '${abbrs.appContainerApps}${resourceToken}'
    location: location
    tags: tags
  }
}

module funcResources 'resources/functions.bicep' = {
  name: 'function-resources'
  scope: resourceGroup
  params: {
    funcAppName: '${abbrs.webSitesFunctions}${resourceToken}'
    serverFarmName: '${abbrs.webServerFarms}${resourceToken}'
    location: location
    appSettings: {
      APPINSIGHTS_INSTRUMENTATIONKEY: applicationInsightsResources.outputs.InstrumentationKey
      APPLICATIONINSIGHTS_CONNECTION_STRING: applicationInsightsResources.outputs.ConnectionString
      AzureWebJobsStorage: storageResources.outputs.ConnectionString
      FUNCTIONS_EXTENSION_VERSION: '~4'
      FUNCTIONS_WORKER_RUNTIME: 'node'
      SCM_DO_BUILD_DURING_DEPLOYMENT: 'true'
      ENABLE_ORYX_BUILD: 'true'
      STORAGE_CONNECTION_STRING: storageResources.outputs.ConnectionString
      DATABASE_CONNECTION_STRING_KEY: azureCosmosConnectionStringKey
      DATABASE_NAME: databaseResources.outputs.name
      AZURE_KEY_VAULT_ENDPOINT: keyVaultResources.outputs.keyVaultEndpoint

      // TODO(manekinekko): remove this once we enable key vault integration
      DATABASE_CONNECTION_STRING: databaseResources.outputs.ConnectionString

      // https://github.com/projectkudu/kudu/wiki/Deploying-from-a-zip-file-or-url#issues-and-investigation
      SCM_ZIPDEPLOY_DONOT_PRESERVE_FILETIME: '1'
    }
    tags: tags
  }
}

var swaNames = [
  'portal'
  'blog'
]

module swaResources 'resources/static-sites.bicep' = [for name in swaNames: {
  name: 'static-sites-resources-${name}'
  scope: resourceGroup
  params: {
    appSettings: {
      APPINSIGHTS_INSTRUMENTATIONKEY: deployAppInsights ? applicationInsightsResources.outputs.ConnectionString : null
      STORAGE_CONNECTION_STRING: storageResources.outputs.ConnectionString
      DATABASE_CONNECTION_STRING: databaseResources.outputs.ConnectionString
      AzureWebJobsStorage: storageResources.outputs.ConnectionString
      FUNCTIONS_EXTENSION_VERSION: '~4'
      FUNCTIONS_WORKER_RUNTIME: 'node'
      SCM_DO_BUILD_DURING_DEPLOYMENT: 'true'
    }
    buildProperties: {
      skipGithubActionWorkflowGeneration: true
    }
    location: location
    staticSiteName: '${abbrs.webStaticSites}${resourceToken}-${name}'
    tags: tags
  }
}]

output AZURE_KEY_VAULT_ENDPOINT string = keyVaultResources.outputs.keyVaultEndpoint	
output DATABASE_CONNECTION_STRING_KEY string = azureCosmosConnectionStringKey
output DATABASE_CONNECTION_STRING string = databaseResources.outputs.ConnectionString
output DATABASE_NAME string = databaseResources.outputs.name
output STORAGE_CONNECTION_STRING string = storageResources.outputs.ConnectionString
output APPLICATIONINSIGHTS_CONNECTION_STRING string = applicationInsightsResources.outputs.ConnectionString
output AZURE_LOCATION string = location
output AZURE_TENANT_ID string = tenant().tenantId
output CONTAINER_APP_URL string = containerAppsResources.outputs.url
output AZURE_FUNCTION_URL string = funcResources.outputs.url
output SWA_URL_PORTAL string = swaResources[0].outputs.url
output SWA_URL_BLOG string = swaResources[1].outputs.url
