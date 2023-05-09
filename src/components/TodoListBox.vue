<template>
  <div class="calendar box">
    <div class="calendar-title">
      {{ formatDate(selectedDate) }}의 TodoList
    </div>
    <ul class="todo-list">
      <!-- 여기에 할 일 목록을 추가할 수 있습니다 -->
      <li v-for="(todo, index) in todos" :key="index">
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <input type="checkbox" @change="toggleCompleted(todo)" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: new Date(),
      todos: [
        {text: "효냥이 츄르주기", completed: false},
        {text: "효진이와 산책하기", completed: false},
        {text: "효진이 몰래 맥주마시기", completed: false},
      ],
    };
  },
  methods: {
    formatDate(date) {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${month}월 ${day}일`;
    },
    toggleCompleted(todo) {
      todo.completed = !todo.completed;
    },
  },
};
</script>

<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Arial", sans-serif;
}

.calendar-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.todo-list {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.todo-list li {
  font-size: 18px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.todo-list input[type="checkbox"] {
  margin-right: 10px;
}


.todo-list .completed {
  text-decoration: line-through;
  color: #ccc;
}

.completed::before {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #ccc;
  top: 50%;
}

.box {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 15px;
}
</style>
