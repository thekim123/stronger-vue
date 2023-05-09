<template>
  <div id="app">
    <header>
      <NavBar/>
    </header>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
  color: #2c3e50;
}

header {
  width: 100%;
}

main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: start;
  text-align: center;
}
</style>
