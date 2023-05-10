<template>
  <div class="login-container">
    <h2 class="login-header">Login</h2>
    <form @submit.prevent="submitLoginForm">
      <input
          v-model="username"
          placeholder="username"
          required
          class="login-input"
      />
      <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
          class="login-input"
      />
      <br/>
      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async submitLoginForm() {
      try {
        // 로그인 API 요청
        const response = await axios.post(`${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/login`, {
          username: this.username,
          password: this.password,
        });

        // JWT 토큰 저장
        const token = response.headers.getAuthorization();
        localStorage.setItem("user-token", token);

        // 다른 페이지로 이동 또는 메인 페이지 새로고침
        this.$router.push("/");
      } catch (error) {
        console.error("로그인 오류:", error);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: transparent;
}

.login-header {
  color: #42b983;
  font-size: 24px;
  margin-bottom: 24px;
}

.login-input {
  width: 100%;
  max-width: 400px;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid #42b983;
  background-color: transparent;
  color: #42b983;
  font-size: 16px;
  outline: none;
}

.login-input::placeholder {
  color: #42b983;
}


.login-input:focus {
  border-color: #4a8df8;
  box-shadow: 0 0 5px rgba(74, 137, 248, 0.5);
}

.login-button {
  background-color: #42b983;;
  border: none;
  color: white;
  padding: 12px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 8px 0;
  cursor: pointer;
  border-radius: 10px;
}
</style>
