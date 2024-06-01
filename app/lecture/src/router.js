import { createRouter, createWebHistory } from 'vue-router'
import TopScreen from './views/TopScreen.vue'
import LectureTemplate from './views/LectureTemplate.vue'
import NotExisting from './views/NotExisting.vue'

const routes = [
    {
        path: '/',
        redirect: {
            name: 'top'
        }
    },
    {
        path: '/lecture',
        redirect: {
            name: 'top'
        }
    },
    {
        path: '/lecture/top',
        name: 'top',
        component: TopScreen,
    },
    {
        path: '/lecture/:number',
        name: 'lecture',
        component: LectureTemplate,
        props: true
    },
    {
        path:'/:catchAll(.*)',
        name: 'not-found',
        component: NotExisting,
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    },
})

export default router