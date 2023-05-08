<template>
  <div class="home">
    <h1>Welcome to My Self-Management App!</h1>
    <p>Start managing your tasks and goals now.</p>
    <button @click="goToTasks">Go to Tasks</button>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    goToTasks() {
      // 여기에 태스크 페이지로 이동하는 로직을 구현하세요.
    }
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 40px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>
