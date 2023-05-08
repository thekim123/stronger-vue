<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
// import HomeView from './components/HomeView.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    // HomeView,
    NavBar,
  }
}
</script>
