@description('Resource tags.')
param tags object

@description('Resource location.')
param location string

@description('The name of the log Analytics workspace. e.g. log-demo')
param logAnalyticsName string

resource logAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2020-03-01-preview' = {
  name: logAnalyticsName
  location: location
  tags: tags
  properties: any({
    retentionInDays: 30
    features: {
      searchVersion: 1
    }
    sku: {
      name: 'PerGB2018'
    }
  })
}

output workspaceId string = logAnalyticsWorkspace.id
