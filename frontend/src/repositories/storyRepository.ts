import { Story } from "../types/story.ts";

export const storyRepository = (baseUrl: string) => {
    return {
        async fetchAll(): Promise<Story[]> {
            const res = await fetch(`${baseUrl}/api/novel`);
            if (!res.ok) throw new Error("Failed to fetch stories");
            const json = await res.json();
            console.log("json: ", json);
            return json;
        }
    }
};
