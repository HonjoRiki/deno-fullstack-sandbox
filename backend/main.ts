import { Hono } from "npm:hono@4.11.3";
import calc from "./routes/calc.ts";

const app = new Hono();

app.all("*", async (c, next) => {
    await next();
    c.res.headers.set("Access-Control-Allow-Origin", "http://localhost:5173");
    c.res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    c.res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    c.res.headers.set("Access-Control-Max-Age", "86400");
});

app.options("*", () => {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:5173",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        },
    });
});

app.route("/api/calc", calc);

Deno.serve({ port: 8000 }, app.fetch);
