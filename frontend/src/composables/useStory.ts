import { ref, computed } from "vue";
import { Story } from "../types/story.ts";
import { storyRepository } from "../repositories/storyRepository.ts";

export function useStory() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
    const repo = storyRepository(API_BASE_URL);
    const stories = ref<Story[]>([]);
    const currentIndex = ref(0);

    const currentStory = computed(() => stories.value[currentIndex.value]);
    const isEnd = computed(() => currentIndex.value >= stories.value.length - 1);

    const loadStories = async () => {
        stories.value = await repo.fetchAll();
    };

    const next = () => {
        if (!isEnd.value) currentIndex.value++;
    };

    return { currentStory, next, loadStories, isEnd };
}