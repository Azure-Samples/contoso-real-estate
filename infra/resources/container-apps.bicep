@description('Resource tags.')
param tags object

@description('Resource location.')
param location string

@description('The name of the Container App environment. e.g. ca-demo')
param environmentName string

@description('The Log Analytics workspace name to which the Container App environment will be connected.')
param logAnalyticsWorkspaceId string

resource environment 'Microsoft.App/managedEnvironments@2022-03-01' = {
  name: environmentName
  location: location
  tags: tags
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: reference(logAnalyticsWorkspaceId, '2020-03-01-preview').customerId
        sharedKey: listKeys(logAnalyticsWorkspaceId, '2020-03-01-preview').primarySharedKey
      }
    }
  }
}

resource nginxcontainerapp 'Microsoft.App/containerApps@2022-03-01' = {
  name: 'nginx'
  location: location
  tags: tags
  properties: {
    managedEnvironmentId: environment.id
    configuration: {
      ingress: {
        external: true
        targetPort: 80
      }
    }
    template: {
      containers: [
        {
          image: 'nginx:latest'
          name: 'nginx'
          resources: {
            cpu: '0.5'
            memory: '1.0Gi'
          }
        }
      ]
      scale: {
        minReplicas: 1
        maxReplicas: 1
      }
    }
  }
}

output url string = nginxcontainerapp.properties.configuration.ingress.fqdn
