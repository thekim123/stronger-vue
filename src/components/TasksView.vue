
<template>
  <div id="tasks">
    <TodoListBox />
  </div>
</template>

<script>
import TodoListBox from "./TodoListBox.vue";

export default {
  components: {
    TodoListBox,
  },
};
</script>
<style>
#tasks {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>