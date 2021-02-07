import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RoleSelectionForm from '../components/login-component/RoleSelectionForm.vue'
import LoginForm from '../components/login-component/LoginForm.vue'
import CustomerSubscriptionsPage from '../views/CustomerSubscriptionsPage.vue'
import AvailableSubscriptionsPage from '../views/AvailableSubscriptionsPage.vue'

const routes = [
  {
    path: '/home',
    alias: '/',
    name: 'Home',
    component: HomePage,
    children: [
      {
        path: 'my-subscriptions',
        name: 'AvailableSubscriptionsPage',
        component: AvailableSubscriptionsPage
      },
      {
        path: 'available-subscriptions',
        name: 'CustomerSubscriptionsPage',
        component: CustomerSubscriptionsPage
      }
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
