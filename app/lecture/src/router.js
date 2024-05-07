import { createRouter, createWebHistory } from 'vue-router'
import TopScreen from './components/TopScreen.vue'
import LectureTemplate from './components/LectureTemplate.vue'

const routes = [
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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router