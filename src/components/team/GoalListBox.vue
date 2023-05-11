<!-- GoalList.vue -->
<template>
  <div>
    <h3>Goals</h3>
    <ul>
      <li v-for="(goal, index) in goals" :key="index" class="list-group-item">
        <div class="d-flex justify-content-between align-items-center">
          <span>{{ goal.title }}</span>
          <div v-if="editable" class="btn-group ms-3" role="group">
            <button v-if="!goal.isEditing" @click="editGoal(goal)" class="btn btn-outline-primary">
              편집
            </button>
            <button @click="deleteGoal(index)" class="btn btn-outline-danger">삭제</button>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="editable" class="mt-3">

      <input v-model="newGoal" placeholder="새 목표 추가" class="form-control"/>
      <Datepicker v-model="startDate"/>
      <Datepicker v-model="endDate"/>
      <input v-model="goalCount">
      <button @click="addGoal" class="btn btn-primary mt-2">추가</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Datepicker from "vue3-datepicker";

export default {
  name: "GoalListBox",
  components: {
    Datepicker,
  },
  props: {
    goals: Array,
    editable: Boolean,
    teamId: String,
  },
  data() {
    return {
      apiUrl: `${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}`,
      newGoal: "",
      goalCount: 0,

      // 날짜 선택을 위한 변수
      startDate: new Date(),
      endDate: new Date(),
    };
  },
  methods: {
    editGoal(goal) {
      goal.isEditing = true;
    },
    deleteGoal(index) {
      this.$emit('delete-goal', index);
    },
    addGoal() {
      if (this.newGoal.trim()) {
        this.$emit('add-goal', {name: this.newGoal, isEditing: false});

        const data = {
          title: this.newGoal,
          content: this.newGoal,
          goalCount: this.goalCount,
          teamId: this.teamId,
          startDate: this.startDate,
          endDate: this.endDate,
        };

        const response = axios.post(this.apiUrl + '/plan', data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
          },
        });
        console.log(response);

      }
    },
  },
};
</script>
