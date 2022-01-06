<template>

  <div>
    <createPost/>
    <Posts  class="posts" v-for="post in posts" :key="post.id" :post="post"/>
  </div>
    
</template>

<script>
import createPost from'./createPost.vue'
import Posts from './posts.vue'

export default{
  components:{ createPost,Posts },
  data () {
    return {
      posts: [
      ],
      loading: true
    }
  },
  mounted() {
    this.$axios
      .$get('post')
      .then((posts) => {
        this.posts = posts
        this.loading = false
        vm.$forceUpdate();
      })
  },
}

</script>


<style>

</style>