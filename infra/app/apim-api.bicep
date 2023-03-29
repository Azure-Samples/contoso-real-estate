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

@description('Resource name for backend Web App or Function App')
param apiAppName string = ''

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
    value: loadTextContent('openapi.yaml')
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

resource apimService 'Microsoft.ApiManagement/service@2021-08-01' existing = {
  name: name
}

// Necessary due to https://github.com/Azure/bicep/issues/9594
// placeholderName is never deployed, it is merely used to make the child name validation pass
var appNameForBicep = !empty(apiAppName) ? apiAppName : 'placeholderName'

resource apiAppProperties 'Microsoft.Web/sites/config@2022-03-01' = if (!empty(apiAppName)) {
  name: '${appNameForBicep}/web'
  kind: 'string'
  properties: {
      apiManagementConfig: {
        id: '${apimService.id}/apis/${apiName}'
      }
  }
}

resource apimLogger 'Microsoft.ApiManagement/service/loggers@2021-12-01-preview' existing = {
  name: 'app-insights-logger'
  parent: apimService
}

output SERVICE_API_URI string = '${apimService.properties.gatewayUrl}/${apiPath}'
