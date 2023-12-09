import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Admin',
    component: () => import("../layouts/AppLayout.vue"),
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("../pages/admin/Home"),
      },
      {
        path: "AllGames",
        name: "AllGames",
        component: () => import("../pages/admin/AllGames"),
      },
      {
        path: "NewGames",
        name: "NewGames",
        component: () => import("../pages/admin/NewGames"),
      },
      {
        path: "TopGames",
        name: "TopGames",
        component: () => import("../pages/admin/NewGames"),
      },
      {
        path: "HotGames",
        name: "HotGames",
        component: () => import("../pages/admin/NewGames"),
      },
      {
        path: "Megaways",
        name: "Megaways",
        component: () => import("../pages/admin/NewGames"),
      },
      {
        path: "Books",
        name: "Books",
        component: () => import("../pages/admin/NewGames"),
      },
      {
        path: "Fruits",
        name: "Fruits",
        component: () => import("../pages/admin/NewGames"),
      },
      {
        path: "Roulettes",
        name: "Roulettes",
        component: () => import("../pages/admin/NewGames"),
      },
      {
        path: "Favorites",
        name: "Favorites",
        component: () => import("../pages/admin/Favorites"),
      },
      {
        path: "RecentPlayed",
        name: "RecentPlayed",
        component: () => import("../pages/admin/NewGames"),
      },
      {
        path: "Promotions",
        name: "Promotions",
        component: () => import("../pages/admin/NewGames"),
      },
      {
        path: "VIPClub",
        name: "VIPClub",
        component: () => import("../pages/admin/NewGames"),
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
