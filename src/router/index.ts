import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/dashboard",
    name: "home",
    component: HomeView,
  },
  {
    path: "/",
    name: "login",
   
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/staff",
    name: "Staffs",
    // route level code-splitting
    // this generates a separate chunk (menu.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "menu" */ "../views/StaffView.vue"),
  },
  // {
  //   path: "/property",
  //   name: "Property",
  //   // route level code-splitting
  //   // this generates a separate chunk (menu.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "menu" */ "../views/PropertyView.vue"),
  // },
  // {
  //   path: "/contact",
  //   name: "Contact",
  //   // route level code-splitting
  //   // this generates a separate chunk (menu.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "menu" */ "../views/ContactView.vue"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition: any) {
    if (to.hash) {
      return {
        el: to.hash
      }
    }
    else if (savedPosition) {
      return savedPosition
    } else
    return {left:0, top:0}
  }
});


export default router;
