import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores'
import { HomeView, LoginView, TicketView } from '@/views'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        {
          path: '/',
          component: TicketView
        },
      ]
    },
    { path: '/login', component: LoginView }
  ]
})

router.beforeEach(async (to) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()
  // if (authRequired && !auth.user) {
  //     auth.returnUrl = to.fullPath;
  //     return '/login';
  // }
  if (to.href == '/login' && auth.token) {
    return '/'
  }
})

export default router
