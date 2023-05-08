<template>
  <div class="tasks">
    <div>
      <date-picker v-model="selectedDate" @close="showDatePicker = false"></date-picker>
    </div>
    <h1>Tasks</h1>
    <div class="week">
      <div class="day" v-for="day in week" :key="day.date">
        <div class="date">{{ day.date }}</div>
        <div class="weekday">{{ weekdays[day.weekday] }}</div>
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
    const weekdays = ref([]);

    function openDatePicker() {
      showDatePicker.value = true;
    }

    function getWeek() {
      const today = new Date();
      const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

      const week = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(date.getDate() + i);

        const day = {
          date: date.getDate(),
          weekday: date.getDay(),
        };

        week.push(day);
      }

      return week;
    }

    function formatWeekday(date) {
      const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
      return weekday.substring(0, 3);
    }

    function getWeekday() {
      const selected = new Date(selectedDate.value);
      const week = getWeek();
      const weekdaysArray = week.map((day) => formatWeekday(new Date(selected.getFullYear(), selected.getMonth(), day.date)));
      weekdays.value = weekdaysArray;
    }

    return {
      showDatePicker,
      selectedDate,
      weekdays,
      openDatePicker,
    };
  },
  data() {
    return {
      todaysTasks: [
        { id: 1, title: "Task 1" },
        { id: 2, title: "Task 2" },
        { id: 3, title: "Task 3" },
      ],
    };
  },
  created() {
    this.week = this.getWeek();
  },
  watch: {
    selectedDate() {
      this.getWeekday();
    },
  },
};
</script>

<style scoped>
.tasks {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.week {
  display: flex;
  margin-top: 20px;
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

.task {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.task-check {
  margin-right: 10px;
}

.task-title {
  flex: 1;
}
</style>

