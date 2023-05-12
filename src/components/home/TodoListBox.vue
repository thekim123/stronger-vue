<template>
  <div class="calendar box">
    <div class="calendar-title">
      {{ formatDate(selectedDate) }}의 TodoList
    </div>
    <ul class="todo-list">
      <!-- 여기에 할 일 목록을 추가할 수 있습니다 -->
      <li v-for="(todo, index) in todos" :key="index">
        <span :class="{ completed: todo.dailyCheck?.isCompleted }">{{ todo.title }}</span>
        <input type="checkbox" :checked="todo.dailyCheck?.isCompleted" @change="toggleCompleted(todo)"/>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      apiUrl: `${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}`,
      isRequestPending: false,  // 요청 진행 상태를 추적하는 속성
      selectedDate: new Date(),
      todos: [],
    };
  },
  methods: {
    formatDate(date) {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${month}월 ${day}일`;
    },
    //TODO 이거 버그 있음. 막 누르면 잘 안됨.
    async toggleCompleted(todo) {
      if (this.isRequestPending) {
        // 이전 요청이 아직 처리 중이면 새 요청을 보내지 않음
        return;
      }
      this.isRequestPending = true;  // 요청 시작을 표시
      if (!todo.dailyCheck) {
        // dailyCheck가 없을 경우 새로 생성
        todo.dailyCheck = {
          isCompleted: true,
          // 다른 필요한 속성들도 이곳에 초기화
        };
        // POST 요청을 보내서 서버에 반영
        await axios.post(`${this.apiUrl}/goal/${todo.id}/daily`, null, {
          // 다른 필요한 정보들도 이곳에 전달
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
          }
        });

      } else {
        // dailyCheck가 있을 경우 isCompleted 상태 반전
        todo.dailyCheck.isCompleted = !todo.dailyCheck.isCompleted;
        // PUT 요청을 보내서 서버에 반영
        await axios.delete(`${this.apiUrl}/goal/${todo.id}/daily`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
          }
        });
      }
      // 모든 요청이 완료된 후에만 `isRequestPending`를 `false`로 설정
      console.log(this.isRequestPending);
      this.isRequestPending = false;
      console.log(this.isRequestPending);
    }
  },
  mounted() {
    // 여기에 API를 호출하는 코드를 작성하세요.
    // API 호출이 성공하면 todos에 할 일 목록을 저장하세요.
    // API 호출이 실패하면 에러 메시지를 출력하세요.
    axios.get(this.apiUrl + '/goal/todo-list', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
      },
    }).then(response => {
      console.log(response);
      this.todos = response.data;
    }).catch(error => {
      console.log(error);
    });

  },
}
;
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
