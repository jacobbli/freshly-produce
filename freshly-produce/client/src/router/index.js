import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RoleSelectionForm from '../components/login-component/RoleSelectionForm.vue'
import LoginForm from '../components/login-component/LoginForm.vue'
import CustomerSubscriptionsPage from '../views/CustomerSubscriptionsPage.vue'
import FarmerSubscriptionsPage from '../views/FarmerSubscriptionsPage.vue'
import AvailableSubscriptionsPage from '../views/AvailableSubscriptionsPage.vue'
import SubscriptionCreationPage from '../views/SubscriptionCreationPage.vue'
import SubscriptionCreationForm from '../components/subscription-component/SubscriptionCreationForm.vue'
import FrequencySelectionForm from '../components/subscription-component/FrequencySelectionForm.vue'
import ProductDescriptionForm from '../components/subscription-component/ProductDescriptionForm.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    children: [
      {
        path: 'available-subscriptions',
        name: 'AvailableSubscriptionsPage',
        component: AvailableSubscriptionsPage
      },
      {
        path: 'my-subscriptions',
        name: 'CustomerSubscriptionsPage',
        component: CustomerSubscriptionsPage
      },

      {
        path: 'my-offers',
        name: 'FarmerSubscriptionsPage',
        component: FarmerSubscriptionsPage,
        children: [
          {
            path: 'new-subscription',
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
          }
        ]
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
