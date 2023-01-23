import { pgQuery } from "../config/pgclient";

export async function getListingById(context: any, req: any) {
  try {
    const id = req.query.id || "";

    if (!id) {
      context.res = {
        status: 400,
        body: {
          error: "An id must be provided",
        },
      };
      return;
    }

    const result = await pgQuery(`SELECT * FROM LISTINGS WHERE id = $1`, [id]);

    const listing = result.rows.map(row => {
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
