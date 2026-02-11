import { GetStories } from "../domain/story.ts";

export const novelUsecase = async (
    getFn: GetStories,
) => {
    return await getFn();
};
