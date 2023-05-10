<template>
  <div className="comment-box">
    <div class="comment" v-for="comment in comments" :key="comment.id">
      <p>{{ comment.content }}</p>
    </div>
    <form className="comment-form">
      <input type="text" placeholder="Write a comment..."/>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "CommentBox",
  props: {
    comments: Array,
  },
};
</script>

<style scoped>
.comment-box {
  margin-top: 24px;
  border-top: 1px solid #ccc;
  padding-top: 16px;
}

.comment {
  margin-bottom: 16px;
}

.comment-form {
  display: flex;
}

input[type="text"] {
  flex-grow: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin-right: 8px;
}

button[type="submit"] {
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #2c3e50;
}
</style>
