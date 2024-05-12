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
        path: '/top',
        name: 'top',
        component: TopScreen,
    },
    {
        path: '/:number',
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
    history: createWebHistory('/lecture/'),
    routes
})

export default router