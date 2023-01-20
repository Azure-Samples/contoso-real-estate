import pg from 'pg';

export async function main(context: any, req: any) {
    try {
        const client = new pg.Client({
            user: process.env.POSTGRESQL_USER,
            password: process.env.POSTGRESQL_PASSWORD,
            host: process.env.POSTGRESQL_HOST,
            port: Number(process.env.POSTGRESQL_PORT),
            database: process.env.POSTGRESQL_DATABASE,
            ssl: true
        });
        await client.connect();

        const slug = req.query.slug || '';

        if (!slug || slug.length < 0) {
          context.res = {
            status: 400,
            body: {
              error: "You must query a valid slug",
            },
          };
          return;
        }

        const result = await client.query(
          `SELECT * FROM LISTING WHERE slug = $1`,
          [slug]
        );
        const listing = result.rows.map((row) => {
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