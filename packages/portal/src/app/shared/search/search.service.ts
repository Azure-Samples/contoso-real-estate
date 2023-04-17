import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

export interface SearchResult {
  result: Listing
}

const GetResults = gql`
query getResults($term: String!) {
  listings(filters: {or: [{title: {contains: $term}}, {description: {contains: $term}}]}) {
    data {
      attributes {
        title
        description
      }
    }
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private apollo: Apollo
  ) {}

  getResults = (term: string) => {
    // eslint-disable-next-line no-debugger
    debugger;
    return this.apollo.query<SearchResult>({
      query: GetResults,
      variables: {
        term
      }
    });
  }
}
