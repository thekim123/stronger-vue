<template>
  <div class="tasks">
    <button class="previous-tasks-btn" @click="showDatePicker = !showDatePicker">이전 계획보기</button>
    <div v-if="showDatePicker">
      <date-picker v-model="selectedDate" @close="showDatePicker = false"></date-picker>
    </div>
    <h1>Tasks</h1>
    <div class="week">
      <div class="day" v-for="day in week" :key="day.date">
        <div class="date">{{ day.date }}</div>
        <div class="weekday">{{ day.weekday }}</div>
      </div>
    </div>
    <div class="todays-tasks">
      <h2>Today's Tasks</h2>
      <ul>
        <li v-for="task in todaysTasks" :key="task.id">{{ task.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import DatePicker from "vue3-datepicker";

export default {
  name: "TasksView",
  components: {
    DatePicker,
  },
  setup() {
    const showDatePicker = ref(false);
    const selectedDate = ref(null);

    return {
      showDatePicker,
      selectedDate,
    };
  },
  data() {
    return {
      week: [],
      todaysTasks: [
        {id: 1, title: "Task 1"},
        {id: 2, title: "Task 2"},
        {id: 3, title: "Task 3"},
      ],
    };
  },
  created() {
    this.getWeek();
  },
  methods: {
    getWeek() {
      const today = new Date();
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(date.getDate() + i);

        const day = {
          date: date.getDate(),
          weekday: new Intl.DateTimeFormat("en-US", {weekday: "short"}).format(date),
        };

        this.week.push(day);
      }
    },
  },
};
</script>

<style scoped>
.previous-tasks-btn {
  font-size: 0.8rem;
  margin-bottom: 20px;
}

.tasks {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.week {
  display: flex;
}

.day {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
}

.todays-tasks {
  margin-top: 20px;
}
</style>
