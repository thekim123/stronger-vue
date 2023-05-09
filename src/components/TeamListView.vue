<template>
  <div class="team-list">
    <!-- 팀 리스트와 버튼 -->
    <div class="team-list">
      <button @click="openTagModal" class="tag-input-button">초대 코드</button>
      <button @click="openCreateTeamModal" class="create-team-input-button">팀 만들기</button>
      <div class="team" v-for="team in filterTeams()" :key="team.name">
        <h3>{{ team.name }}</h3>
        <p>{{ team.description }}</p>
        <button @click="openJoinModal(team)">Join</button>
      </div>
    </div>

    <!-- 모달 -->
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
    <div class="modal" v-if="showCreateTeamModal">
      <div class="modal-content">
        <h3>Enter Team Name</h3>
        <input
            type="text"
            v-model="teamTag"
            placeholder="Enter team tag..."
            class="tag-input"
        />
        <button @click="submitCreate">Submit</button>
        <button @click="closeCreateTeamModal">Close</button>
      </div>
    </div>
    <div class="modal" v-if="showJoinModal">
      <div class="modal-content">
        <h3>Wanna Join?</h3>
        <input
            type="text"
            v-model="teamTag"
            placeholder="Wanna Join?"
            class="tag-input"
        />
        <button @click="submitJoin">Submit</button>
        <button @click="closeJoinModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamListView',
  data() {
    return {
      teams: [], // 팀 목록 데이터를 저장할 배열
      searchQuery: '', // 검색어를 저장할 변수
      showTagModal: false, // 초대 코드 모달을 표시할지 결정하는 변수
      showJoinModal: false, // 팀 가입 모달을 표시할지 결정하는 변수
      showCreateTeamModal: false, // 팀 생성 모달을 표시할지 결정하는 변수
      selectedTeam: null, // 선택한 팀을 저장할 변수
      teamTag: '', // 팀 태그를 저장할 변수

    };
  },
  // Vue에서 API를 호출하여 팀 목록 데이터를 가져오는 메서드를 추가합니다.
  // 예제에서는 더미 데이터를 사용합니다.
  created() {
    this.teams = [
      {
        name: 'Team A',
        description: 'Team A is a great team.',
        tags: ['Vue.js', 'React', 'JavaScript'],
      },
      {
        name: 'Team B',
        description: 'Team B is a fantastic team.',
        tags: ['Python', 'Django', 'Flask'],
      },
    ];
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
    },
    closeJoinModal() {
      this.selectedTeam = null;
      this.showJoinModal = false;
    },
    submitJoin() {
      console.log('Submitted team name:', this.teamTag);
      this.closeCreateTeamModal();
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
      this.showCreateTeamModal = true;
    },
    closeCreateTeamModal() {
      this.showCreateTeamModal = false;
    },
    submitCreate() {
      console.log('Submitted team name:', this.teamTag);
      this.closeCreateTeamModal();
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
