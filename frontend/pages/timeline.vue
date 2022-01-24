<template >
    <b-container >
      
        <b-row class="timelineBlock">
            <b-col class="visibility">
                <h2> Mes posts récents </h2>
                <div v-if="myPosts.length === 0" class="noContentMore">
                <img id="shame" src="@/assets/images/shame.png" alt="licorne on Shame">
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
                <img src="@/assets/images/echec_licorne.png" alt="licorne sauteuse">
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
import Posts from '../components/post.vue'

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
   

    if(this.$store.state.auth.loggedIn === false){
      this.$router.push('/');
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

