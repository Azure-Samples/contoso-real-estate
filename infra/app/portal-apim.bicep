param name string
param location string = resourceGroup().location
param tags object = {}
param useAPIM bool
param portalName string

resource portalApimProperties 'Microsoft.Web/staticSites/linkedBackends@2022-03-01' = if (useAPIM) {
  parent: portal
  name: name

  #disable-next-line BCP187
  location: location

  #disable-next-line BCP187
  tags: tags
  properties: {
    backendResourceId: apimService.id
  }
}

resource portal 'Microsoft.Web/staticSites@2022-03-01' existing = if (useAPIM) {
  name: portalName
}

resource apimService 'Microsoft.ApiManagement/service@2021-08-01' existing = if (useAPIM) {
  name: name
}
