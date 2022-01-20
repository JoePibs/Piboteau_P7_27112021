<template >
    <b-container >
      
        <b-row class="timelineBlock">
            <b-col class="visibility">
                <h2> Mes posts récents </h2>
                <div v-if="myPosts.length === 0" class="noContentMore">
                <img id="shame" src="@/assets/shame.png" alt="licorne on Shame">
                <p >Vous n'avez encore rien publié ? </p>
              </div>
              <div v-else class="contentMore">
                <MyPost class="myPosts" v-for="myPost in myPosts" :key="myPost.id" :myPost="myPost"/>
              </div>
              <h2> Les stats de la famille </h2>
              <div class="contentMore">
                <stats/>
              </div>
            </b-col>
              

            <b-col cols="5" class= "visibility-principal" >
              <div>
                <createPost/>
                <div class="realtimeline">
                  <Posts  class="posts" v-for="post in posts" :key="post.id" :post="post"/>
                </div>
              </div>
            </b-col>

            <b-col class="visibility">
              <h2> Les posts les plus commentés </h2>
              <div class="contentMore">
                <Most class="mostPosts" v-for="mostPost in mostPosts" :key="mostPost.id" :mostPost="mostPost"/>
              </div>
                <h2> Les posts que j'ai commentés </h2>
              <div v-if="postIcommenteds.length === 0" class="noContentMore">
                <img src="@/assets/echec_licorne.png" alt="licorne sauteuse">
                <p >Vous n'avez pas encore commenté de post </p>
              </div>
              <div v-else class="contentMore">
                <PostIcommented class="postIcommented" v-for="postIcommented in postIcommenteds" :key="postIcommented.id" :postIcommented="postIcommented"/>
              </div>
            </b-col>
        </b-row>
</b-container>
</template>

<script>
import Most from '../components/mostCommentedPost.vue'
import PostIcommented from '../components/postCommented.vue'
import MyPost from '../components/myPost.vue'
import stats from '../components/stats.vue'
import createPost from'../components/createPost.vue'
import Posts from '../components/posts.vue'

export default {
  components: { Most, MyPost, stats, PostIcommented,createPost,Posts },
  name: 'timelinecomposition',
  data () {
      return {
      postIcommenteds:[],
      mostPosts:[],
      myPosts:[],
      posts: [],
      loading: true
      }
    },

  mounted(){ 
    let userconnected = this.$store.state.auth.loggedIn
    console.log(userconnected)
    if (localStorage.getItem('userId')===null) {
      setTimeout(function(){
        window.location.reload();
      }, 1);
    }

    this.refresh()

    this.$axios
      .$get('post')
      .then((posts) => {
        this.posts = posts
        this.loading = false
      })
  },
  methods:{
    refresh(){
      
      this.$axios
        .$get('post/mostcommented')
        .then((mostPosts) => {
          this.mostPosts = mostPosts
        })

      this.$axios
        .$get(`auth/commentedby`)
        .then((postIcommenteds) => {
          this.postIcommenteds = postIcommenteds
        
        })

      this.$axios
        .$get(`post/userposts`)
        .then((myPosts) => {
          this.myPosts = myPosts
        })
    
      }
  }
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
.noContentMore {
  width: 100%;
  height: auto;
  border:#5b9d7f44 1px dashed;
  box-shadow: #5b9d7f29 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  padding:10px;
  margin-bottom :20px;
  text-align: center;
  vertical-align: center;
  
}
.noContentMore p{
  color:#5b9d7f;
  font-size : 20px;
  text-align:center;
}
.noContentMore img{
 height: 80px;
 width: 80px;
}
#shame{
  height: 80px;
  width: 200px;
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
h2{
  color: rgb(211, 11, 88);
  font-size : 18px;

}
</style>