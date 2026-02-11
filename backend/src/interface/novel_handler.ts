import { Context } from "hono";
import { GetStories } from "../domain/story.ts";

export const handleNovel = (getFn: GetStories) => async (c: Context) => {
    try {
        const stories = await getFn();
        return c.json(stories);
    } catch (e) {
        return c.json({error: e instanceof Error ? e.message : "Internal server error."}, 500);
    }
};
