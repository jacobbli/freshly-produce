import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import DiscountedProduce from '../views/DiscountedProduce.vue'
import CartPage from '../views/CartPage.vue'
import RoleSelectionForm from '../components/login-component/RoleSelectionForm.vue'
import LoginForm from '../components/login-component/LoginForm.vue'
import CustomerSubscriptions from '../components/profile-component/CustomerSubscriptions.vue'
import FarmerSubscriptionsPage from '../views/FarmerSubscriptionsPage.vue'
import AvailableSubscriptionsPage from '../views/AvailableSubscriptionsPage.vue'
import MyDetail from '../components/profile-component/MyDetail.vue'
import SubscriptionCreationPage from '../views/SubscriptionCreationPage.vue'
import FrequencySelectionForm from '../components/subscription-component/FrequencySelectionForm.vue'
import ProductDescriptionForm from '../components/subscription-component/ProductDescriptionForm.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    redirect: '/discounted-produce',
    children: [
      {
        path: '/profile',
        name: 'Profile',
        component: ProfilePage,
        children:[
          {
            path: 'mydetail',
            name: 'MyDetail',
            component: MyDetail
          },
          {
            path: 'my-subscriptions',
            name: 'CustomerSubscriptions',
            component: CustomerSubscriptions
          },
        ]
      },
      {
        path: '/discounted-produce',
        name: 'DiscountedProduce',
        component: DiscountedProduce,
      },
      {
        path: '/cart',
        name: 'Cart',
        component: CartPage,
      },
      {
        path: 'available-subscriptions',
        name: 'AvailableSubscriptionsPage',
        component: AvailableSubscriptionsPage
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
                name: 'ProductDescriptionForm',
                component: ProductDescriptionForm,
                props: true
              },
              {
                path: 'frequency',
                name: 'FrequencySelectionForm',
                component: FrequencySelectionForm,
                props: true
              },
            ]
          }
        ]
      },
    ]
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    children: [
      {
        path: '/role',
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
