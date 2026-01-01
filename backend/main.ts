import { Hono } from "npm:hono@4.11.3";
import { ZodError } from "npm:zod@4.3.4";
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

app.onError((err, c) => {
    if (err instanceof ZodError) {
        const issues = err.issues.map((i) => i.message);
        return c.json({
            success: false,
            error: issues.join(" / "),
            issues: issues
        }, 400);
    }
    return c.json({ success: false, message: err.message }, 500);
});

app.route("/api/calc", calc);

Deno.serve({ port: 8000 }, app.fetch);
