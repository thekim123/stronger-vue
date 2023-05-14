<template>
  <div class="profile-container">
    <h2 class="profile-header">User Profile</h2>
    <form @submit.prevent="submitUpdateForm">
      <label for="username" class="profile-label">Username</label>
      <input
          type="text"
          id="username"
          v-model="user.username"
          required
          class="profile-input"
      />

      <label for="nickname" class="profile-label">Nickname</label>
      <input
          type="text"
          id="nickname"
          v-model="user.nickname"
          required
          class="profile-input"
      />

      <label for="email" class="profile-label">Email</label>
      <input
          type="email"
          id="email"
          v-model="user.email"
          required
          class="profile-input"
      />

      <label for="password" class="profile-label">New Password</label>
      <input
          type="password"
          id="password"
          v-model="user.password"
          class="profile-input"
      />

      <label for="confirmPassword" class="profile-label">Confirm New Password</label>
      <input
          type="password"
          id="confirmPassword"
          v-model="this.confirmPassword"
          class="profile-input"
      />

      <button type="submit" class="profile-button">Update Profile</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import {apiURL} from "@/services/apiService";

export default {
  name: 'UserProfileView',
  data() {
    return {
      user: {},
      confirmPassword: '',
    };
  },
  mounted() {
    axios.get(apiURL + '/user/profile', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('user-token')}`,
      },
    })
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
  },
  methods: {
    submitUpdateForm() {
      // 여기에서 회원 정보 수정 API 호출을 구현합니다.
      console.log('user:', this.user);
      console.log('Confirm New Password:', this.confirmPassword);
      if (confirm('회원 정보를 수정하시겠습니까?') === false) return;
      if (this.user.password !== this.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      axios.put(apiURL + '/user/profile', this.user, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('user-token')}`,
        },
      }).then((response) => {
        alert('회원 정보가 수정되었습니다.');
        console.log(response);
        this.$router.push({path: '/'});
      }).catch((error) => {
        console.log(error);
      });

    },
  },
};
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.profile-header {
  color: #333;
  font-size: 24px;
  margin-bottom: 24px;
}

.profile-label {
  display: block;
  color: #333;
  font-size: 16px;
  margin-bottom: 8px;
}

.profile-input {
  width: 100%;
  max-width: 400px;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: #333;
  font-size: 16px;
  outline: none;
}

.profile-button {
  background-color: #4a8df8;
  border: none;
  color: white;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 16px 0;
  cursor: pointer;
  border-radius: 5px;
}
</style>

