import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Form from "@/views/Form.vue";
import NotFound from "@/views/NotFound.vue";
import { documentTitle } from '../utils/constants';
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // component: Form,
    meta: {
      title: 'Home',
    }
  },
  {
    path: '/form/:id',
    name: 'formEdit',
    component: Form,
    meta: {
      title: 'Edit Form',
    }
  },
  {
    path: "/form",
    name: "Form",
    component: Form,
    meta: {
      title: 'Form',
    }
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
    meta: {
      title: '404',
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || documentTitle;
  next()
})

export default router;
