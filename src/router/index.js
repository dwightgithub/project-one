import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
	{
	path: "",
	redirect: "Login"
},
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  },
  {
    path: "/streetView",
    name: "StreetViewMain",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/StreetViewMain.vue")
  },
];

const router = new VueRouter({
  routes
});

export default router;
