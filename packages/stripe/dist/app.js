import path from 'path';
import { join } from 'path';
import { fileURLToPath } from 'url';
import AutoLoad from '@fastify/autoload';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const options = {};
const app = async (fastify, opts) => {
    void fastify.register(AutoLoad, {
        dir: join(__dirname, 'plugins'),
        options: opts
    });
    void fastify.register(AutoLoad, {
        dir: join(__dirname, 'routes'),
        options: opts
    });
};
export default app;
export { app, options };
//# sourceMappingURL=app.js.map