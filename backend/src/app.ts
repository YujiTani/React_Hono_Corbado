import type { Hono as HonoApplication } from "hono";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { logger } from "hono/logger";
import { compress } from "hono/compress";
import { authenticationMiddleware } from "./middleware/auth.js";
import indexRoutes from "./routes/index.js";
import { cors } from "hono/cors";

class App {
    public readonly app: HonoApplication;

    constructor() {
        this.app = new Hono();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    public listen() {
        const port = Number(process.env.PORT) || 3001;
        const backendUrl = process.env.NODE_ENV === 'development'
            ? `http://localhost:${port}`
            : process.env.BACKEND_URL;

        if (!backendUrl) {
            throw new Error('BACKEND_URL must be set in production environment');
        }

        console.log(`Server is running on ${backendUrl}`);
        
        serve({
            fetch: this.app.fetch,
            port,
        });
    }

    private initializeMiddlewares() {
        const corsOrigin = process.env.NODE_ENV === 'development'
            ? "http://localhost:3000"
            : process.env.FRONTEND_URL;

        if (!corsOrigin) {
            throw new Error('FRONTEND_URL must be set in production environment');
        }

        this.app.use(logger());
        this.app.use(compress());
        this.app.use(
            cors({
                origin: corsOrigin,
                credentials: true,
            }),
        );
        this.app.use(authenticationMiddleware);
    }

    private initializeRoutes() {
        this.app.route("/", indexRoutes);
    }
}

export default new App();
