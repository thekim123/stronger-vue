<template>
  <div class="tasks">
    <div class="date-picker">
      <input type="date" v-model="selectedDate" @change="fetchTasks"/>
    </div>
    <div class="goals-container">
      <div class="left-side box">
        <h2>목표 목록</h2>
        <div class="chart-container">
          <canvas id="achievement-chart" class=""></canvas>
        </div>
      </div>
      <div class="right-side">
        <div class="self-feedback box">
          <h2>셀프 피드백</h2>
          <div class="self-feedback content">
            <!--          <input v-model="member.selfFeedback.title">-->
            <!--          <span>{{ // self.content }}</span>-->
          </div>
        </div>


        <div class="manager-feedback box">
          <h2>팀장 피드백</h2>
          <div class="manager-feedback content">
            <!--        <input v-model="member.feedback.title">-->
            <!--        <span>{{ member.feedback.content }}</span>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import axios from "axios";
import {apiURL} from "@/services/apiService";

export default {
  name: 'GoalsView',
  data() {
    return {
      teamIndex: 0,
      member: {},
      selectedDate: new Date(),
      chart: null,
      teams: [],
      goals: [],
    };
  },
  mounted() {
    this.getTeamList();
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
        console.log(this.teams);
        this.fetchTasks();
      }).catch((error) => {
        console.log(error);
      });
    },

    fetchTasks() {
      // 이전 차트가 있으면 파괴
      if (this.chart) {
        this.chart.destroy();
      }

      if (this.teams.length === 0) {
        return;
      }

      axios.get(apiURL + '/goal/team/' + this.teams[this.teamIndex].id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
      }).then((response) => {
        this.goals = response.data;
        console.log('member');
        console.log(this.goals);
        this.drawAchievementChart();
      }).catch((error) => {
        console.log(error);
      });
    },

    drawAchievementChart() {
      // 이전 차트가 있으면 파괴
      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = document.getElementById('achievement-chart').getContext('2d');

      // 목표 이름 및 달성률 데이터 생성
      const names = this.goals.map(goal => goal.title);
      const achievementRates = this.goals.map(goal => {
        if (goal.dailyCheck !== null) {
          return goal.dailyCheck.length / goal.goalCount * 100;
        } else {
          return 0;
        }
      });

      console.log(achievementRates);
      // Chart.js를 사용하여 차트 생성
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: names,
          datasets: [{
            label: '달성률',
            data: achievementRates,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'y',
          scales: {
            x: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
    }
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
  width: 80%; /* 차트 너비를 조절합니다. */
  height: 200px; /* 차트 높이를 조절합니다. */
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
