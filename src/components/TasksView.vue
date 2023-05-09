<template>
  <div class="tasks">
    <div class="date-picker">
      <input type="date" v-model="selectedDate" @change="fetchTasks" />
    </div>
    <div class="task-details" v-if="tasks">
      <h2>{{ selectedDate }}의 계획</h2>
      <div class="task-list">
        <!-- 계획 목록 및 완수율을 여기에 추가 -->
      </div>
      <div class="feedback">
        <h2>피드백</h2>
        <!-- 피드백 내용을 여기에 추가 -->
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const selectedDate = ref('');
    const tasks = ref(null);

    const fetchTasks = () => {
      // 서버에서 선택한 날짜의 데이터를 가져옵니다.
      // 이 예제에서는 가상 데이터를 사용합니다.
      tasks.value = {
        plans: [
          { title: 'Plan 1', completion: 100 },
          { title: 'Plan 2', completion: 80 }
        ],
        feedback: 'Great job today!'
      };
    };

    return {
      selectedDate,
      tasks,
      fetchTasks
    };
  }
};
</script>
<style scoped>
.tasks {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.date-picker {
  margin: 20px 0;
}

.task-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.task-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feedback {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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

</style>
