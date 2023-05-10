<template>
  <div>
      <h2>Team Members</h2>
      <ul>
        <li v-for="(member, index) in teamMembers" :key="index" @click="showGoals(member)">
          {{ member.name }}
        </li>
      </ul>
      <!-- List of goals will appear here -->
  </div>
</template>


<script>
export default {
  name: "TeamLeaderView",
  methods: {
    showGoals(member) {
      this.selectedMember = member;
      // Fetch goals for the selected team member
    },
  },
}
</script>

<style scoped>

</style>