@description('The name for your new Web PubSub instance.')
@maxLength(63)
@minLength(3)
param name string = uniqueString(resourceGroup().id)

param tags object = {}

@description('The region in which to create the new instance, defaults to the same location as the resource group.')
param location string = resourceGroup().location

@description('Unit count')
@allowed([
  1
  2
  5
  10
  20
  50
  100
])
param unitCount int = 1

@description('SKU name')
@allowed([
  'Standard_S1'
  'Free_F1'
])
param sku string = 'Free_F1'

@description('Pricing tier')
@allowed([
  'Free'
  'Standard'
])
param pricingTier string = 'Free'

// Resource definition
resource webpubsub 'Microsoft.SignalRService/webPubSub@2023-02-01' = {
  name: name
  location: location
  tags: union(tags, { 'azd-service-name': name })
  sku: {
    capacity: unitCount
    name: sku
    tier: pricingTier
  }
  identity: {
    type: 'None'
  }
  properties: {
    disableAadAuth: false
    disableLocalAuth: false
    liveTraceConfiguration: {
      categories: [
        {
          enabled: 'false'
          name: 'ConnectivityLogs'
        }
        {
          enabled: 'false'
          name: 'MessagingLogs'
        }
      ]
      enabled: 'false'
    }
    networkACLs: {
      defaultAction: 'Deny'     
      publicNetwork: {
        allow: [
          'ServerConnection'
          'ClientConnection'
          'RESTAPI'
          'Trace'
        ]
      }
    }
    publicNetworkAccess: 'Enabled'
    resourceLogConfiguration: {
      categories: [
        {
          enabled: 'true'
          name: 'ConnectivityLogs'
        }
        {
          enabled: 'true'
          name: 'MessagingLogs'
        }
      ]
    }
    tls: {
      clientCertEnabled: false
    }
  }
}

output name string = webpubsub.name
output uri string = 'https://${webpubsub.properties.hostName}'
output id string = webpubsub.id
