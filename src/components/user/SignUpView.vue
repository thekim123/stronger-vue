<template>
  <div class="signup">
    <h2>회원가입</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">아이디:</label>
        <input type="text" id="username" v-model="username"/>
      </div>
      <div>
        <label for="nickname">닉네임:</label>
        <input type="text" id="nickname" v-model="nickname"/>
      </div>
      <div>
        <label for="email">이메일:</label>
        <input type="email" id="email" v-model="email"/>
      </div>
      <div>
        <label for="password">비밀번호:</label>
        <input type="password" id="password" v-model="password"/>
      </div>
      <div>
        <label for="password-confirm">비밀번호 확인:</label>
        <input type="password" id="password-confirm" v-model="passwordConfirm"/>
      </div>
      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      passwordConfirm: '',
      username: '',
      email: '',
      password: '',
      nickname: '',
    };
  },
  methods: {
    submitForm() {
      const dto = {
        username: this.username,
        email: this.email,
        password: this.password,
        birthday: new Date(),
        nickname: this.nickname,
      };

      axios.post(`${process.env.VUE_APP_API_HOST}:${process.env.VUE_APP_API_PORT}/user/join`,
          dto, {
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(() => {
        this.$router.push('/login');
      }).catch((error) => {
        console.error(error);
      });
    },
  },
};
</script>

<style scoped>
.signup {
  /* 원하는 스타일 적용 */
}
</style>
