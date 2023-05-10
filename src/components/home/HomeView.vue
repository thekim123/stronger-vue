<template>
  <div class="home">
    <h1><img class="home-badge" src="@/assets/badge-beginner.png" alt="뱃지" />{{ userNickname }}님, 힘내세요!</h1>
    <p>한걸음 한걸음 목표에 다가가는 중이에요</p>
    <TodoListBox/>
  </div>
  <div>

  </div>
</template>

<script>
import TodoListBox from "./TodoListBox.vue";
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    TodoListBox,
  },
  methods: {
  },

  setup() {
    const store = useStore();
    const userNickname = computed(() => store.state.user.nickname);

    return {
      userNickname
    };
  },

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

.home-badge{
  width: 50px;
}
</style>
