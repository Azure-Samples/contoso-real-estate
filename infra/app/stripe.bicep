
param name string
param location string = resourceGroup().location
param tags object = {}

param apiUrl string
param portalUrl string
param applicationInsightsName string
param containerAppsEnvironmentName string
param containerRegistryName string
param stripeImageName string = ''
param serviceName string = 'stripe'

param stripePublicKey string
@secure()
param stripeSecretKey string
@secure()
param stripeWebhookSecret string

// Stripe is optional but secrets must not be empty if provided
var stripeSecrets = empty(stripePublicKey) ? [] : [
  {
    name: 'stripe-public-key'
    value: stripePublicKey
  }
  {
    name: 'stripe-secret-key'
    value: stripeSecretKey
  }
  {
    name: 'stripe-webhook'
    value: stripeWebhookSecret
  }
]
var stripeEnvVariables = empty(stripePublicKey) ? [] : [
  {
    name: 'STRIPE_PUBLIC_KEY'
    value: 'secretref:stripe-public-key'
  }
  {
    name: 'STRIPE_SECRET_KEY'
    value: 'secretref:stripe-secret-key'
  }
  {
    name: 'STRIPE_WEBHOOK_SECRET'
    value: 'secretref:stripe-webhook'
  }
]

module stripe '../core/host/container-app.bicep' = {
  name: '${serviceName}-container-app-module'
  params: {
    name: name
    location: location
    tags: union(tags, { 'azd-service-name': serviceName })
    containerAppsEnvironmentName: containerAppsEnvironmentName
    containerRegistryName: containerRegistryName
    containerCpuCoreCount: '1.0'
    containerMemory: '2.0Gi'
    secrets: concat([
      {
        name: 'appinsights-cs'
        value: applicationInsights.properties.ConnectionString
      }
    ], stripeSecrets)
    env: concat([
      {
        name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
        value: 'secretref:appinsights-cs'
      }
      {
        name: 'API_URL'
        value: apiUrl
      }
      {
        name: 'WEB_APP_URL'
        value: portalUrl
      }
    ], stripeEnvVariables)
    imageName: !empty(stripeImageName) ? stripeImageName : 'nginx:latest'
    targetPort: 4242
  }
}

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' existing = {
  name: applicationInsightsName
}

output SERVICE_STRIPE_NAME string = stripe.outputs.name
output SERVICE_STRIPE_URI string = stripe.outputs.uri
output SERVICE_STRIPE_IMAGE_NAME string = stripe.outputs.imageName
