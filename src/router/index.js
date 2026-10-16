import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'
import BookDetailView from '@/views/BookDetailView.vue'
import BooksView from '@/views/BooksView.vue'
import ShoppingCartView from '@/views/ShoppingCartView.vue'
import ActualitiesView from '@/views/ActualitiesView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/books',
      name: 'books',
      component: BooksView,
    },
    {
      path: '/cart',
      name: 'shopping-cart',
      component: ShoppingCartView,
    },
    {
      path: '/books/:id',
      name: 'book-detail',
      component: BookDetailView,
      props: true,
    },
    {
      path: '/actualities',
      name: 'actualities',
      component: ActualitiesView,
    },
    {
      path: '/actualities/:id',
      name: 'actualities-detail',
      component: ActualitiesView,
      props: true,
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
