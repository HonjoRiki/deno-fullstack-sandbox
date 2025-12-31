import { createApp } from 'vue';
import App from './App.vue';
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import router from './router';

import "primeicons/primeicons.css";

const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark',
        }
    }
})
app.mount('#app');
