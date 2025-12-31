<script setup lang="ts">
import Card from 'primevue/card';
import Button from 'primevue/button';
import denoLogo from '../assets/deno.svg';
import Tag from 'primevue/tag';
</script>

<template>
  <div class="home-container">
    <section class="hero-section">
      <img :src="denoLogo" class="logo floating" alt="Deno logo" />
      <h1 class="title">Fullstack Sandbox</h1>
      <p class="subtitle">Deno 2.0 × Hono × Vue 3 実験場</p>
      
      <div class="tech-tags">
        <Tag value="Deno 2.0" severity="contrast" />
        <Tag value="Hono" severity="warn" />
        <Tag value="Vue 3" severity="success" />
        <Tag value="PrimeVue" severity="info" />
      </div>
    </section>

    <div class="grid-content">
      <Card class="feature-card">
        <template #title>🧮 Calculator App</template>
        <template #content>
          <p>Hono + Deno を利用したフルスタック計算機。現在はメモリ上にしか履歴を残していませんが、いずれDB保存にします。</p>
        </template>
        <template #footer>
          <router-link to="/calc" class="no-underline">
            <Button label="アプリを起動する" icon="pi pi-arrow-right" fluid raised />
          </router-link>
        </template>
      </Card>

      <Card class="feature-card">
        <template #title>🛠️ Architecture</template>
        <template #content>
          <ul class="feature-list">
            <li><i class="pi pi-check-circle"></i> <b>Frontend:</b> Vite + PrimeVue 4</li>
            <li><i class="pi pi-check-circle"></i> <b>Backend:</b> Hono (Deno 2.0)</li>
            <li><i class="pi pi-check-circle"></i> <b>Database:</b> none </li>
            <li><i class="pi pi-check-circle"></i> <b>DevOps:</b> Docker Compose</li>
          </ul>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding-bottom: 4rem;
}

.hero-section {
  text-align: center;
  padding: 4rem 1rem;
}

.logo {
  height: 120px;
  margin-bottom: 1.5rem;
}

/* ふわふわ浮くアニメーション */
.floating {
  animation: float 3s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.title {
  font-size: 3rem;
  font-weight: 900;
  margin: 0;
  background: linear-gradient(to right, var(--p-primary-color), #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.25rem;
  opacity: 0.7;
  margin-top: 0.5rem;
}

.tech-tags {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.grid-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 900px;
}

.feature-card {
  border-radius: 1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.feature-list {
  list-style: none;
  padding: 0;
  line-height: 2;
}

.feature-list i {
  color: var(--p-primary-color);
  margin-right: 0.5rem;
}

.no-underline {
  text-decoration: none;
}
</style>