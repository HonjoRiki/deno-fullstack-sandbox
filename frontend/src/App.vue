<script setup lang="ts">
import { ref } from 'vue';
import Menubar from 'primevue/menubar';


const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        to: '/'
    },
    {
        label: 'Calculator',
        icon: 'pi pi-calculator',
        to: '/calc'
    }
]);
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <Menubar :model="items" class="custom-menubar">
        <template #start>
          <div class="branding">
            <img src="./assets/deno.svg" width="32" height="32" alt="Logo" />
            <span class="logo-text">Deno Fullstack Sandbox</span>
          </div>
        </template>
        
        <template #item="{ item, props }">
          <router-link v-if="item.to" :to="item.to" v-bind="props.action" class="menu-item-link">
            <span :class="item.icon" />
            <span class="menu-label">{{ item.label }}</span>
          </router-link>
        </template>

        <template #end>
          <div class="socials">
            <a 
            href="https://github.com/HonjoRiki/deno-fullstack-sandbox" 
            target="_blank" 
            rel="noopener noreferrer"
            class="github-link"
            >
              <i class="pi pi-github"></i>
            </a>
          </div>
        </template>
      </Menubar>
    </header>

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <footer class="app-footer">
      <p>&copy; 2026 KEEL Games.</p>
    </footer>
  </div>
</template>

<style>
/* 全体のフォントと背景の設定（App.vueで一括管理） */
body {
  margin: 0;
  font-family: var(--p-font-family);
  background-color: var(--p-content-background);
  color: var(--p-text-color);
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0.5rem 1rem;
  background: color-mix(in srgb, var(--p-content-background), transparent 20%);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--p-content-border-color);
}

.custom-menubar {
  border: none !important;
  background: transparent !important;
}

.branding {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.5rem;
}

.logo-text {
  font-weight: 800;
  font-size: 1.2rem;
  /* ちょっとしたグラデーションで高級感を */
  background: linear-gradient(to right, var(--p-primary-color), #ec4899);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.menu-item-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 0.5rem 0.75rem;
}

.menu-label {
  margin-left: 0.5rem;
}

.socials {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.github-link {
  text-decoration: none;
  color: inherit;
  font-size: 1.25rem;
  transition: color 0.2s;
}

.github-link:hover {
  color: var(--p-primary-color);
}

.main-content {
  flex: 1;
  padding: 2rem;
}

.app-footer {
  text-align: center;
  padding: 2rem;
  font-size: 0.8rem;
  opacity: 0.5;
  border-top: 1px solid var(--p-content-border-color);
}

/* ページ切り替え時のフェードアニメーション */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
