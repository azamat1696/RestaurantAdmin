
const routes = [
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    meta: { requiresAuth : false },
    name: 'loginRoot',
    children: [
      { path: 'login', name:'login',component: () => import('pages/Auth/Login.vue')},
      { path: 'forgot-password', name:'ForgotPassword',component: () => import('pages/Auth/ForgotPassword.vue')},
    ]
  },
  {
    path: '/',
    component: () => import('layouts/AppLayout.vue'),
    meta: { requiresAuth : true },
    children: [
      { path: '', name: 'root', component: () => import('pages/IndexPage.vue') },
    ]

  },
  {
    path: '/events-page',
    component: () => import('layouts/EventAndPlaces.vue'),
    meta: { requiresAuth : true },
    children: [
      { path: 'events', name: 'events', component: () => import('pages/Events/Events.vue') },
      { path: 'customers', name: 'Customers', component: () => import('pages/Customers/Customers.vue') },
      { path: 'users', name: 'Users', component: () => import('pages/RestaurantUsers/RestaurantUser.vue') },

    ]

  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  }
]

export default routes
