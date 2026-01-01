import { Hono } from "npm:hono@4.11.3";
import { getHistory, createHistory, calculateAndSave } from "../controllers/calcController.ts";

const app = new Hono();

app.post("/", calculateAndSave);
app.get("/history", getHistory);
app.post("/history", createHistory);

export default app;