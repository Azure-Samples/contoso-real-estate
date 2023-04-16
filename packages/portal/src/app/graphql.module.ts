


import { APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { NgModule } from '@angular/core';

const uri = 'http://localhost:1337/api'; // <-- GraphQL Strapi endpoint
export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({
      uri
    }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
      Apollo,
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
