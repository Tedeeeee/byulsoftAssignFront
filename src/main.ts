import './assets/main.css';

import { createApp } from 'vue';
import { Quasar, SessionStorage, Notify } from 'quasar';
import { createPinia } from 'pinia';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Quasar, {
  plugins: {
    SessionStorage,
    Notify,
  },
});

app.mount('#q-app');
