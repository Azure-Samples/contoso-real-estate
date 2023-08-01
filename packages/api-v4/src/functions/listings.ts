import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { pgQuery } from "../config/pgclient";

export async function getListingById(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function getListingById processed request for url "${request.url}"`);

  try {
    const id = request.params.id;

    if (!id) {
      return {
        status: 400,
        jsonBody: {
          error: "Parameter 'id' is missing in /listings/{id}"
        },
      };
    }

    const listingResults = await pgQuery(`SELECT * FROM listings WHERE id = $1 LIMIT 1`, [id]);

    if (listingResults.rowCount === 0) {
      return {
        status: 404,
        jsonBody: {
          error: "Listing not found",
        },
      };
    }

    const listing = listingResults.rows[0];

    listing.fees = listing.fees.split("|");
    listing.photos = listing.photos.split("|");
    listing.address = listing.address.split("|");
    listing.ammenities = listing.ammenities.split("|");

    return {
      status: 200,
      jsonBody: listing,
    };
  } catch (error) {
    return {
      status: 500,
      jsonBody: {
        error: 'Internal Server Error',
      },
    };
  }
};


