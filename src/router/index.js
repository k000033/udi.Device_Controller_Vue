import { createRouter, createWebHistory } from 'vue-router'

import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";

const routes = setupLayouts(generatedRoutes);
const router = createRouter({
  history: createWebHistory('dcs/udi.device_control'),
  routes,
})

export default router
