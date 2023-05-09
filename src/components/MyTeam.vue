<template>
  <div class="owner">
    <div class="team-list owner">
      <h3>내가 만든 팀</h3>
      <div class="team" v-for="team in teams" :key="team.id">
        <h3>{{ team.teamName }}</h3>
        <p>{{ team.description }}</p>
        <button @click="deleteTeam(team.id)">Delete</button>
        <button @click="updateTeam(team.id)">Update</button>
      </div>
    </div>

    <div class="team-list owner">
      <h3>가입한 팀</h3>
      <div class="team" v-for="team in teams" :key="team.id">
        <h3>{{ team.teamName }}</h3>
        <p>{{ team.description }}</p>
        <button @click="no">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MyTeam",
  data() {
    return {
      apiUrl: `${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}`,
      teams: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get(this.apiUrl + '/team/my-list', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
        },
      });
      this.teams = response.data;
      console.log('Team list:', this.teams);
    } catch
        (error) {
      console.error('Error fetching team list:', error);
    }
  },
  methods: {
    async deleteTeam(id) {
      if (!confirm("정말 삭제하시겠습니까?")) {
        return;
      }
      console.log(id);
      try {
        await axios.delete(this.apiUrl + `/team/delete/` + id,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
              },
            });
        alert('팀 삭제 성공');
        this.teams = this.teams.filter(team => team.id !== id);
      } catch (error) {
        console.error('Error deleting team:', error);
      }

      axios.delete(this.apiUrl + `/team/delete/` + id,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
            },
          }).then(() => {
      }).catch((error) => {
        console.error(error);
      });

    },
  },

}
</script>

<style scoped>

.team-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
  width: 80%;
}
</style>