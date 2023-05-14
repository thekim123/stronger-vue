<template>
  <div class="container">
    <!-- Team member view -->
    <GoalListBox
        :goals="userGoals"
        :editable="true"
        :teamId="teamId"
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
      const response = await axios.get(this.apiUrl + '/goal/team/' + this.teamId, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
        },
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
      this.userGoals = response.data;
    },
    showGoals(member) {
      this.selectedMember = member;
    },
    handleAddGoal(newGoal) {
      this.userGoals.push(newGoal);
    },
    handleDeleteGoal(goalId){
      this.userGoals = this.userGoals.filter((goal) => goal.id !== goalId);
    }
  }
};
</script>
