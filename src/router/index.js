import Vue from 'vue'
import VueRouter from 'vue-router'
// import Auth from '../layouts/Auth.vue'
// import AuthGuard from "@/router/auth-guard";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Admin',
    // redirect: { name: 'Home' },
    // beforeEnter: AuthGuard,
    component: () => import("../layouts/AppLayout.vue"),
    children: [
      {
        path: "home",
        name: "Home",
        // beforeEnter: AuthGuard,
        component: () => import("../pages/admin/Home"),
      },
      {
        path: "AllGames",
        name: "AllGames",
        // beforeEnter: AuthGuard,
        component: () => import("../pages/admin/AllGames"),
      },
      {
        path: "NewGames",
        name: "NewGames",
        // beforeEnter: AuthGuard,
        component: () => import("../pages/admin/NewGames"),
      },
      {
        path: "TopGames",
        name: "TopGames",
        // beforeEnter: AuthGuard,
        component: () => import("../pages/admin/NewGames"),
      },
      {
        path: "HotGames",
        name: "HotGames",
        // beforeEnter: AuthGuard,
        component: () => import("../pages/admin/NewGames"),
      },
      {
        path: "Megaways",
        name: "Megaways",
        // beforeEnter: AuthGuard,
        component: () => import("../pages/admin/NewGames"),
      },
      {
        path: "Books",
        name: "Books",
        // beforeEnter: AuthGuard,
        component: () => import("../pages/admin/NewGames"),
      },
      {
        path: "Fruits",
        name: "Fruits",
        // beforeEnter: AuthGuard,
        component: () => import("../pages/admin/NewGames"),
      },
      {
        path: "Roulettes",
        name: "Roulettes",
        // beforeEnter: AuthGuard,
        component: () => import("../pages/admin/NewGames"),
      },
      // {
      //   path: "cars",
      //   name: "Cars",
      //   // beforeEnter: AuthGuard,
      //   component: () => import("../pages/admin/Cars/index.vue"),
      // },
      // {
      //   path: "entities",
      //   name: "Entities",
      //   // beforeEnter: AuthGuard,
      //   component: () => import("../pages/admin/Entities/index.vue"),
      // },
      // {
      //   path: "orders",
      //   name: "Orders",
      //   // beforeEnter: AuthGuard,
      //   component: () => import("../pages/admin/Orders/index.vue"),
      // },
      // {
      //   path: "error",
      //   name: "Error",
      //   component: () => import("../pages/admin/Error"),
      // },
      {
        path: "menu7",
        name: "Menu7",
        // beforeEnter: AuthGuard,
        component: () => import("../pages/admin/Menu7"),
      },
    ],
  },
  {
    path: "*",
    redirect: { name: 'Error' },
    name: "MainError",
    component: () => import("../pages/admin/Error"),
  },
]

const router = new VueRouter({
  routes
});

export default router;
