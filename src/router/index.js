import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../layouts/Auth.vue'
import AuthGuard from "@/router/auth-guard";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/admin',
    name: 'Admin',
    beforeEnter: AuthGuard,
    component: () => import("../layouts/AppLayout.vue"),
    children: [
      {
        path: "home",
        name: "Home",
        beforeEnter: AuthGuard,
        component: () => import("../pages/admin/Home"),
      },
      {
        path: "cars",
        name: "Cars",
        beforeEnter: AuthGuard,
        component: () => import("../pages/admin/Cars/index.vue"),
      },
      {
        path: "cars/create",
        name: "Cars.create",
        beforeEnter: AuthGuard,
        component: () => import("../pages/admin/Cars/create.vue"),
      },
      {
        path: "cars/:id/edit",
        name: "Cars.edit",
        beforeEnter: AuthGuard,
        component: () => import("../pages/admin/Cars/edit.vue"),
      },
      {
        path: "entities",
        name: "Entities",
        beforeEnter: AuthGuard,
        component: () => import("../pages/admin/Entities/index.vue"),
      },
      {
        path: "orders",
        name: "Orders",
        beforeEnter: AuthGuard,
        component: () => import("../pages/admin/Orders/index.vue"),
      },
      {
        path: "menu5",
        name: "Menu5",
        beforeEnter: AuthGuard,
        component: () => import("../pages/admin/Menu5"),
      },
      {
        path: "menu6",
        name: "Menu6",
        beforeEnter: AuthGuard,
        component: () => import("../pages/admin/Menu6"),
      },
      {
        path: "menu7",
        name: "Menu7",
        beforeEnter: AuthGuard,
        component: () => import("../pages/admin/Menu7"),
      },
    ],
  },
  {
    path: "*",
    name: "Error",
    component: () => import("../pages/admin/Error"),
  },
]

const router = new VueRouter({
  routes
});

export default router;
