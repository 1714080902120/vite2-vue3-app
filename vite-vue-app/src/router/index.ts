import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const Home = () => import('views/home/Home.vue')
const About = () => import('views/about/About.vue')
const Page404 = () => import('views/404.vue')

const Name = () => import('views/home/components/Name.vue')
const Info = () => import('views/home/components/Info.vue')


const HomeChildren: RouteRecordRaw[] = [
  {
    path: '/home/',
    component: Name,

  },
  {
    path: '/home/info',
    component: Info
  }
]


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
    redirect: '/home/'
  },
  {
    path: '/home',
    component: Home,
    redirect: '/home/',
    children: HomeChildren
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/404',
    component: Page404
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]


export default createRouter({
  routes,
  history: createWebHashHistory()
})
