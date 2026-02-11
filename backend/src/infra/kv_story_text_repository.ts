import { StoryText, StoryTextRepository } from "../domain/story.ts";

export const createKvStoryTextRepository = (kv: Deno.Kv): StoryTextRepository => {
    return {
        getAll: async (): Promise<readonly StoryText[]> => {
            const iter = kv.list<StoryText>({ prefix: ["story"] });
            const results: StoryText[] = [];
            for await (const { value } of iter) {
                results.push(value);
            }
            return results.sort((a, b) => a.id - b.id);
        }
    }
};
