import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
  import { TracingInstrumentation } from '@grafana/faro-web-tracing';

  initializeFaro({
    url: 'https://faro-collector-prod-eu-west-2.grafana.net/collect/244e157abc7d48c8433562ed71321327',
    app: {
      name: 'Frontend-marketing-app',
      version: '1.0.0',
      environment: 'production'
    },
    
    instrumentations: [
      // Mandatory, omits default instrumentations otherwise.
      ...getWebInstrumentations(),

      // Tracing package to get end-to-end visibility for HTTP requests.
      new TracingInstrumentation(),
    ],
  });
import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { ROUTES } from "./app-routing";
import { provideApollo } from "./core/apollo/provide-apollo";
import { provideUser } from "./core/user/provide-user";

export const appConfig: ApplicationConfig = {
  providers: [
    provideApollo(),
    provideRouter(ROUTES, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimations(),
    provideUser(),
  ],
};
