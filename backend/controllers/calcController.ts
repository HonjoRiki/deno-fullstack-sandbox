import type { Context } from "npm:hono@4.11.3";
import { findAll, create } from "../domains/calc/history.ts";

export const getHistory = (c: Context) => {
    return c.json(findAll());
};

export const createHistory = async (c: Context) => {
    const body = await c.req.json();
    const newEntry = create(body.formula);
    return c.json({
        success: true,
        entry: newEntry,
    });
};
