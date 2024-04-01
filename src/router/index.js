import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import Homeview from "../views/Homeview.vue";
import Aboutview from "../views/Aboutview.vue";
import Contactview from "../views/Contactview.vue";
import CountryDetails from "../components/CountryDetails.vue";
import CommentCard from "../components/CommentCard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Homeview,
    },
    {
        path:'/about',
        name: 'about',
        component: Aboutview,
    },
    {
        path: '/contact',
        name: 'contact',
        component: Contactview,
    },
      {
          path: '/country/:id',
          name: 'details',
          component: CountryDetails,
          children: [
              {
                  path: 'comment',
                  name: 'comment',
                  component: CommentCard
              }
          ]
      }
  ],
});

export default router;
