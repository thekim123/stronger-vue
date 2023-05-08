import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/HomeView.vue';
import ShareYourProgress from '../components/ShareYourProgress.vue';
import TasksView from "@/components/TasksView.vue";

const routes = [
    { path: '/', component: HomeView },
    { path: '/share', component: ShareYourProgress },
    { path: '/tasks', component: TasksView}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
