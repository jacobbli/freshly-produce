import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Button from 'primevue/button';

const app = createApp(App);
app.use(router);
app.use(PrimeVue);

app.component('InputText', InputText);
app.component('Card', Card);
app.component('Button', Button);

app.mount('#app')