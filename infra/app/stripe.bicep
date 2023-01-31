param location string = resourceGroup().location
param applicationInsightsName string = ''
param serviceName string = 'stripe'
param apiUrl string
param stripePublicKey string
@secure()
param stripeSecretKey string
@secure()
param stripeWebhookSecret string
param containerAppsEnvironmentName string
param containerRegistryName string
param imageName string = ''
param environmentName string

var abbrs = loadJsonContent('../abbreviations.json')
var resourceToken = toLower(uniqueString(subscription().id, environmentName, location))

module app '../core/host/container-app.bicep' = {
  name: '${serviceName}-container-app-module'
  params: {
    environmentName: environmentName
    serviceName: !empty(serviceName) ? serviceName : '${abbrs.appContainerApps}${serviceName}-${resourceToken}'
    location: location
    containerAppsEnvironmentName: containerAppsEnvironmentName
    containerRegistryName: containerRegistryName
    env: [
      {
        name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
        value: applicationInsights.properties.ConnectionString
      }
      {
        name: 'API_URL'
        value: apiUrl
      }
      {
        name: 'STRIPE_PUBLIC_KEY'
        value: stripePublicKey
      }
      {
        name: 'STRIPE_SECRET_KEY'
        value: stripeSecretKey
      }
      {
        name: 'STRIPE_WEBHOOK_SECRET'
        value: stripeWebhookSecret
      }
    ]
    imageName: !empty(imageName) ? imageName : 'nginx:latest'
    targetPort: 3000
  }
}

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' existing = {
  name: applicationInsightsName
}

output SERVICE_STRIPE_NAME string = app.outputs.name
output SERVICE_STRIPE_URI string = app.outputs.uri
output SERVICE_STRIPE_IMAGE_NAME string = app.outputs.imageName
