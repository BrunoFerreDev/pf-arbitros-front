import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/Home.vue"),
  },
  {
    path:"/agenda",
    component: () => import("./views/Partido.vue"),
  },
  {
    path:"/partido",
    component: () => import("./views/Partido.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
