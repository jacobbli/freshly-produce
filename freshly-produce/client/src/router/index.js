import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import RoleSelectionForm from '../components/login-component/RoleSelectionForm.vue'
import LoginForm from '../components/login-component/LoginForm.vue'
import MyDetail from '../components/profile-component/MyDetail.vue'
import MySubscription from '../components/profile-component/MySubscription.vue'
import SubscriptionCreationPage from '../views/SubscriptionCreationPage.vue'
import SubscriptionCreationForm from '../components/subscription-component/SubscriptionCreationForm.vue'
import FrequencySelectionForm from '../components/subscription-component/FrequencySelectionForm.vue'
import ProductDescriptionForm from '../components/subscription-component/ProductDescriptionForm.vue'

const routes = [
  {
    path: '/home',
    alias: '/',
    name: 'Home',
    component: HomePage,
  },
  
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    children:[
      {
        path: '/mydetail',
        name: 'MyDetail',
        component: MyDetail
      },
      {
        path: '/mysubscription',
        name: 'MySubscription',
        component: MySubscription
      },
    ]
  },
  {
    path: '/subscription',
    name: 'SubscriptionCreationPage',
    component: SubscriptionCreationPage,
    children: [
      {
        path: 'create',
        name: 'SubscriptionCreationForm',
        component: SubscriptionCreationForm
      },
      {
        path: 'frequency',
        name: 'FrequencySelectionForm',
        component: FrequencySelectionForm
      },
      {
        path: 'product',
        name: 'ProductDescriptionForm',
        component: ProductDescriptionForm
      },
    ]
  },
  {
    path: '/login',
    component: LoginPage,
    children: [
      {
        path: '/login',
        name: 'RoleSelectionForm',
        component: RoleSelectionForm
      },
      {
        path: 'auth',
        name: 'LoginForm',
        component: LoginForm
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
