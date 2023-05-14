<template>
  <div class="team-list">
    <!-- 팀 리스트와 버튼 -->
    <div class="team-list">
      <button @click="openTagModal" class="tag-input-button">초대 코드</button>
      <button @click="openCreateTeamModal" class="create-team-input-button">팀 만들기</button>
      <div class="team" v-for="team in filterTeams()" :key="team.name">
        <h3>{{ team.teamName }}</h3>
        <p>{{ team.description }}</p>
        <button @click="openJoinModal(team)">Join</button>
      </div>
    </div>

    <!-- 초대 코드 모달 -->
    <div class="modal" v-if="showTagModal">
      <div class="modal-content">
        <h3>Enter Team Tag</h3>
        <input
            type="text"
            v-model="teamTag"
            placeholder="Enter team tag..."
            class="tag-input"
        />
        <button @click="submitTag">Submit</button>
        <button @click="closeTagModal">Close</button>
      </div>
    </div>

    <!-- 팀 만들기 모달 -->
    <div class="modal" v-if="showCreateTeamModal">
      <div class="modal-content">
        <h3>팀 만들기</h3>
        <input
            type="text"
            v-model="createTeamName"
            placeholder="팀명을 입력해주세요."
            class="tag-input"
        />
        <input
            type="text"
            v-model="createTeamDescription"
            placeholder="팀에 대한 간략한 설명을 입력해주세요."
            class="tag-input"
        />
        <div class="mt-3">
          <Datepicker v-model="startDate"/>
          <Datepicker v-model="endDate"/>
        </div>
        <div>


        </div>
        <span>팀을 공개하실 건가요?</span>
        <input type="checkbox" @change="changeOpenOption(createTeamOpen)"/> <br/>
        <button @click="submitCreate">Create</button>
        <button @click="closeCreateTeamModal">Close</button>
      </div>
    </div>

    <!-- 팀 가입 모달 -->
    <div class="modal" v-if="showJoinModal">
      <div class="modal-content">
        <h3>팀에 가입할건가요?</h3>
        <input
            type="text"
            v-model="introduce"
            placeholder="각오를 단단히 써주세요!!"
            class="tag-input"
        />
        <button @click="submitJoin">Submit</button>
        <button @click="closeJoinModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Datepicker from "vue3-datepicker";

export default {
  name: 'TeamListView',

  data() {
    return {
      apiUrl: `${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}`,
      teams: [], // 팀 목록 데이터를 저장할 배열
      searchQuery: '', // 검색어를 저장할 변수
      showTagModal: false, // 초대 코드 모달을 표시할지 결정하는 변수
      showJoinModal: false, // 팀 가입 모달을 표시할지 결정하는 변수
      showCreateTeamModal: false, // 팀 생성 모달을 표시할지 결정하는 변수
      selectedTeam: null, // 선택한 팀을 저장할 변수
      teamTag: '', // 팀 태그를 저장할 변수
      createTeamName: '',
      createTeamDescription: '',
      createTeamOpen: false,

      // 날짜 선택을 위한 변수
      startDate: new Date(),
      endDate: new Date(),

      // 팀 가입을 위한 변수
      introduce: '',
      submitTeamId: '',
    };
  },
  components: {
    Datepicker,
  },
  // Vue에서 API를 호출하여 팀 목록 데이터를 가져오는 메서드를 추가합니다.
  // 예제에서는 더미 데이터를 사용합니다.
  async mounted() {
    try {
      const response = await axios.get(this.apiUrl + '/team/list')
      this.teams = response.data;
      console.log('Team list:', this.teams);
    } catch (error) {
      console.error('Error fetching team list:', error);
    }
  },
  methods: {
    // 검색 결과를 필터링하는 메서드를 추가합니다.
    filterTeams() {
      if (!this.searchQuery) return this.teams;
      return this.teams.filter((team) =>
          team.tags.some((tag) => tag.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    },
    openJoinModal(team) {
      this.selectedTeam = team;
      this.showJoinModal = true;
      this.submitTeamId = team.id;
    },
    closeJoinModal() {
      this.selectedTeam = null;
      this.showJoinModal = false;
      this.submitTeamId = '';
    },
    submitJoin() {
      axios.post(this.apiUrl + '/team/join/' + this.submitTeamId, this.introduce, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
        },
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.error(error);
      });

      this.closeJoinModal();
    },

    openTagModal() {
      this.showTagModal = true;
    },
    closeTagModal() {
      this.showTagModal = false;
    },
    submitTag() {
      // 여기에서 API 서버에 팀 태그를 전송하고, 결과를 받아 처리합니다.
      console.log('Submitted team tag:', this.teamTag);
      this.closeTagModal();
    },

    openCreateTeamModal() {
      console.log(this.endDate);

      this.showCreateTeamModal = true;
    },
    closeCreateTeamModal() {
      console.log(this.endDate);
      this.showCreateTeamModal = false;
    },
    changeOpenOption(createTeamOpen) {
      this.createTeamOpen = !createTeamOpen;
    },

    async submitCreate() {
      const teamDto = {
        teamName: this.createTeamName,
        description: this.createTeamDescription,
        isOpen: this.createTeamOpen,
        startDate: this.startDate,
        endDate: this.endDate,
        goalCount: this.goalCount,
      };

      axios.post(this.apiUrl + `/team/create`,
          teamDto, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
            },
          }).then(() => {
        alert('팀 생성 성공');
        this.teams.push(teamDto);
      }).catch((error) => {
        console.error(error);
      });
      console.log('Submitted team name:', this.teamTag);
      this.closeCreateTeamModal();
    },

    formatDate(date) {
      var yyyy = date.getFullYear().toString();
      var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
      var dd = date.getDate().toString();

      // Pad mm and dd with leading zeros if necessary
      mm = mm[1] ? mm : '0' + mm[0];
      dd = dd[1] ? dd : '0' + dd[0];

      return yyyy + '-' + mm + '-' + dd; // Concatenate yyyy, mm, and dd to get yyyymmdd format
    },
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

.tag-input-button {
  background-color: #00b9b9;
  border: none;
  color: white;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 8px 0;
  cursor: pointer;
  border-radius: 5px;
}

.tag-input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}

</style>
