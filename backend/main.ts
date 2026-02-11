import "@std/dotenv/load";
import { createKvRepository } from "./src/infra/kv_repository.ts";
import { createApp } from "./src/app.ts";
import { createKvStoryTextRepository } from "./src/infra/kv_story_text_repository.ts";

const PORT = Number(Deno.env.get("PORT")) || 8000;

// 本番/開発用のKVを開く
const kv = await Deno.openKv(Deno.env.get("DENO_KV_PATH"));
const repo = createKvRepository(kv);
const storyRepo = createKvStoryTextRepository(kv);

const app = createApp(repo, storyRepo);
Deno.serve({ port: PORT }, app.fetch);
