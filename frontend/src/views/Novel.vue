<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useStory } from "../composables/useStory";

const { currentStory, next, loadStories, isEnd } = useStory();

onMounted(loadStories);

watch(currentStory, (newVal) => {
  console.log("データが届きました:", newVal);
});
</script>

<template>
  <div class="novel-container" @click="next">
    <div v-if="currentStory" class="message-box">
      <p>{{ currentStory.content }}</p>
      <span v-if="!isEnd" class="cursor">▼</span>
    </div>
  </div>
</template>

<style scoped>
.novel-container {
  width: 100vw;
  height: 100vh;
  background: #222;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 50px;
}
.message-box {
  width: 80%;
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #fff;
  color: #fff;
  font-size: 1.2rem;
  min-height: 100px;
  cursor: pointer;
}
</style>