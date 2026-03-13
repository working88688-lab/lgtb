/*
 * @Author: lichunfeng
 * @Date: 2020-06-11 21:04:58
 * @LastEditors: lichunfeng duuuuufu@gmail.com
 * @LastEditTime: 2024-06-04 10:12:05
 * @Description:
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // redirect: "/home",
    name: "Home",
    component: () => import("../views/home.vue"),
  },
  // {
  //   path: "/home",
  //   name: "Home",
  //   component: () => import("../views/home.vue"),
  // },
  {
    path: "/tutorial",
    name: "Tutorial",
    component: () => import("../views/tutorial.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
