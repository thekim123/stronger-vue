<!-- GoalList.vue -->
<template>
  <div>
    <h3>Goals</h3>
    <ul>
      <li v-for="(goal, index) in goals" :key="index" class="list-group-item">
        <div class="d-flex justify-content-between align-items-center">
          <div v-if="editable" class="btn-group ms-3" role="group">
            <input v-model="goal.title">
            <input v-model="goal.content">
            <span>{{ goal.actionCount }}</span>
            <input v-model="goal.goalCount">
            <button @click="editGoal(goal)" class="btn btn-outline-primary">편집</button>
            <button @click="deleteGoal(goal.id)" class="btn btn-outline-danger">삭제</button>
          </div>
        </div>
      </li>
    </ul>

    <div class="mt-3">
      <input v-model="newGoalTitle" type="text" class="form-control" placeholder="새로운 목표 제목을 입력하세요">
      <input v-model="newGoalContent" type="text" class="form-control" placeholder="새로운 목표 설명을 입력하세요">
      <input v-model="goalCount">
      <button @click="addGoal" class="btn btn-primary mt-3">추가</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GoalListBox",
  props: {
    goals: Array,
    editable: Boolean,
    teamId: String,
  },
  data() {
    return {
      apiUrl: `${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}`,
      newGoalTitle: "",
      newGoalContent: "",
      goalCount: 0,
    };
  },
  methods: {
    editGoal(goal) {
      console.log(goal.title);
      if (confirm("수정하시겠습니까?")) {
        axios.put(this.apiUrl + "/goal", goal, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
          },
        }).then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error);
        });
      }
    },

    deleteGoal(index) {
      if(!confirm("삭제하시겠습니까?")){
        return;
      }

      this.$emit('delete-goal', index);

      axios.delete(this.apiUrl + "/goal/" + index, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
        }
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    },

    addGoal() {
      if (this.newGoalTitle.trim()) {
        const data = {
          title: this.newGoalTitle,
          content: this.newGoalContent,
          goalCount: this.goalCount,
          teamId: this.teamId,
        };

        axios.post(this.apiUrl + '/goal', data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
          },
        }).then((response) => {
          console.log(response);
          this.$emit('add-goal', response.data);
        }).catch((error) => {
          console.log(error);
        });
      }
    },


  },
};
</script>
