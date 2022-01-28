<template>
  <div class=stats_container>
      <div class="stats_bloc" id="member">
          <h3>Membres</h3>
          <p>{{member}}</p>
      </div>
      <div class="stats_bloc" id="post">
          <h3>Posts</h3>
          <p>{{post}}</p>
      </div>
      <div class="stats_bloc" id="comment">
          <h3>Comments</h3>
          <p>{{comment}}</p>
      </div>
  </div>
</template>

<script>
export default{
  data () {
    return {
      member: '',
      post: '',
      comment : '',
    }
  },
  mounted () {
  // call & display stats
    this.$axios
      .get('stats/member')
      .then(response => (this.member = response.data))

    this.$axios
      .get('stats/post')
      .then(response => (this.post= response.data))

    this.$axios
      .get('stats/comment')
      .then(response => (this.comment= response.data))
  }
}
</script>
