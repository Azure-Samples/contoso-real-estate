import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { pgQuery } from "../config/pgclient";

const getListings: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  try {
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 10;
    const featured = Boolean(req.query.featured) === true ? '1' : '0';

    if (offset < 0) {
      context.res = {
        status: 400,
        body: {
          error: "Offset must be greater than or equal to 0",
        },
      };
      return;
    } else if (limit < 0) {
      context.res = {
        status: 400,
        body: {
          error: "Limit must be greater than or equal to 0",
        },
      };
      return;
    } else if (offset > limit) {
      context.res = {
        status: 400,
        body: {
          error: "Offset must be less than or equal to limit",
        },
      };
      return;
    }

    const result = await pgQuery(`SELECT * FROM listings WHERE is_featured = $3 LIMIT $1 OFFSET $2`, [limit, offset, featured]);

    const listing = result.rows.map((row: any) => {
      row.fees = row.fees.split("|");
      row.photos = row.photos.split("|");
      row.address = row.address.split("|");
      row.ammenities = row.ammenities.split(",");
      return row;
    });
    context.res = {
      status: 200,
      body: listing,
    };
  } catch (err) {
    context.log.error("Error:", err);
    context.res = {
      status: 500,
      body: "An error occurred while processing the request",
    };
  }
}

export default getListings;