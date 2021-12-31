<template>
<div class=stats_container>
    <h2>La famille Groupomania grandit</h2>
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
import axios from 'axios'
export default{
  data () {
    return {
      member: '',
      post: '',
      comment : '',
    }
  },
  mounted () {
    axios
      .get('http://localhost:8080/api/stats/member')
      .then(response => (this.member = response.data))

    axios
      .get('http://localhost:8080/api/stats/post')
      .then(response => (this.post= response.data))

    axios
      .get('http://localhost:8080/api/stats/comment')
      .then(response => (this.comment= response.data))
  }
}



</script>

<style>
.stats_container{
    width: 90%;
    margin : 0px auto 20px auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.stats_bloc{
    width: 40%;
    padding:20px;
    border: solid 1px #5b9d7f;
    border-radius : 5px;
    box-shadow: #5b9d7f79 0px 10px 20px, #5b9d7f81 0px 6px 6px;
    margin : 20px auto 20px auto;
}
.stats_bloc h3{
    font-size : 18px;
    color: white;
    text-align: center;
}

.stats_bloc p{
    font-size : 24px;
    color: #5b9d7f;
}
</style>