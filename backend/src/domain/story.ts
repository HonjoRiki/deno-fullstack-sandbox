export interface StoryText {
    id: number;
    content: string;
};

export interface StoryTextRepository {
    getAll: () => Promise<readonly StoryText[]>;
};

export type GetStories = () => Promise<readonly StoryText[]>;

