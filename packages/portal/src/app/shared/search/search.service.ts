import { Injectable, inject } from "@angular/core";
import { Apollo, gql } from "apollo-angular";

// this is the most basic query to search for listings
// filtering will need to be added
const GetResults = gql`
  query getResults($term: String!) {
    listings(filters: { or: [{ title: { contains: $term } }, { description: { contains: $term } }] }) {
      data {
        id
        attributes {
          title
          description
          photos
          address
          bedrooms
          bathrooms
          ammenities
          slug
          fees
        }
      }
    }
  }
`;

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private apollo = inject(Apollo);

  getResults = (term: string) => {
    return this.apollo.query<SearchResult>({
      query: GetResults,
      variables: {
        term,
      },
    });
  };
}
