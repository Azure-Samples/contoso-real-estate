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

param apimServiceName string = ''
param applicationInsightsDashboardName string = ''
param applicationInsightsName string = ''
param blogContainerAppName string = ''
param cmsContainerAppName string = ''
param containerAppsEnvironmentName string = ''
param containerRegistryName string = ''
param cosmosAccountName string = ''
param cosmosDatabaseName string = ''
param keyVaultName string = ''
param logAnalyticsName string = ''
param webServiceName string = ''
param storageAccountName string = ''
param storageContainerName string = ''
param stripeContainerAppName string = ''
param apiServiceName string = ''
param appServicePlanName string = ''
param eventGridName string = ''
param cmsImageName string = ''
param blogImageName string = ''
param stripeImageName string = ''
param stripeServiceUrl string = ''

@secure()
param appKeys string
@secure()
param apiTokenSalt string

@secure()
param jwtSecret string

@secure()
param adminJwtSecret string

param cmsDatabaseName string = 'strapi'
param cmsDatabaseUser string = 'strapi'
param cmsDatabaseServerName string = ''
param cmsDatabasePort string = '5432'
@secure()
param cmsDatabasePassword string

param stripePublicKey string

@secure()
param stripeSecretKey string

@secure()
param stripeWebhookSecret string

// Set to true to use Azure API Management
@description('Flag to use Azure API Management to mediate the calls between the Web frontend and the backend API')
param useAPIM bool = false

var abbrs = loadJsonContent('./abbreviations.json')
var resourceToken = toLower(uniqueString(subscription().id, environmentName, location))
var tags = { 'azd-env-name': environmentName }

resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: '${abbrs.resourcesResourceGroups}${environmentName}'
  location: location
  tags: tags
}

/////////// Common ///////////

// Store secrets in a keyvault
module keyVault './core/security/keyvault.bicep' = {
  name: 'keyvault'
  scope: rg
  params: {
    name: !empty(keyVaultName) ? keyVaultName : '${abbrs.keyVaultVaults}${resourceToken}'
    location: location
    tags: tags
    principalId: principalId
  }
}

// Monitor application with Azure Monitor
module monitoring './core/monitor/monitoring.bicep' = {
  name: 'monitoring'
  scope: rg
  params: {
    location: location
    tags: tags
    logAnalyticsName: !empty(logAnalyticsName) ? logAnalyticsName : '${abbrs.operationalInsightsWorkspaces}${resourceToken}'
    applicationInsightsName: !empty(applicationInsightsName) ? applicationInsightsName : '${abbrs.insightsComponents}${resourceToken}'
    applicationInsightsDashboardName: !empty(applicationInsightsDashboardName) ? applicationInsightsDashboardName : '${abbrs.portalDashboards}${resourceToken}'
  }
}

// Container apps host (including container registry)
module containerApps './core/host/container-apps.bicep' = {
  name: 'container-apps'
  scope: rg
  params: {
    name: 'app'
    containerAppsEnvironmentName: !empty(containerAppsEnvironmentName) ? containerAppsEnvironmentName : '${abbrs.appManagedEnvironments}${resourceToken}'
    containerRegistryName: !empty(containerRegistryName) ? containerRegistryName : '${abbrs.containerRegistryRegistries}${resourceToken}'
    location: location
    logAnalyticsWorkspaceName: monitoring.outputs.logAnalyticsWorkspaceName
  }
}

module storageAccount './core/storage/storage-account.bicep' = {
  name: 'storage'
  scope: rg
  params: {
    name: !empty(storageAccountName) ? storageAccountName : '${abbrs.storageStorageAccounts}${resourceToken}'
    allowBlobPublicAccess: true
    location: location
    containers: [
      {
        name: !empty(storageContainerName) ? storageContainerName : 'stc${resourceToken}'
        publicAccess: 'Blob'
      }
    ]
  }
}

// Creates Azure API Management (APIM) service to mediate the requests between the frontend and the backend API
module apim './core/gateway/apim.bicep' = if (useAPIM) {
  name: 'apim'
  scope: rg
  params: {
    name: !empty(apimServiceName) ? apimServiceName : '${abbrs.apiManagementService}${resourceToken}'
    location: location
    tags: tags
    applicationInsightsName: monitoring.outputs.applicationInsightsName
    sku: 'Developer'
  }
}

// Configures the API in the Azure API Management (APIM) service
module apimApi './app/apim-api.bicep' = if (useAPIM) {
  name: 'apim-api'
  scope: rg
  params: {
    name: useAPIM ? apim.outputs.apimServiceName : ''
    apiName: 'contoso-api'
    apiDisplayName: 'contoso-api'
    apiDescription: 'This is the API integration server for Contoso Real Estate company.'
    apiPath: 'api'
    webFrontendUrl: portal.outputs.SERVICE_WEB_URI
    apiBackendUrl: api.outputs.SERVICE_API_URI
  }
}

// Configures the API in the Azure API Management (APIM) service
module apimStripe './app/apim-stripe.bicep' = if (useAPIM) {
  name: 'apim-stripe'
  scope: rg
  params: {
    name: useAPIM ? apim.outputs.apimServiceName : ''
    apiName: 'contoso-stripe'
    apiDisplayName: 'contoso-stripe'
    apiDescription: 'This is the Stripe integration server for Contoso Real Estate company.'
    apiPath: 'stripe'
    webFrontendUrl: portal.outputs.SERVICE_WEB_URI
    apiBackendUrl: api.outputs.SERVICE_API_URI
  }
}

/////////// Portal ///////////

// The application frontend
module portal './app/portal.bicep' = {
  name: 'portal'
  scope: rg
  params: {
    name: !empty(webServiceName) ? webServiceName : '${abbrs.webStaticSites}web-${resourceToken}'
    location: location
    tags: tags
  }
}

// the linked APIM or Function API
module portalBackend './app/portal-backend.bicep' = {
  name: 'portal-apim'
  scope: rg
  params: {
    name: useAPIM ? apim.outputs.apimServiceName : api.outputs.SERVICE_API_NAME
    location: location
    tags: tags
    useAPIM: useAPIM
    portalName: portal.outputs.SERVICE_WEB_NAME
    apiServiceName: api.outputs.SERVICE_API_NAME
  }
}

// The application database
module cosmos './app/db.bicep' = {
  name: 'cosmos'
  scope: rg
  params: {
    accountName: !empty(cosmosAccountName) ? cosmosAccountName : '${abbrs.documentDBDatabaseAccounts}${resourceToken}'
    databaseName: cosmosDatabaseName
    location: location
    tags: tags
    keyVaultName: keyVault.outputs.name
  }
}

/////////// Portal API ///////////

module appServicePlan './core/host/appserviceplan.bicep' = {
  name: 'appserviceplan'
  scope: rg
  params: {
    name: !empty(appServicePlanName) ? appServicePlanName : '${abbrs.webServerFarms}${resourceToken}'
    location: location
    tags: tags
    sku: {
      name: 'Y1'
      tier: 'Dynamic'
    }
  }
}

module api './app/api.bicep' = {
  name: 'api'
  scope: rg
  params: {
    name: !empty(apiServiceName) ? apiServiceName : '${abbrs.webSitesFunctions}api-${resourceToken}'
    location: location
    tags: tags
    applicationInsightsName: monitoring.outputs.applicationInsightsName
    appServicePlanId: appServicePlan.outputs.id
    keyVaultName: keyVault.outputs.name
    eventGridName: eventGrid.name
    storageAccountName: storageAccount.outputs.name
    allowedOrigins: [ portal.outputs.SERVICE_WEB_URI ]
    appSettings: {
      AZURE_COSMOS_CONNECTION_STRING_KV: cosmos.outputs.connectionStringKey
      AZURE_COSMOS_CONNECTION_STRING_KEY: cosmos.outputs.connectionString
      AZURE_COSMOS_DATABASE_NAME: cosmos.outputs.databaseName
      AZURE_COSMOS_ENDPOINT: cosmos.outputs.endpoint
      STRAPI_DATABASE_NAME: cmsDatabaseName
      STRAPI_DATABASE_USERNAME: cmsDatabaseUser
      STRAPI_DATABASE_PASSWORD: cmsDatabasePassword
      STRAPI_DATABASE_HOST: cmsDB.outputs.POSTGRES_DOMAIN_NAME
      STRAPI_DATABASE_PORT: cmsDatabasePort
      STRAPI_DATABASE_SSL: 'true'
    }

    // Note:  this property is passed as params to avoid circular dependency (see api.bicep)
    stripeServiceUrl: stripeServiceUrl
  }
}

/////////// CMS ///////////

module cms './app/cms.bicep' = {
  name: 'cms'
  scope: rg
  params: {
    name: !empty(cmsContainerAppName) ? cmsContainerAppName : '${abbrs.appContainerApps}cms-${resourceToken}'
    location: location
    cmsImageName: cmsImageName
    applicationInsightsName: monitoring.outputs.applicationInsightsName
    containerAppsEnvironmentName: !empty(containerAppsEnvironmentName) ? containerAppsEnvironmentName : '${abbrs.appManagedEnvironments}${resourceToken}'
    containerRegistryName: !empty(containerRegistryName) ? containerRegistryName : '${abbrs.containerRegistryRegistries}${resourceToken}'
    databaseHost: cmsDB.outputs.POSTGRES_DOMAIN_NAME
    databaseName: cmsDatabaseName
    databaseUsername: cmsDatabaseUser
    databasePassword: cmsDatabasePassword

    appKeys: appKeys
    apiTokenSalt: apiTokenSalt
    jwtSecret: jwtSecret
    adminJwtSecret: adminJwtSecret

    storageAccountName: storageAccount.outputs.name
    storageContainerName: storageContainerName

    keyVaultName: keyVault.outputs.name
  }
}

// The cms database
module cmsDB './core/database/postgresql/flexibleserver.bicep' = {
  name: 'postgresql'
  scope: rg
  params: {
    name: !empty(cmsDatabaseServerName) ? cmsDatabaseServerName : '${abbrs.dBforPostgreSQLServers}db-${resourceToken}'
    location: location
    tags: tags
    sku: {
      name: 'Standard_B1ms'
      tier: 'Burstable'
    }
    storage: {
      storageSizeGB: 32
    }
    version: '13'
    administratorLogin: cmsDatabaseUser
    administratorLoginPassword: cmsDatabasePassword
    databaseNames: [ cmsDatabaseName ]
    allowAzureIPsFirewall: true
    keyVaultName: keyVault.outputs.name
  }
}

/////////// Blog ///////////

module blog './app/blog.bicep' = {
  name: 'blog'
  scope: rg
  params: {
    name: !empty(blogContainerAppName) ? blogContainerAppName : '${abbrs.appContainerApps}blog-${resourceToken}'
    blogImageName: blogImageName
    location: location
    applicationInsightsName: monitoring.outputs.applicationInsightsName
    containerAppsEnvironmentName: !empty(containerAppsEnvironmentName) ? containerAppsEnvironmentName : '${abbrs.appManagedEnvironments}${resourceToken}'
    containerRegistryName: !empty(containerRegistryName) ? containerRegistryName : '${abbrs.containerRegistryRegistries}${resourceToken}'
    cmsUrl: cms.outputs.SERVICE_CMS_URI
    portalUrl: portal.outputs.SERVICE_WEB_URI
    keyVaultName: keyVault.outputs.name
  }
}

/////////// Payment API ///////////

module stripe './app/stripe.bicep' = {
  name: 'stripe'
  scope: rg
  params: {
    name: !empty(stripeContainerAppName) ? stripeContainerAppName : '${abbrs.appContainerApps}stripe-${resourceToken}'
    location: location
    stripeImageName: stripeImageName
    applicationInsightsName: monitoring.outputs.applicationInsightsName
    containerAppsEnvironmentName: !empty(containerAppsEnvironmentName) ? containerAppsEnvironmentName : '${abbrs.appManagedEnvironments}${resourceToken}'
    containerRegistryName: !empty(containerRegistryName) ? containerRegistryName : '${abbrs.containerRegistryRegistries}${resourceToken}'
    stripeSecretKey: stripeSecretKey
    stripePublicKey: stripePublicKey
    stripeWebhookSecret: stripeWebhookSecret
    apiUrl: useAPIM ? api.outputs.SERVICE_API_URI : portal.outputs.SERVICE_WEB_URI
    portalUrl: portal.outputs.SERVICE_WEB_URI
  }
}

module eventGrid './app/events.bicep' = {
  name: 'events'
  scope: rg
  params: {
    name: !empty(eventGridName) ? eventGridName : '${abbrs.eventGridDomainsTopics}${resourceToken}'
    location: location
    tags: tags
    storageAccountName: storageAccount.outputs.name
  }
}

// Data outputs
output AZURE_COSMOS_CONNECTION_STRING_KEY string = cosmos.outputs.connectionStringKey
output AZURE_COSMOS_DATABASE_NAME string = cosmos.outputs.databaseName

// App outputs
output APPLICATIONINSIGHTS_CONNECTION_STRING string = monitoring.outputs.applicationInsightsConnectionString
output APPLICATIONINSIGHTS_NAME string = monitoring.outputs.applicationInsightsName

output AZURE_CONTAINER_ENVIRONMENT_NAME string = containerApps.outputs.environmentName
output AZURE_CONTAINER_REGISTRY_ENDPOINT string = containerApps.outputs.registryLoginServer
output AZURE_CONTAINER_REGISTRY_NAME string = containerApps.outputs.registryName
output AZURE_KEY_VAULT_ENDPOINT string = keyVault.outputs.endpoint
output AZURE_KEY_VAULT_NAME string = keyVault.outputs.name
output AZURE_LOCATION string = location
output AZURE_TENANT_ID string = tenant().tenantId

output SERVICE_API_NAME string = api.outputs.SERVICE_API_NAME
output SERVICE_WEB_NAME string = portal.outputs.SERVICE_WEB_NAME

output USE_APIM bool = useAPIM

output SERVICE_API_ENDPOINTS array = useAPIM ? [ apimApi.outputs.SERVICE_API_URI, api.outputs.SERVICE_API_URI ] : []

output SERVICE_WEB_URI string = portal.outputs.SERVICE_WEB_URI
output SERVICE_BLOG_URI string = blog.outputs.SERVICE_BLOG_URI
output SERVICE_BLOG_NAME string = blog.outputs.SERVICE_BLOG_NAME

output SERVICE_CMS_URI string = cms.outputs.SERVICE_CMS_URI
output SERVICE_CMS_NAME string = cms.outputs.SERVICE_CMS_NAME
output SERVICE_STRIPE_URI string = stripe.outputs.SERVICE_STRIPE_URI
output SERVICE_STRIPE_NAME string = stripe.outputs.SERVICE_STRIPE_NAME

output STORAGE_ACCOUNT_NAME string = storageAccount.outputs.name
output STORAGE_CONTAINER_NAME string = storageContainerName
output SERVICE_CMS_SERVER_HOST string = cmsDB.outputs.POSTGRES_DOMAIN_NAME

output STRAPI_DATABASE_NAME string = cmsDatabaseName
output STRAPI_DATABASE_USERNAME string = cmsDatabaseUser
output STRAPI_DATABASE_HOST string = cmsDB.outputs.POSTGRES_DOMAIN_NAME
output STRAPI_DATABASE_PORT string = cmsDatabasePort

output CMS_DATABASE_SERVER_NAME string = cmsDB.outputs.POSTGRES_SERVER_NAME

// We need this to manually restore the database
output STRAPI_DATABASE_PASSWORD string = cmsDatabasePassword
