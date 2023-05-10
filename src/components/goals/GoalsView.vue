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
            효냥이의 간식을 뺏어먹으려고 했다.<br/>
            하지만 실패했다.<br/>
            다음에는 더 빨리 먹어야겠다.<br/>
          </div>
        </div>
        <div class="manager-feedback box">
          <h2>팀장 피드백</h2>
          <div class="manager-feedback content">
            효냥이의 간식을 탐내지마라!!.<br/>
            다음에는 더 빨리 너를 적발할거야.<br/>
            각오해.<br/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import {ref} from "vue";

export default {
  setup() {
    const selectedDate = ref('');
    const tasks = ref(null);

    const fetchTasks = () => {
      // 서버에서 선택한 날짜의 데이터를 가져옵니다.
      // 이 예제에서는 가상 데이터를 사용합니다.
      tasks.value = {
        plans: [
          {title: 'Plan 1', completion: 100},
          {title: 'Plan 2', completion: 80}
        ],
        feedback: 'Great job today!'
      };
    };

    return {
      selectedDate,
      tasks,
      fetchTasks
    };
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.drawAchievementChart();
  },
  methods: {
    drawAchievementChart() {
      const ctx = document.getElementById('achievement-chart').getContext('2d');

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['목표 1', '목표 2', '목표 3'],
          datasets: [
            {
              label: '달성률',
              data: [75, 50, 90],
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
            }
          ]
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
  }
};
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
