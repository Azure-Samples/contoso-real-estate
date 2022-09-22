@description('Resource tags.')
param tags object

@description('Resource location.')
param location string

@description('The SKU for the static site.')
param sku object = {
  name: 'Free'
  tier: 'Free'
}

@description('Lock the config file for this static web app. https://docs.microsoft.com/en-us/azure/templates/microsoft.web/staticsites?tabs=bicep#staticsite')
param allowConfigFileUpdates bool = true

@description('The name of the static site resource. eg stapp-swa-app')
param staticSiteName string

@secure()
@description('Configuration for the static site.')
param appSettings object = {}

@description('Build properties for the static site.')
param buildProperties object = {}

@allowed([
  'Disabled'
  'Enabled'
])
@description('State indicating whether staging environments are allowed or not allowed for a static web app.')
param stagingEnvironmentPolicy string = 'Enabled'

@description('Template Options for the static site. https://docs.microsoft.com/en-us/azure/templates/microsoft.web/staticsites?tabs=bicep#staticsitetemplateoptions')
param templateProperties object = {}

// https://docs.microsoft.com/en-us/azure/templates/microsoft.web/staticsites?tabs=bicep
resource staticSite 'Microsoft.Web/staticSites@2022-03-01' = {
  name: staticSiteName
  location: location
  tags: union(tags, { 'azd-service-name': 'swa' })
  sku: sku
  properties: {
    provider: 'Custom'
    allowConfigFileUpdates: allowConfigFileUpdates
    buildProperties: empty(buildProperties) ? null : buildProperties
    stagingEnvironmentPolicy: stagingEnvironmentPolicy
    templateProperties: empty(templateProperties) ? null : templateProperties
  }
}

resource staticSiteAppsettings 'Microsoft.Web/staticSites/config@2022-03-01' = {
  parent: staticSite
  name: 'appsettings'
  kind: 'config'
  properties: appSettings
}

output url string = staticSite.properties.defaultHostname
output siteName string = staticSite.name
output siteResourceId string = staticSite.id
