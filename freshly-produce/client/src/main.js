import { createApp } from 'vue'
import App from './App.vue';
import router from './router'

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Menubar from 'primevue/menubar';
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';
import InputNumber from 'primevue/inputnumber';
import Steps from 'primevue/steps';
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import Menu from 'primevue/menu';
import Sidebar from 'primevue/sidebar';
import TabMenu from 'primevue/tabmenu';
import Chart from 'primevue/chart';
import TieredMenu from 'primevue/tieredmenu';
import DataView from 'primevue/dataview';
import BadgeDirective from 'primevue/badgedirective';
// import OrderList from 'primevue/orderlist';


const app = createApp(App);
app.use(router);
app.use(PrimeVue);


app.component('InputText', InputText);
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('Card', Card);
app.component('Menubar', Menubar);
app.component('Avatar', Avatar);
app.component('InputNumber', InputNumber);
app.component('Steps', Steps);
app.component('Dropdown', Dropdown);
app.component('FileUpload', FileUpload);
app.component('Menu', Menu);
app.component('Sidebar', Sidebar);
app.component('TabMenu', TabMenu);
app.component('Chart', Chart);
app.component('TieredMenu', TieredMenu);
app.component('DataView', DataView);
// app.component('OrderList', OrderList);
app.directive('badge', BadgeDirective);


app.mount('#app');

