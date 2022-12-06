param environmentName string
param location string = resourceGroup().location
param applicationInsightsName string = ''
param serviceName string = 'blog'
param cmsAppName string

module web '../core/host/staticwebapps.bicep' = {
  name: 'static-sites-resources-${serviceName}'
  params: {
    environmentName: environmentName
    location: location
    serviceName: serviceName
    applicationInsightsName: applicationInsightsName
    sku: {
      name: 'Standard'
      tier: 'Standard'
    }
  }
}

resource staticSite 'Microsoft.Web/staticSites@2022-03-01' existing = {
  name: web.outputs.name
}

resource cms 'Microsoft.App/containerApps@2022-03-01' existing = {
  name: cmsAppName
}

resource symbolicname 'Microsoft.Web/staticSites/linkedBackends@2022-03-01' = {
  name: 'backend1'
  parent: staticSite
  properties: {
    backendResourceId: cms.id
    region: cms.location
  }
}

output WEB_BLOG_NAME string = web.outputs.name
output WEB_BLOG_URI string = web.outputs.uri
