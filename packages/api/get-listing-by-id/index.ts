import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { pgQuery } from "../config/pgclient";

const getListingById: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    const id = req.params.id;

    if (!id) {
      context.res = {
        status: 400,
        body: {
          error: "Parameter 'id' is missing in /listings/{id}",
        },
      };
      return;
    }

    const results = await pgQuery(`SELECT * FROM listings WHERE id = $1 LIMIT 1`, [id]);

    if (results.rowCount === 0) {
      context.res = {
        status: 404,
        body: {
          error: "Listing not found",
        },
      };
      return;
    }

    const listing = results.rows[0];
    listing.fees = listing.fees.split("|");
    listing.photos = listing.photos.split("|");
    listing.address = listing.address.split("|");
    listing.ammenities = listing.ammenities.split(",");

    context.res = {
      status: 200,
      body: listing,
    };
  } catch (err) {
    context.log.error("Error:", err);
    context.res = {
      status: 500,
      body: {
        error: "Internal Server Error",
      },
    };
  }
};

export default getListingById;
