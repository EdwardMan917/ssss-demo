import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/ssss-demo/", component: () => import("./components/Home.vue") },
  { path: "/ssss-demo/create", component: () => import("./components/CreateWallet.vue") },
  { path: "/ssss-demo/upload", component: () => import("./components/UploadKey.vue") },
  { path: "/ssss-demo/restore", component: () => import("./components/RestoreWallet.vue") },
  { path: "/ssss-demo/wallet", component: () => import("./components/WalletDetails.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;