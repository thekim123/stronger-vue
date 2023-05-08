<template>
  <div class="calendar">
    <div class="datepicker-container">
      <date-picker v-model="selectedDate" @update:modelValue="updateDate" />
    </div>
    <div class="calendar-header">
      <div v-for="dayOfWeek in daysOfWeek" :key="dayOfWeek" class="calendar-day">
        {{ dayOfWeek }}
      </div>
    </div>
    <div class="calendar-body">
      <div
          v-for="(day, index) in days"
          :key="index"
          class="calendar-day"
          :class="{
        'red-text': day.isHoliday || day.isSunday,
        'blue-text': day.isSaturday,
      }"
      >
        <span v-if="day.showMonthYear">{{ day.dateFormatted }}</span>
        <span v-else>{{ day.date.getDate() }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue3-datepicker";

export default {
  name: "CalendarBox",
  components: {
    DatePicker,
  },
  data() {
    return {
      days: [],
      daysOfWeek: ["월", "화", "수", "목", "금", "토", "일"],
      selectedDate: new Date(),
    };
  },
  methods: {
    generateDays() {
      const today = new Date();
      const days = [];
      const holidays = this.getHolidays();

      const firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate() - today.getDay() + 1);

      for (let i = 0; i < 7; i++) {
        const day = new Date(firstDayOfWeek);
        day.setDate(today.getDate() + i);

        const isSunday = day.getDay() === 0;
        const isSaturday = day.getDay() === 6;
        const isHoliday = holidays.some(
            (holiday) => holiday.getTime() === day.getTime()
        );

        const showMonthYear = this.shouldShowMonthYear(i, day);
        const dateFormatted = `${day.getFullYear()}년
        ${day.getMonth() + 1}월 ${day.getDate()}일`;


        days.push({
          date: day, isSunday, isSaturday, isHoliday, showMonthYear, dateFormatted,
        });
      }

      this.days = days;
    },
    getHolidays() {
      // 예시로 2023년 공휴일을 설정합니다.
      const holidays = [
        new Date("2023-01-01"), // 신정
        new Date("2023-02-01"), // 설날
        // 다른 공휴일도 여기에 추가하세요
      ];

      return holidays;
    },

    shouldShowMonthYear(index, day) {
      const previousDay = new Date(day);
      previousDay.setDate(day.getDate() - 1);

      return (
          previousDay.getMonth() !== day.getMonth() ||
          previousDay.getFullYear() !== day.getFullYear()
      );
    },

    updateDate(value) {
      this.selectedDate = value;
      this.generateDays();
    },
  },
  created() {
    this.generateDays();
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

.calendar-header,
.calendar-body {
  display: flex;
  justify-content: center;
}

.calendar-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 60px;
  margin: 0 5px;
  padding: 5px;
  border: none;
  border-radius: 0;
  background-color: transparent;
  box-shadow: none;
}

.calendar-header .calendar-day {
  font-size: 12px;
  height:15px;
  padding: 2px;
  display: grid;
  place-items: center;
  font-weight: bold;
  color: #616161;
}

.calendar-body .calendar-day {
  font-size: 20px;
  height: 30px;
  padding: 2px;
  border-bottom: 1px solid #e0e0e0;
}

.calendar-body .calendar-day:last-child {
  border-bottom: none;
}

.red-text {
  color: #ff5252;
}

.blue-text {
  color: #2196f3;
}

.datepicker-container {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
