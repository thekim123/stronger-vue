<template>
  <div class="tasks">
    <span v-if="teams.length > 0">{{ teams[teamIndex].teamName }}</span>
    <div class="date-picker">
      <input type="date" v-model="selectedDate" @change="fetchTasks">
    </div>
    <div class="goals-container">
      <div class="left-side box">
        <h2>목표 목록</h2>
        <div class="chart-container">
          <div ref="chart" style="width: 60%; height:400px;"></div>
        </div>
      </div>
      <div class="right-side">
        <div class="self-feedback box">
          <h2>셀프 피드백</h2>
          <button @click="openSelfFeedbackModal">작성</button>
          <button type="button" @click="deleteSelfFeedback">삭제</button>
          <div class="self-feedback content">
            <span>{{ self.reason }}</span>
          </div>
        </div>

        <div class="manager-feedback box">
          <h2>팀장 피드백</h2>
          <button v-if="isTutor" @click="openFeedbackModal">작성</button>
          <button v-if="isTutor" type="button" @click="deleteFeedback">삭제</button>
          <div class="manager-feedback content">
            <!--        <input v-model="member.feedback.title">-->
            <span>{{ this.feedback.comment }}</span>
          </div>
        </div>

        <div v-if="selfModalVisible" class="goal-view-modal" @click.stop @keydown.stop>
          <div class="goal-view-modal-content">
            <span class="close" @click="closeSelfFeedbackModal">&times;</span>
            <h2>셀프피드백 작성</h2>
            <p>피드백 내용을 입력하세요:</p>
            <textarea v-model="self.reason" rows="4" cols="50"></textarea>
            <br>
            <button @click="submitSelfFeedback">저장</button>
          </div>
        </div>

        <div v-if="feedbackModalVisible" class="goal-view-modal" @click.stop @keydown.stop>
          <div class="goal-view-modal-content">
            <span class="close" @click="closeFeedbackModal">&times;</span>
            <h2>피드백 작성</h2>
            <p>피드백 내용을 입력하세요:</p>
            <textarea v-model="feedback.comment" rows="4" cols="50"></textarea>
            <br>
            <button @click="submitFeedback">저장</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {apiURL} from "@/services/apiService";
import * as echarts from 'echarts';

// TODO: 날짜선택, 팀 변경
export default {
  name: 'GoalsView',
  data() {
    return {
      teamIndex: 0,
      member: {},
      selectedDate: null,
      chart: null,
      teams: [],
      goals: [],
      feedback: {},
      self: {},
      selfModalVisible: false,
      feedbackModalVisible: false,
      isTutor: false,
    };
  },
  computed: {
    formattedDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  },
  mounted() {
    this.getTeamList();
    this.selectedDate = this.formattedDate;
  },
  methods: {
    getTeamList() {
      axios.get(apiURL + '/team/my-list', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
      }).then((response) => {
        this.teams = response.data;
        this.teamIndex = 0;
        this.setTutorButton();
        this.fetchTasks();
      }).catch((error) => {
        console.log(error);
      });
    },

    fetchTasks() {
      if (this.teams.length === 0) {
        return;
      }

      const formattedDate = new Date().toISOString().split('T')[0]; // 날짜를 'yyyy-MM-dd' 형식으로 변환합니다.
      axios.get(apiURL + '/analysis/team/' + this.teams[this.teamIndex].id + '/date/' + formattedDate, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
      }).then((response) => {
        this.goals = response.data.goalList;
        this.feedback = response.data.feedback;
        this.self = response.data.selfFeedback;

        console.log(response.data);
        if (this.self.reason === null) {
          this.self.reason = '작성된 셀프 피드백이 없습니다.';
        }
        if (this.feedback.comment === null) {
          this.feedback.comment = '작성된 팀장 피드백이 없습니다.';
        }

        this.drawAchievementChart();
      }).catch((error) => {
        console.log(error);
      });
    },

    setTutorButton() {
      if (this.teams[this.teamIndex].gradeName === 'OWNER' ||
          this.teams[this.teamIndex].gradeName === 'MANAGER') {
        this.isTutor = true;
      }
    },

    openFeedbackModal() {
      this.feedbackModalVisible = !this.feedbackModalVisible;
    },

    closeFeedbackModal() {
      this.feedbackModalVisible = !this.feedbackModalVisible;
    },

    deleteFeedback() {
      if (!confirm('피드백을 삭제하시겠습니까?')) {
        return;
      }

      if (this.feedback.id === null) {
        alert('삭제할 피드백이 없습니다.');
        return;
      }

      console.log('deleteFeedback');
      axios.delete(apiURL + '/goal/' + this.teams[this.teamIndex].id + '/feedback/' + this.feedback.id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
      }).then((response) => {
        console.log(response);
        this.feedback = response.data;
        this.closeFeedbackModal();
      }).catch((error) => {
        console.log(error);
      });
    },

    submitFeedback() {
      if (this.feedback.id !== null) {
        axios.put(apiURL + '/goal/' + this.teams[this.teamIndex].id + '/feedback/', {
          id: this.feedback.id,
          teamId: this.teams[this.teamIndex].id,
          comment: this.feedback.comment,
          checkDate: this.selectedDate,
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
          },
        }).then((response) => {
          console.log(response);
          this.feedback = response.data;
          this.closeFeedbackModal();
        }).catch((error) => {
          console.log(error);
        });

        return;
      }

      axios.post(apiURL + '/goal/' + this.teams[this.teamIndex].id + '/feedback', {
        teamId: this.teams[this.teamIndex].id,
        comment: this.feedback.comment,
        checkDate: this.selectedDate,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
      }).then((response) => {
        console.log(response);
        this.feedback = response.data;
        this.closeFeedbackModal();
      }).catch((error) => {
        console.log(error);
      });
    },

    openSelfFeedbackModal() {
      this.selfModalVisible = !this.selfModalVisible;
      console.log(this.selfModalVisible);
    },

    closeSelfFeedbackModal() {
      this.selfModalVisible = !this.selfModalVisible;
    },

    deleteSelfFeedback() {
      if (!confirm('셀프 피드백을 삭제하시겠습니까?')) {
        return;
      }

      if (this.self.id === null) {
        alert('삭제할 셀프 피드백이 없습니다.');
        return;
      }

      console.log('deleteSelfFeedback');
      axios.delete(apiURL + '/goal/' + this.teams[this.teamIndex].id + '/self/' + this.self.id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
      }).then((response) => {
        console.log(response);
        this.self = {reason: '작성된 셀프 피드백이 없습니다.'};
      }).catch((error) => {
        console.log(error);
      });
    },

    submitSelfFeedback() {
      if (this.self.id !== null) {
        axios.put(apiURL + '/goal/' + this.teams[this.teamIndex].id + '/self/', {
          id: this.self.id,
          teamId: this.teams[this.teamIndex].id,
          reason: this.self.reason,
          measure: '123',
          checkDate: this.selectedDate,
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('user-token')}`,
          },
        }).then((response) => {
          console.log(response);
          this.closeSelfFeedbackModal();
        }).catch((error) => {
          console.log(error);
        });

        return;
      }

      axios.post(apiURL + '/goal/' + this.teams[this.teamIndex].id + '/self', {
        teamId: this.teams[this.teamIndex].id,
        reason: this.self.reason,
        measure: '123',
        checkDate: this.selectedDate,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
      }).then((response) => {
        console.log(response);
        this.self = response.data;
        this.closeSelfFeedbackModal();
      }).catch((error) => {
        console.log(error);
      });
    },

    drawAchievementChart() {


      // 목표 이름 및 달성률 데이터 생성
      const names = this.goals.map(goal => goal.title);
      const achievementRates = this.goals.map(goal => {
        if (goal.dailyCheckDtoList !== null) {
          let weekCount = goal.dailyCheckDtoList.length === null ? 0
              : goal.dailyCheckDtoList.length;
          return weekCount / goal.goalCount * 100;
        } else {
          return 0;
        }
      });

      console.log(achievementRates);
      this.initChart(names, achievementRates);
    },

    initChart(names, achievementRates) {
      // 이전 차트 인스턴스를 제거
      this.disposeChart();

      // ECharts 인스턴스 생성
      this.chart = echarts.init(this.$refs.chart);

      // Specify chart configuration
      const option = {
        tooltip: {},
        legend: {
          data: ['달성률']
        },
        xAxis: {},
        yAxis: {
          data: names
        },
        series: [{
          name: '달성률',
          type: 'bar',
          data: achievementRates
        }]
      };

      // Use configuration item and data specified to show chart.
      this.chart.setOption(option);
    },

    disposeChart() {
      if (this.chart) {
        this.chart.dispose(); // 이전 차트 인스턴스 제거
        this.chart = null;
      }
    },

  },
}

</script>

<style scoped>
.tasks {
  display: flex;
  flex-direction: column;
}

.date-picker {
  margin: 20px 0;
}

input[type="date"] {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  padding: 8px 12px;
  color: #333;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input[type="date"]:hover {
  border-color: #999;
}

input[type="date"]:focus {
  border-color: #4a8df8;
  box-shadow: 0 0 5px rgba(74, 137, 248, 0.5);
}

.goals-container {
  display: flex;
  width: 100%;
  height: 100%;
}

.left-side {
  width: 50%;
  padding: 15px;
  box-sizing: border-box;
}

.chart-container {
  width: 600px; /* 차트 너비를 조절합니다. */
  height: 400px; /* 차트 높이를 조절합니다. */
  margin: 0 auto; /* 차트를 중앙에 배치합니다. */
}

.right-side {
  width: 50%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.self-feedback,
.manager-feedback {
  flex: 1;
  padding: 15px;
  box-sizing: border-box;
}

.content {
  font-size: 15px;
  line-height: 1.5;
  text-align: left;
}

.box {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 15px;
}


/* 모달 스타일 */
.goal-view-modal {
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.goal-view-modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
}

/* 닫기 버튼 스타일 */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}


/* 모바일 레이아웃 */
@media (max-width: 767px) {
  .goals-container {
    flex-direction: column;
  }

  .left-side,
  .right-side {
    width: 100%;
  }

  .right-side {
    flex-direction: column;
  }
}

/* 태블릿 레이아웃 */
@media (min-width: 768px) and (max-width: 1024px) {
  .goals-container {
    flex-direction: row;
  }

  .left-side,
  .right-side {
    width: 50%;
  }

  .right-side {
    flex-direction: column;
  }
}

/* 데스크톱 레이아웃 */
@media (min-width: 1025px) {
  .goals-container {
    flex-direction: row;
  }

  .left-side,
  .right-side {
    width: 50%;
  }

  .right-side {
    flex-direction: column;
  }
}

</style>
