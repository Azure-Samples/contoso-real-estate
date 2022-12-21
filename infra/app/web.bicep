param environmentName string
param location string = resourceGroup().location
param applicationInsightsName string = ''
param serviceName string = 'portal'

var swaNames = [
  'portal'
]

module web '../core/host/staticwebapps.bicep' = [for name in swaNames: {
  name: 'static-sites-resources-${name}'
  params: {
    environmentName: environmentName
    location: location
    serviceName: serviceName
    applicationInsightsName: applicationInsightsName
  }
}]

output WEB_PORTAL_NAME string = web[0].outputs.name
output WEB_PORTAL_URI string = web[0].outputs.uri
