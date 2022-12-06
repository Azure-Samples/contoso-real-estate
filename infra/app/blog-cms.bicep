param name string
param location string = resourceGroup().location

param applicationInsightsName string
param containerAppsEnvironmentName string
param containerRegistryName string
param imageName string = ''
param serviceName string = 'blog-cms'
param databaseServerHost string
param databaseName string = 'citus'
param databaseUsername string = 'citus'
param appKeys string
param apiTokenSalt string

@secure()
param databasePassword string

@secure()
param jwtSecret string

@secure()
param adminJwtSecret string

module app '../core/host/container-app.bicep' = {
  name: '${serviceName}-container-app-module'
  params: {
    environmentName: name
    serviceName: serviceName
    location: location
    containerAppsEnvironmentName: containerAppsEnvironmentName
    containerRegistryName: containerRegistryName
    env: [
      {
        name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
        value: applicationInsights.properties.ConnectionString
      }
      {
        name: 'DATABASE_HOST'
        value: databaseServerHost
      }
      {
        name: 'DATABASE_USER'
        value: databaseUsername
      }
      {
        name: 'DATABASE_PASSWORD'
        value: databasePassword
      }
      {
        name: 'DATABASE_NAME'
        value: databaseName
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
        name: 'PORT'
        value: '80'
      }
      {
        name: 'NODE_ENV'
        value: 'production'
      }
    ]
    imageName: !empty(imageName) ? imageName : 'nginx:latest'
    targetPort: 80
  }
}

// todo: work out how to deploy the DB backend

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' existing = {
  name: applicationInsightsName
}

output SERVICE_BLOG_CMS_IDENTITY_PRINCIPAL_ID string = app.outputs.identityPrincipalId
output SERVICE_BLOG_CMS_NAME string = app.outputs.name
output SERVICE_BLOG_CMS_URI string = app.outputs.uri
output SERVICE_BLOG_CMS_IMAGE_NAME string = app.outputs.imageName
