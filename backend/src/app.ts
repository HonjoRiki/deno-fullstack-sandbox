import { Hono } from "hono";
import { cors } from "hono/cors";
import { ZodError } from "zod";
import { handleCalc } from "./interface/calc_handler.ts";
import { handleHistory } from "./interface/calc_history_handler.ts";
import { createKvRepository } from "./infra/kv_repository.ts";

export type Repository = ReturnType<typeof createKvRepository>;

export const createApp = (repo: Repository) => {
  const app = new Hono();

  const DENO_ENV = Deno.env.get("DENO_ENV") || "development";
  const FRONTEND_URL = Deno.env.get("FRONTEND_URL") || "http://localhost:5173";
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

  app.post("/api/calc", handleCalc(repo.save));
  app.get("/api/calc/histories", handleHistory(repo.getAll));

  return app;
};