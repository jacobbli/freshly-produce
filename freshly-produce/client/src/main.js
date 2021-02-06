import { createApp } from 'vue'

import App from './App.vue';
import router from './router'
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css

import Dialog from 'primevue/dialog';
import Menubar from 'primevue/menubar';
import Card from 'primevue/card';

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
// createApp(App).mount('#app')
app.component('InputText', InputText);

app.component('Dialog', Dialog);
app.component('Card', Card);
app.component('Menubar', Menubar);

app.mount('#app');

