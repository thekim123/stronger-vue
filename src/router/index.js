import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../components/home/HomeView.vue';
import ShareYourProgress from '../components/sns/ShareYourProgress.vue';
import GoalsView from "@/components/goals/GoalsView.vue";
import TeamListView from "@/components/team/TeamListView.vue";
import LoginView from "@/components/user/LoginView.vue";
import UserProfileView from "@/components/user/ProfileView.vue";
import SignUpView from "@/components/user/SignUpView.vue";
import MyTeam from "@/components/team/MyTeam.vue";
import TeamMemberDetailView from "@/components/team/TeamMemberDetailView.vue";
import TeamOwnerDetailView from "@/components/team/TeamOwnerDetailView.vue";

const routes = [
    {path: '/', component: HomeView},
    {path: '/share', component: ShareYourProgress},
    {path: '/goals', component: GoalsView},
    {path: '/teams', component: TeamListView},
    {path: '/login', component: LoginView},
    {path: '/profile', component: UserProfileView},
    {path: '/signup', component: SignUpView},
    {path: '/my-teams', component: MyTeam},
    {path: '/my-teams/owner/detail/:teamId', component: () => TeamOwnerDetailView},
    {path: '/my-teams/detail/:teamId/teamMemberId/:teamMemberId', component: () => TeamMemberDetailView},


];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
