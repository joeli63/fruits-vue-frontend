import { createRouter, createWebHistory } from "vue-router"

import FruitsPageView from "@/app/fruits/index.vue"

const routes = [
  {
    path: "/",
    redirect: "/fruits",
  },
  {
    path: "/fruits",
    component: FruitsPageView,
    meta: {
      title: "Fruits",
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
