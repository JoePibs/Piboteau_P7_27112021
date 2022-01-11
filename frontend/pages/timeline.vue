<template >
    <b-container >
      
        <b-row class="timelineBlock">
            <b-col class="visibility">
                <h2> Mes posts récents </h2>
              <div class="contentMore">
                <MyPost class="myPosts" v-for="myPost in myPosts" :key="myPost.id" :myPost="myPost"/>
              </div>
              <h2> Les stats de la famille </h2>
              <div class="contentMore">
                <stats/>
              </div>
            </b-col>
              

            <b-col cols="5" class= "visibility-principal" ><postsTimeline  /></b-col>

            <b-col class="visibility">
              <h2> Les posts les plus commentés </h2>
              <div class="contentMore">
                <Most class="mostPosts" v-for="mostPost in mostPosts" :key="mostPost.id" :mostPost="mostPost"/>
              </div>
                <h2> Les posts que j'ai commentés </h2>
              <div class="contentMore">
                <PostIcommented class="postIcommented" v-for="postIcommented in postIcommenteds" :key="postIcommented.id" :postIcommented="postIcommented"/>
              </div>
            </b-col>
        </b-row>
</b-container>
</template>

<script>
import postsTimeline from '../components/postsTimeline.vue'
import Most from '../components/mostCommentedPost.vue'
import PostIcommented from '../components/postCommented.vue'
import MyPost from '../components/myPost.vue'
import stats from '../components/stats.vue'

export default {
  components: { postsTimeline, Most, MyPost, stats, PostIcommented },
  name: 'timeline',
  data () {
      return {
      postIcommenteds:[],
      mostPosts:[],
      myPosts:[],
      user:"",

      }
    },

  mounted(){
   

    this.user = localStorage.getItem('userId')

    this.$axios
      .$get('post/mostcommented')
      .then((mostPosts) => {
        this.mostPosts = mostPosts
      })

     this.$axios
      .$get(`auth/${this.user}/commentedby`)
      .then((postIcommenteds) => {
        this.postIcommenteds = postIcommenteds
        console.log(postIcommenteds)
      
      })

    this.$axios
      .$get(`post/${this.user}/userposts`)
      .then((myPosts) => {
        this.myPosts = myPosts
      })
  },
}
</script>

<style>
.hidden{
  display: none;
}
.contentMore {
  width: 100%;
  height: 280px;
  overflow: auto;
  border:#5b9d7f44 1px dashed;
  box-shadow: #5b9d7f29 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  padding:10px;
  margin-bottom :20px;
}

.visibility-principal{
  height: 600px;
  overflow: auto;
  margin: 0px 10px 0px 10px;
}

.contentMore .stats_bloc{
  width: 40%;
}

.contentMore .stats_bloc h3{
  font-size :14px;
}

.contentMore .stats_bloc p{
  font-size :35px;
  margin: 0px 0px 0px 0px;
  text-align: center;
}
</style>