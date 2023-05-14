<!-- TeamOwnerDetailView.vue -->
<template>
  <div class="container">
    <h2 class="mb-4">Team Members</h2>
    <ul class="list-group">
      <li v-for="(member, index) in teamMembers"
          :key="index"
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
      >
      <!--          @click="showGoals(member)"-->
        <router-link
            :to="`/my-teams/detail/${teamId}/teamMemberId/${member.id}`"
            :memberId="member.id"
            class="btn btn-primary"
        >
          {{ member.nickname }}
        </router-link>
        <span @click="changeGrade" class="badge bg-primary rounded-pill">{{ member.gradeName }}</span>
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
      apiUrl: `${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}`,
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
      const response = await axios.get(this.apiUrl + `/team/owner/` + teamId, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
        },
      });
      this.teamMembers = response.data;
      console.log(this.teamMembers);
    },
    showGoals(member) {
      console.log(member);
      this.selectedMember = member;
    },

    changeGrade() {

    }
  }
};
</script>
