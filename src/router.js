import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("./views/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("./views/Home.vue"),
  },
  // {
  //   path: "/dashboard/agenda",
  //   name: "Agenda",
  //   component: () => import("./views/Partido.vue"),
  // },
  {
    path: "/dashboard/partido/:idPartido",
    name: "Partido",
    component: () => import("./views/Partido.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
