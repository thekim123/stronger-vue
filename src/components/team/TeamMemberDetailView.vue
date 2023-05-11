<template>
  <div class="container">
    <!-- Team member view -->
    <GoalListBox :goals="userGoals" :editable="true" :teamId="teamId"/>
  </div>
</template>

<script>
import axios from "axios";
import GoalListBox from "./GoalListBox.vue";

export default {
  name: "TeamMemberDetailView",
  data() {
    return {
      apiUrl: `${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}`,
      teamMembers: [],
      userGoals: [],
      selectedMember: null,
      memberId: this.$route.params.teamMemberId,
      teamId: this.$route.params.teamId,
    };
  },
  components: {
    GoalListBox: GoalListBox,
  },
  created() {
    this.fetchUserGoal();
  },
  methods: {
    async fetchUserGoal() {
      const response = await axios.get(this.apiUrl + '/plan/team/'+this.memberId, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
        },
      });
      this.userGoals = response.data;
    },
    showGoals(member) {
      this.selectedMember = member;
    },
  }
};
</script>
