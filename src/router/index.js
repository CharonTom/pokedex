import { createRouter, createWebHistory } from "vue-router";
import Card from "../components/Card.vue";
import Inventory from "../components/Inventory.vue";
import Details from "../components/Details.vue";

const routes = [
  {
    path: "/",
    component: Card,
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
