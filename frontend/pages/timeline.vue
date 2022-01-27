<template >
    <b-container >
        <div class="menu" >
            <div class="mytimeline" @click="displayedTimeline">Ma timeline</div>
            <div class="recent" @click="displayedRecent" >Mes Posts récents</div>
            <div class="commented" @click="displayedCommented ">Posts commentés </div>
        </div>
        <b-row class="timeline_bloc" >
            <b-col class="recent_post" :class="{displayedrecent}">
                <h2 class="subtitle"> Mes posts récents </h2>
                <div v-if="myPosts.length === 0" class="nocontent_more">
                <img id="shame" src="@/assets/images/shame.png" alt="licorne on Shame">
                <p >Vous n'avez encore rien publié ? </p>
              </div>
              <div v-else class="content_more">
                <MyPost class="my_posts" v-for="myPost in myPosts" :key="myPost.id" :myPost="myPost"/>
              </div>
              <h2 class="subtitle"> Les stats de la famille </h2>
              <div class="content_more">
                <stats/>
              </div>
            </b-col>
              

            <b-col cols="5" class= "timeline_view" :class="{displayedtimeline}" >
              <div>
                <createPost/>
                <div class="realtimeline">
                  <Posts  class="posts" v-for="post in posts" :key="post.id" :post="post"/>
                </div>
              </div>
            </b-col>

            <b-col class="commented_post" :class="{displayedcommented}" >
              <h2 class="subtitle"> Les posts les plus commentés </h2>
              <div class="content_more">
                <Most class="most_posts" v-for="mostPost in mostPosts" :key="mostPost.id" :mostPost="mostPost"/>
              </div>
                <h2 class="subtitle"> Les posts que j'ai commentés </h2>
              <div v-if="postIcommenteds.length === 0" class="nocontent_more">
                <img src="@/assets/images/echec_licorne.png" alt="licorne sauteuse">
                <p >Vous n'avez pas encore commenté de post </p>
              </div>
              <div v-else class="content_more">
                <PostIcommented class="post_i_commented" v-for="postIcommented in postIcommenteds" :key="postIcommented.id" :postIcommented="postIcommented"/>
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
  components: { Most, MyPost, stats, PostIcommented,createPost,Posts},
  name: 'timelinecomposition',
  data () {
      return {
      postIcommenteds:[],
      mostPosts:[],
      myPosts:[],
      posts: [],
      loading: true,
      displayedtimeline: false,
      displayedrecent : false,
      displayedcommented :false,

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

    displayedTimeline(){
      this.displayedtimeline = false
      this.displayedcommented=false
      this.displayedrecent=false
    },
    displayedRecent(){
      this.displayedtimeline = true
      this.displayedrecent=true
    },
    displayedCommented(){
      this.displayedtimeline = true
      this.displayedcommented=true
      this.displayedrecent=false
    },
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

