import "@std/dotenv/load";
import { createKvRepository } from "./src/infra/kv_repository.ts";
import { createApp } from "./src/app.ts";

const PORT = Number(Deno.env.get("PORT")) || 8000;

// 本番/開発用のKVを開く
const kv = await Deno.openKv();
const repo = createKvRepository(kv);

const app = createApp(repo);
Deno.serve({ port: PORT }, app.fetch);
