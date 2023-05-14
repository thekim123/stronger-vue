<template>
  <div class="owner">
    <div class="team-list owner">
      <h3>내가 만든 팀</h3>
      <div class="team" v-for="member in teamMembers" :key="member.id">
        <div v-if="member.gradeName === 'MANAGER' || member.gradeName === 'OWNER'">
          <router-link :to="`/my-teams/owner/detail/${member.id}`" class="btn btn-primary" :teamId="member.id">
            <h3>{{ member.teamName }}</h3>
          </router-link>
          <p>{{ member.description }}</p>
          <button @click="deleteTeam(member.id)">Delete</button>
          <button @click="openUpdateModal(member)">Update</button>
        </div>
      </div>
    </div>

    <div class="team-list owner">
      <h3>가입한 팀</h3>
      <div class="team" v-for="member in teamMembers" :key="member.id">
        <div v-if="member.gradeName === 'MEMBER'">
          <router-link :to="`/my-teams/detail/${member.teamId}/teamMemberId/1`" class="btn btn-primary">
            <h3>{{ member.teamName }}</h3>
          </router-link>
          <p>{{ member.description }}</p>
          <button @click="no">Delete</button>
        </div>
      </div>
    </div>

    <div class="team-list owner">
      <h3>가입대기 중인 팀</h3>
      <div class="team" v-for="member in teamMembers" :key="member.id">
        <div v-if="member.gradeName === 'PENDING'">
          <h3>{{ member.teamName }}</h3>
          <p>{{ member.description }}</p>
          <button @click="cancelJoin(member)">가입 취소</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 팀 수정 모달 -->
  <div class="modal" v-if="showUpdateModal">
    <div class="modal-content">
      <input class="tag-input team-name" type="text" :value="selectedTeam.teamName">
      <input
          type="text"
          :value="selectedTeam.description"
          class="tag-input description"
      />
      <span>팀을 공개하실 건가요?</span>
      <input type="checkbox" @change="changeOpenOption()"/> <br/>
      <button @click="updateTeam(selectedTeam)">Update</button>
      <button @click="closeUpdateModal">Close</button>
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
      teamMembers: [],
      showUpdateModal: false,
      selectedTeam: null,
      updateTeamIsOpen: false,
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
      this.teamMembers = response.data;
      console.log('Team list:', this.teamMembers);
      console.log(this.teamMembers[0].id);
    } catch
        (error) {
      console.error('Error fetching team list:', error);
    }
  },
  methods: {
    openUpdateModal(team) {
      this.selectedTeam = team;
      this.showUpdateModal = true;
    },

    closeUpdateModal() {
      this.showUpdateModal = false;
    },

    changeOpenOption() {
      this.updateTeamIsOpen = !this.updateTeamIsOpen;
      console.log(this.updateTeamIsOpen);
    },

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
        this.teamMembers = this.teamMembers.filter(team => team.id !== id);
      } catch (error) {
        console.error('Error deleting team:', error);
      }

    },
    async updateTeam(team) {
      const teamDto = {
        id: team.id,
        teamName: document.getElementsByClassName('team-name')[0].value,
        description: document.getElementsByClassName('description')[0].value,
        isOpen: this.updateTeamIsOpen,
      };

      try {
        await axios.put(this.apiUrl + '/team/update', teamDto, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
          }
        });

        const teamIndex = this.teamMembers.findIndex(t => t.id === team.id);
        if (teamIndex !== -1) {
          this.teamMembers[teamIndex].name = document.getElementsByClassName('team-name')[0].value;
          this.teamMembers[teamIndex].description = document.getElementsByClassName('description')[0].value;
        }

        alert('팀 수정 성공');
        this.closeUpdateModal();
      } catch (error) {
        console.error('Error updating team:', error);
      }
    },
    async cancelJoin(member) {
      console.log(member.id);
      if (!confirm('가입을 취소하시겠습니까?')) {
        return;
      }

      axios.delete(this.apiUrl + '/team/leave/' + member.id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
        }
      }).then(() => {
        alert('가입 취소 성공');
        this.teamMembers = this.teamMembers.filter(teamMember => teamMember.id !== member.id);
      }).catch(error => {
        console.error('Error canceling join:', error);
      });

    }

  },

};
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

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.team-name {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}

.description {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}

.tag-input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}

</style>