@description('Resource tags.')
param tags object

@description('Resource location.')
param location string

@description('The name of the key vault. e.g. kv-swa-sso')
param keyVaultName string

@description('The principalId of the managed identity.')
param principalId string

@description('The SKU for the key vault.')
param sku object = {
  family: 'A'
  name: 'standard'
}

@description('Tenant id for the subscription.')
param tenantId string = subscription().tenantId

@secure()
@description('Database connection string.')
param databaseConnectionString string

@description('Enables soft delete.')
param enableSoftDelete bool = true

@description('Soft delete retention period.')
param softDeleteRetentionInDays int =  7

resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' = {
  name: keyVaultName
  location: location
  tags: tags
  properties: {
    tenantId: tenantId
    sku: sku
    enabledForTemplateDeployment: true
    enableRbacAuthorization: true
    enableSoftDelete: enableSoftDelete
    softDeleteRetentionInDays: softDeleteRetentionInDays
    accessPolicies: concat([
        {
          objectId: principalId
          permissions: {
            secrets: [
              'get'
              'list'
            ]
          }
          tenantId: tenantId
        }
      ], !empty(principalId) ? [
        {
          objectId: principalId
          permissions: {
            secrets: [
              'get'
              'list'
            ]
          }
          tenantId: tenantId
        }
      ] : [])
  }

  resource cosmosConnectionString 'secrets' = {
    name: 'AZURE-COSMOS-CONNECTION-STRING'
    properties: {
      value: databaseConnectionString
    }
  }
}

output keyVaultName string = keyVault.name
output keyVaultResourceId string = keyVault.id
output keyVaultEndpoint string = keyVault.properties.vaultUri
