<!-- TeamOwnerDetailView.vue -->
<template>
  <div class="container">
    <h2 class="mb-4">Team Members</h2>
    <ul class="list-group">
      <li v-for="(member, index) in teamMembers"
          :key="index"
          @click="showGoals(member)"
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
      >
        <router-link :to="`/my-teams/detail/${teamId}/teamMemberId/${member.id}`" :memberId="member.id" class="btn btn-primary">
          {{member.id}}{{ member.name }}
        </router-link>
        <span class="badge bg-primary rounded-pill">{{ member.grade }}</span>
      </li>
    </ul>
    <div v-if="selectedMember" class="mt-5">
      <h3>{{ selectedMember.name }}의 목표</h3>
      <GoalListBox :goals="selectedMember.goals" :editable="false"/>
    </div>
  </div>
</template>
<!-- TeamOwnerDetailView.vue -->

<script>
import axios from "axios";
import GoalListBox from "./GoalListBox.vue";

export default {
  name: "TeamDetailView",
  data() {
    return {
      teamMembers: [],
      userGoals: [],
      selectedMember: null,
      teamId: this.$route.params.teamId,
    };
  },
  components: {
    GoalListBox: GoalListBox,
  },
  computed: {
    // Add computed properties here
  },
  created() {
    console.log(this.teamId);
    this.fetchTeamMembers(this.teamId);
  },
  methods: {
    async fetchTeamMembers(teamId) {
      const response = await axios.get(`${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/team/owner/` + teamId, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
        },
      });
      this.teamMembers = response.data;
    },
    showGoals(member) {
      this.selectedMember = member;
      // Fetch goals for the selected team member
    },
  }
};
</script>
