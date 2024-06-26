param clusterName string

@description('The agent pool name')
param name string

@description('The agent pool configuration')
param config object

resource aksCluster 'Microsoft.ContainerService/managedClusters@2024-03-02-preview' existing = {
  name: clusterName
}

resource nodePool 'Microsoft.ContainerService/managedClusters/agentPools@2024-03-02-preview' = {
  parent: aksCluster
  name: name
  properties: config
}
