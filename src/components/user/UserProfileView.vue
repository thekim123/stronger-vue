<template>
  <div class="profile-container">
    <h2 class="profile-header">User Profile</h2>
    <form @submit.prevent="submitUpdateForm">
      <label for="name" class="profile-label">Name</label>
      <input
          type="text"
          id="name"
          v-model="name"
          required
          class="profile-input"
      />

      <label for="email" class="profile-label">Email</label>
      <input
          type="email"
          id="email"
          v-model="email"
          required
          class="profile-input"
      />

      <label for="password" class="profile-label">New Password</label>
      <input
          type="password"
          id="password"
          v-model="password"
          class="profile-input"
      />

      <label for="confirmPassword" class="profile-label">Confirm New Password</label>
      <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          class="profile-input"
      />

      <button type="submit" class="profile-button">Update Profile</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UserProfileView',
  data() {
    return {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    submitUpdateForm() {
      // 여기에서 회원 정보 수정 API 호출을 구현합니다.
      console.log('Name:', this.name);
      console.log('Email:', this.email);
      console.log('New Password:', this.password);
      console.log('Confirm New Password:', this.confirmPassword);
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
</style >

