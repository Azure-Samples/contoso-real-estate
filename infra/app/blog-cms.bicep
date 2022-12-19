param environmentName string
param location string = resourceGroup().location

param applicationInsightsName string
param containerAppsEnvironmentName string
param containerRegistryName string
param imageName string = ''
param serviceName string = 'blog-cms'
param databaseName string = 'strapi'
param databaseUsername string = 'contoso'
param appKeys string
param apiTokenSalt string

@secure()
param databasePassword string

@secure()
param jwtSecret string

@secure()
param adminJwtSecret string

param serverName string

module db '../core/database/postgres.bicep' = {
  name: '${serviceName}-database-module'
  params: {
    administratorLogin: databaseUsername
    administratorLoginPassword: databasePassword
    location: location
    serverName: serverName
    databaseName: databaseName
  }
}

module app '../core/host/container-app.bicep' = {
  name: '${serviceName}-container-app-module'
  params: {
    environmentName: environmentName
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
        value: db.outputs.SERVER_HOST
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

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' existing = {
  name: applicationInsightsName
}

output SERVICE_BLOG_CMS_IDENTITY_PRINCIPAL_ID string = app.outputs.identityPrincipalId
output SERVICE_BLOG_CMS_NAME string = app.outputs.name
output SERVICE_BLOG_CMS_URI string = app.outputs.uri
output SERVICE_BLOG_CMS_IMAGE_NAME string = app.outputs.imageName
output SERVICE_BLOG_CMS_SERVER_NAME string = db.name
output SERVICE_BLOG_CMS_DATABASE_NAME string = db.outputs.DB_NAME
output SERVICE_BLOG_CMS_SERVER_HOST string = db.outputs.SERVER_HOST
