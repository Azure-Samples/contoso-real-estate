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
    return this.apollo.watchQuery<SearchResult>({
      query: GetResults,
      variables: {
        term: term
      }
    }).valueChanges;
  }
}
