<template>
  <div class="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <div class="post-actions">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
      <button class="share-btn">Share</button>
    </div>
    <CommentBox :comments="post.comments"/>
  </div>
</template>


<script>
// import axios from "axios";
import CommentBox from "./CommentBox.vue";

export default {
  name: "PostBox",
  props: {
    post: Object,
  },
  components: {
    CommentBox,
  },
  created() {
    // axios
    //     .get("https://api.example.com/posts") // API 엔드포인트를 사용하세요.
    //     .then((response) => {
    //       this.posts = response.data;
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
  },
};
</script>

<style scoped>
.post {
  background-color: #f8f8f8;
  border-radius: 4px;
  padding: 24px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  border: 1px solid #ccc;
}

.post-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.edit-btn,
.delete-btn {
  background-color: transparent;
  color: #42b983;
  border: none;
  cursor: pointer;
  font-weight: bold;
  margin-left: 8px;
}

.edit-btn:hover,
.delete-btn:hover {
  color: #2c3e50;
}

h2 {
  margin-top: 0;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: #2c3e50;
}

</style>
