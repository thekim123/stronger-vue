<template>
  <div class="container">
    <!-- Team member view -->
    <h2 class="mb-4">내 목표</h2>
    <GoalListBox :goals="userGoals" :editable="true" :teamId="teamId"
                 @add-goal="handleAddGoal"
                 @delete-goal="handleDeleteGoal"
    />
  </div>
</template>

<script>
import axios from "axios";
import GoalListBox from "./GoalListBox.vue";

export default {
  name: "TeamMemberDetailView",
  data() {
    return {
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
  computed: {
    // Add computed properties here
  },
  created() {
    this.fetchUserPlan();
  },
  methods: {
    async fetchUserPlan() {
      console.log(this.memberId);
      const response = await axios.get(`${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}` + '/plan/team/' + this.memberId, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
        },
      });
      this.userGoals = response.data;
    },
    showGoals(member) {
      this.selectedMember = member;
      // Fetch goals for the selected team member
    },
    handleDeleteGoal(index) {
      console.log(index);
      console.log("delete goal");
    },
    handleAddGoal(newGoal) {
      console.log(newGoal);
      console.log("add goal");
    },
  }
};
</script>
