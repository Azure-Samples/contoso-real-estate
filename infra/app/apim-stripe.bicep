param name string

@description('Resource name to uniquely identify this API within the API Management service instance')
@minLength(1)
param apiName string

@description('The Display Name of the API')
@minLength(1)
@maxLength(300)
param apiDisplayName string

@description('Description of the API. May include HTML formatting tags.')
@minLength(1)
param apiDescription string

@description('Relative URL uniquely identifying this API and all of its resource paths within the API Management service instance. It is appended to the API endpoint base URL specified during the service instance creation to form a public URL for this API.')
@minLength(1)
param apiPath string

@description('Absolute URL of the web frontend')
param webFrontendUrl string

@description('Absolute URL of the backend service implementing this API.')
param apiBackendUrl string

var apiPolicyContent = replace(loadTextContent('apim-api-policy.xml'), '{origin}', webFrontendUrl)

resource restApi 'Microsoft.ApiManagement/service/apis@2021-12-01-preview' = {
  name: apiName
  parent: apimService
  properties: {
    description: apiDescription
    displayName: apiDisplayName
    path: apiPath
    protocols: [ 'https' ]
    subscriptionRequired: false
    type: 'http'
    format: 'openapi'
    serviceUrl: apiBackendUrl
    value: loadTextContent('../../packages/stripe/openapi.yaml')
  }
}

resource apiPolicy 'Microsoft.ApiManagement/service/apis/policies@2021-12-01-preview' = {
  name: 'policy'
  parent: restApi
  properties: {
    format: 'rawxml'
    value: apiPolicyContent
  }
}

resource apiDiagnostics 'Microsoft.ApiManagement/service/apis/diagnostics@2021-12-01-preview' = {
  name: 'applicationinsights'
  parent: restApi
  properties: {
    alwaysLog: 'allErrors'
    backend: {
      request: {
        body: {
          bytes: 1024
        }
      }
      response: {
        body: {
          bytes: 1024
        }
      }
    }
    frontend: {
      request: {
        body: {
          bytes: 1024
        }
      }
      response: {
        body: {
          bytes: 1024
        }
      }
    }
    httpCorrelationProtocol: 'W3C'
    logClientIp: true
    loggerId: apimLogger.id
    metrics: true
    sampling: {
      percentage: 100
      samplingType: 'fixed'
    }
    verbosity: 'verbose'
  }
}

resource apimProduct 'Microsoft.ApiManagement/service/products@2022-08-01' = {
  name: 'apim-product'
  parent: apimService
  properties: {
    description: 'Contoso public APIs'
    displayName: 'Contoso public APIs'
    state: 'published'
    subscriptionRequired: false
  }
}

resource apimService 'Microsoft.ApiManagement/service@2021-08-01' existing = {
  name: name
}

resource apimLogger 'Microsoft.ApiManagement/service/loggers@2021-12-01-preview' existing = {
  name: 'app-insights-logger'
  parent: apimService
}
