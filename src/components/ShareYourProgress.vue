<template>
  <div class="content">
    <h1>Share Your Progress</h1>
    <div class="post-container">
      <PostBox v-for="post in posts" :key="post.id" :post="post"/>
<!--      <PostBox/>-->
    </div>
  </div>
</template>

<script>
import PostBox from "./PostBox.vue";


export default {
  name: "ShareYourProgress",
  components: {
    PostBox,
  },
  data() {
    return {
      posts: [
        {
          id: 1,
          title: "Example Post 1",
          content: "This is an example post.",
          comments: [
            { id: 1, content: "This is an example comment 1." },
            { id: 2, content: "This is an example comment 2." },
          ],
        },
        {
          id: 2,
          title: "Example Post 2",
          content: "This is another example post.",
          comments: [
            { id: 3, content: "This is an example comment 3." },
            { id: 4, content: "This is an example comment 4." },
          ],
        },
      ],
    };
  },
  created() {
    // 주석 처리된 axios 코드는 나중에 API 호출을 구현할 때 사용하세요.
    // axios
    //   .get("https://api.example.com/posts") // API 엔드포인트를 사용하세요.
    //   .then((response) => {
    //     this.posts = response.data;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  },
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>