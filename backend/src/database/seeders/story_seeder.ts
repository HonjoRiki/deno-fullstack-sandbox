import "@std/dotenv/load";
import { StoryText } from "../../domain/story.ts";

const kvPath = Deno.env.get("DENO_KV_PATH");
if (!kvPath) {
  throw new Error("DENO_KV_PATH is not set.");
}
console.log("Using KV Path:", kvPath);

const kv = await Deno.openKv(kvPath);

const stories: StoryText[] = [
  { id: 1, content: "……ここはどこだろう？" },
  { id: 2, content: "眩しい光に目を細める。" },
  { id: 3, content: "遠くから波の音が聞こえてくる。" },
];

console.log("Seeding started...");

for (const story of stories) {
  // RepositoryのgetAllで ["story"] プレフィックスを使っているので合わせる
  await kv.set(["story", story.id], story);
  console.log(`Saved: [${story.id}]`);
}

console.log("Seeding complete.");
kv.close();
