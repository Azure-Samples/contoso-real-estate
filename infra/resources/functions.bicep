@description('Resource tags.')
param tags object

@description('Resource location.')
param location string

@description('The name of the Azure Function App account. e.g. func-demo')
param funcAppName string

@description('The name of the App Service Plan account. e.g. plan-demo')
param serverFarmName string

@secure()
@description('Configuration for the static site.')
param appSettings object = {}

resource appServicePlan 'Microsoft.Web/serverfarms@2021-03-01' = {
  name: serverFarmName
  location: location
  tags: tags
  sku: {
    name: 'Y1'
    tier: 'Dynamic'
    size: 'Y1'
    family: 'Y'
  }
  kind: 'functionapp'
  properties: {
    reserved: true
  }
}

resource api 'Microsoft.Web/sites@2022-03-01' = {
  name: funcAppName
  location: location
  tags: union(tags,  {  'azd-service-name': 'api'  })
  kind: 'functionapp,linux'
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      numberOfWorkers: 1
      linuxFxVersion: 'NODE|16'
      functionAppScaleLimit: 200
      minimumElasticInstanceCount: 0
      ftpsState: 'FtpsOnly'
      minTlsVersion: '1.2'
      use32BitWorkerProcess: false
      cors: {
        allowedOrigins: [
          'https://ms.portal.azure.com'
        ]
      }
    }
    clientAffinityEnabled: false
    httpsOnly: true
  }

  identity: {
    type: 'SystemAssigned'
  }
}

resource apiAppLogs 'Microsoft.Web/sites/config@2022-03-01' = {
  name: 'logs'
  parent: api
  properties: {
    applicationLogs: {
      fileSystem: {
        level: 'Verbose'
      }
    }
    detailedErrorMessages: {
      enabled: true
    }
    failedRequestsTracing: {
      enabled: true
    }
    httpLogs: {
      fileSystem: {
        enabled: true
        retentionInDays: 1
        retentionInMb: 35
      }
    }
  }
}

resource apiAppSettings 'Microsoft.Web/sites/config@2022-03-01' = {
  parent: api
  name: 'appsettings'
  kind: 'string'
  properties: appSettings
}
