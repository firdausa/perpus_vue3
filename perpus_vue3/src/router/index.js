import { createRouter, createWebHistory } from 'vue-router'

import Template from '../components/Template.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Book from '../components/Book.vue'
import Grade from '../components/Grade.vue'
import Student from '../components/Student.vue'
import BookBorrow from '../components/BookBorrow.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '',
    component: Template,
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home
      },
      {
        path: "/book",
        name: "Book",
        component: Book
      },
      {
        path: "/grade",
        name: "Grade",
        component: Grade
      },
      {
        path: "/student",
        name: "Student",
        component: Student
      },
      {
        path: "/book_borrow",
        name: "BookBorrow",
        component: BookBorrow
      }
    ],
    meta: {
      requireAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requireAuth)) {
    if (localStorage.getItem('Authorization')) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
