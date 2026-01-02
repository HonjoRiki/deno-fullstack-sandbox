import "jsr:@std/dotenv@0.225.6/load";
import { Hono } from "npm:hono@4.11.3";
import { ZodError } from "npm:zod@4.3.4";
import calc from "./routes/calc.ts";

const app = new Hono();

const DENO_ENV = Deno.env.get("DENO_ENV") || "development";
const FRONTEND_URL = Deno.env.get("FRONTEND_URL") || "http://localhost:5173";
const PORT = Number(Deno.env.get("PORT")) || 8000;
const ALLOWED_METHODS = Deno.env.get("ALLOWED_METHODS") || "GET, POST, PUT, DELETE, OPTIONS";
const ALLOWED_HEADERS = Deno.env.get("ALLOWED_HEADERS") || "Content-Type, Authorization";
const MAX_AGE = Deno.env.get("MAX_AGE") || "86400";

app.all("*", async (c, next) => {
    await next();
    c.res.headers.set("Access-Control-Allow-Origin", FRONTEND_URL);
    c.res.headers.set("Access-Control-Allow-Methods", ALLOWED_METHODS);
    c.res.headers.set("Access-Control-Allow-Headers", ALLOWED_HEADERS);
    c.res.headers.set("Access-Control-Max-Age", MAX_AGE);
});

app.options("*", () => {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": FRONTEND_URL,
            "Access-Control-Allow-Methods": ALLOWED_METHODS,
            "Access-Control-Allow-Headers": ALLOWED_HEADERS
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
    const message = DENO_ENV === "production" ? "Internal Server Error" : err.message;
    return c.json({ success: false, message }, 500);
});

app.route("/api/calc", calc);

Deno.serve({ port: PORT }, app.fetch);
