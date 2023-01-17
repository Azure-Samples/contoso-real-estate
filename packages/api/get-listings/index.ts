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

        const result = await client.query(`SELECT * FROM LISTING WHERE isFeatured = ${featured} LIMIT ${limit} OFFSET ${offset}`);
        await client.end();
        context.res = {
            status: 200,
            body: result.rows
        };
    } catch (err) {
        context.log.error('Error:', err);
        context.res = {
            status: 500,
            body: 'An error occurred while processing the request'
        };
    }
}