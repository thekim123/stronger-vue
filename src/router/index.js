import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../components/HomeView.vue';
import ShareYourProgress from '../components/ShareYourProgress.vue';
import TasksView from "@/components/TasksView.vue";
import GoalsView from "@/components/GoalsView.vue";
import TeamListView from "@/components/TeamListView.vue";
import LoginView from "@/components/LoginView.vue";
import UserProfileView from "@/components/UserProfileView.vue";
import SignUpView from "@/components/SignUpView.vue";
import MyTeam from "@/components/MyTeam.vue";

const routes = [
    {path: '/', component: HomeView},
    {path: '/share', component: ShareYourProgress},
    {path: '/tasks', component: TasksView},
    {path: '/goals', component: GoalsView},
    {path: '/teams', component: TeamListView},
    {path: '/login', component: LoginView},
    {path: '/profile', component: UserProfileView},
    {path: '/signup', component: SignUpView},
    {path:'/myteams', component: MyTeam},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
