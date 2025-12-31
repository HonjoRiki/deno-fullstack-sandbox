import { Hono } from "npm:hono@4.11.3";

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

const history: Array<{
    id: number,
    formula: string,
    date: string,
}> = [];

app.get("/api/history", (c) => {
    return c.json(history);
});

app.post("/api/history", async (c) => {
    const body = await c.req.json();
    const newEntry = {
        id: Date.now(),
        formula: body.formula,
        date: new Date().toISOString(),
    };
    history.unshift(newEntry);
    return c.json({
        success: true,
        entry: newEntry,
    });
});

Deno.serve({ port: 8000 }, app.fetch);
