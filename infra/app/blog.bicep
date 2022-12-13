param environmentName string
param location string = resourceGroup().location
param applicationInsightsName string = ''
param serviceName string = 'blog'
param cmsUrl string

module web '../core/host/staticwebapps.bicep' = {
  name: 'static-sites-resources-${serviceName}'
  params: {
    environmentName: environmentName
    location: location
    serviceName: serviceName
    applicationInsightsName: applicationInsightsName
    additionalAppSettings: {
      NEXT_PUBLIC_STRAPI_API_URL: cmsUrl
    }
  }
}

output WEB_BLOG_NAME string = web.name
output WEB_BLOG_URI string = web.outputs.uri
