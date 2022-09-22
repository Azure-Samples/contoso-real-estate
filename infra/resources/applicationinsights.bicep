@description('Resource tags.')
param tags object

@description('Resource location.')
param location string

@description('The name of the Application Insights component.')
param applicationInsightsName string

@description('The Log Analytics workspace name to which the Container App environment will be connected.')
param logAnalyticsWorkspaceId string

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: applicationInsightsName
  location: location
  tags: tags
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalyticsWorkspaceId
  }
}

output ConnectionString string = applicationInsights.properties.ConnectionString
output InstrumentationKey string = applicationInsights.properties.InstrumentationKey
