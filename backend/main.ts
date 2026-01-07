import "jsr:@std/dotenv@0.225.6/load";
import { Hono } from "npm:hono@4.11.3";
import { cors } from "npm:hono@4.11.3/cors";
import { ZodError } from "npm:zod@4.3.4";
import { handleCalc } from "./src/interface/calc_handler.ts";
import { createKvRepository } from "./src/infra/kv_repository.ts";
import { handleHistory } from "./src/interface/calc_history_handler.ts";

const app = new Hono();

const DENO_ENV = Deno.env.get("DENO_ENV") || "development";
const FRONTEND_URL = Deno.env.get("FRONTEND_URL") || "http://localhost:5173";
const PORT = Number(Deno.env.get("PORT")) || 8000;
const ALLOWED_METHODS = Deno.env.get("ALLOWED_METHODS") || "GET, POST, PUT, DELETE, OPTIONS";
const ALLOWED_HEADERS = Deno.env.get("ALLOWED_HEADERS") || "Content-Type, Authorization";
const MAX_AGE = Deno.env.get("MAX_AGE") || "86400";

app.use("*", cors({
    origin: (origin) => {
        if (DENO_ENV === "development") {
            return origin;
        }
        return FRONTEND_URL;
    },
    allowMethods: ALLOWED_METHODS.split(",").map((m) => m.trim()),
    allowHeaders: ALLOWED_HEADERS.split(",").map((h) => h.trim()),
    maxAge: Number(MAX_AGE),
}));

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

const kv = await Deno.openKv();
const repo = createKvRepository(kv);

app.post("/api/calc", handleCalc(repo.save));
app.get("/api/calc/histories", handleHistory(repo.getAll));

Deno.serve({ port: PORT }, app.fetch);
