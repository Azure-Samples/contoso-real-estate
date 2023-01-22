import pg from 'pg';

export async function main(context: any, req: any) {
  const connectionString = process.env['ConnectionStrings:cosmosdb'];
  context.log(connectionString, '#####connection string');
    try {
        const client = new pg.Client({
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            database: process.env.DATABASE_NAME,
            ssl: true
        });
        await client.connect();

        const offset = Number(req.query.offset) || 0;
        const limit = Number(req.query.limit) || 10;
        const featured = Boolean(req.query.featured) || false;

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

        const result = await client.query(
          `SELECT * FROM LISTING WHERE isfeatured = $1 LIMIT $2 OFFSET $3`,
          [featured, limit, offset]
        );
        const listing = result.rows.map((row: any) => {
          row.fees = row.fees.split('|');
          row.photos = row.photos.split('|');
          row.address = row.address.split('|');
          row.ammenities = row.ammenities.split(',');
          return row;
        });
        await client.end();
        context.res = {
            status: 200,
            body: listing
        };
    } catch (err) {
        context.log.error('Error:', err);
        context.res = {
            status: 500,
            body: 'An error occurred while processing the request'
        };
    }
}