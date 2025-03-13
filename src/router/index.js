import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Inventory from "../components/Inventory.vue";
import Details from "../components/Details.vue";

const routes = [
  {
    path: "/",
    component: Home,
    props: true,
  },
  {
    path: "/inventory",
    component: Inventory,
    props: true,
  },
  {
    path: "/details",
    component: Details,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
