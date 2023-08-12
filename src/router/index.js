import { createRouter, createWebHistory } from 'vue-router'
import CharacterDetails from "../views/CharacterDetails.vue";
import HomeSearch from "../views/HomeSearch.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomeSearch",
      component: HomeSearch
    },
    {
      path: "/character-details",
      name: "CharacterDetails",
      component: CharacterDetails
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound
    },
    {
      path: "/404/:resource",
      name: "404Resource",
      component: NotFound,
      props: true
    }
  ]
})

export default router
