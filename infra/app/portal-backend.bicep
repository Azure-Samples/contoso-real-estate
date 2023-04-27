param name string
param location string = resourceGroup().location
param tags object = {}
param useAPIM bool
param portalName string
param apiServiceName string

resource portalApimProperties 'Microsoft.Web/staticSites/linkedBackends@2022-03-01' = {
  parent: portal
  name: name

  #disable-next-line BCP187
  location: location

  #disable-next-line BCP187
  tags: tags
  properties: {
    backendResourceId: useAPIM ? apimService.id : apiService.id
    region: useAPIM ? null : location // backend region is mandatory for linked Function Apps
  }
}

resource portal 'Microsoft.Web/staticSites@2022-03-01' existing = {
  name: portalName
}

resource apimService 'Microsoft.ApiManagement/service@2021-08-01' existing = {
  name: name
}

resource apiService 'Microsoft.Web/sites@2022-09-01' existing = {
  name: apiServiceName
}
