import { createRouter, createWebHistory } from 'vue-router'
import { USER_ROLE } from '../models'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import DiscountedProduce from '../views/DiscountedProduce.vue'
import CartPage from '../views/CartPage.vue'
import CustomerSubscriptions from '../components/profile-component/CustomerSubscriptions.vue'
import FarmerSubscriptionsPage from '../views/FarmerSubscriptionsPage.vue'
import AvailableSubscriptionsPage from '../views/AvailableSubscriptionsPage.vue'
import MyDetail from '../components/profile-component/MyDetail.vue'
import FarmerDiscountedProducePage from '../views/FarmerDiscountedProducePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    redirect: '/discounted-produce',
    meta: { requiresAuth: true },
    children: [
      {
        path: '/profile',
        name: 'Profile',
        component: ProfilePage,
        meta: { requiresAuth: true },
        children:[
          {
            path: 'mydetail',
            name: 'MyDetail',
            component: MyDetail,
            meta: { requiresAuth: true }
          },
          {
            path: 'my-subscriptions',
            name: 'CustomerSubscriptions',
            component: CustomerSubscriptions,
            meta: { requiresAuth: true }
          },
        ]
      },
      {
        path: '/discounted-produce',
        name: 'DiscountedProduce',
        component: DiscountedProduce,
        meta: { requiresAuth: true }
      },
      {
        path: '/cart',
        name: 'Cart',
        component: CartPage,
        meta: { requiresAuth: true }
      },
      {
        path: 'available-subscriptions',
        name: 'AvailableSubscriptionsPage',
        component: AvailableSubscriptionsPage,
        meta: { requiresAuth: true }
      },
      {
        path: '/my-dicounted-produce',
        name: 'FarmerDiscountedProducePage',
        component: FarmerDiscountedProducePage,
        meta: { requiresVendorAuth: true }
      },
      {
        path: 'my-offers',
        name: 'FarmerSubscriptionsPage',
        component: FarmerSubscriptionsPage,
        meta: { requiresVendorAuth: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const currentUser = sessionStorage.getItem('currentUser');
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (currentUser === null) {
      next({
        path: '/login',
      })
    }
  }
  if (to.matched.some(record => record.meta.requiresVendorAuth)) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser.role != USER_ROLE.farmer) {
      next({
        path: '/login',
      })
    }
  }
  next()
})

export default router
