import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { pgQuery } from "../config/pgclient";

// GET Listings By ID
export async function getListingById(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function getListingById processed request for url "${request.url}"`);

  try {
    const id = request.params.id;

    if (!id) {
      return {
        status: 400,
        jsonBody: {
          error: "Parameter 'id' is missing in /listings/{id}",
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
  } catch (error: unknown) {
    const err = error as Error;
    context.error(`Error...: ${err.message}`);
    return {
      status: 500,
      jsonBody: {
        error: "Internal Server Error",
      },
    };
  }
}

// GET Listings
export async function getListings(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function getListings processed request for url "${request.url}"`);

  try {
    const offset = Number(request.query.get("offset")) || 0;
    const limit = Number(request.query.get("limit")) || 10;
    const featured = Boolean(request.query.get("featured")) === true ? "1" : "0";

    if (offset < 0) {
      return {
        status: 400,
        jsonBody: {
          error: "Offset must be greater than or equal to 0",
        },
      };
    } else if (limit < 0) {
      return {
        status: 400,
        jsonBody: {
          error: "Limit must be greater than or equal to 0",
        },
      };
    } else if (offset > limit) {
      return {
        status: 400,
        jsonBody: {
          error: "Offset must be less than or equal to limit",
        },
      };
    }

    const listingResult = await pgQuery(`SELECT * FROM listings WHERE is_featured = $3 LIMIT $1 OFFSET $2`, [
      limit,
      offset,
      featured,
    ]);

    const listing = listingResult.rows.map((row: any) => {
      row.fees = row.fees.split("|");
      row.photos = row.photos.split("|");
      row.address = row.address.split("|");
      row.ammenities = row.ammenities.split(",");

      return row;
    });

    return {
      status: 200,
      jsonBody: listing,
    };
  } catch (error: unknown) {
    const err = error as Error;
    context.error(`Error...: ${err.message}`);
    return {
      status: 500,
      jsonBody: {
        error: "Internal Server Error",
      },
    };
  }
}
