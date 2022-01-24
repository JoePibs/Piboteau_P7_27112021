<template>
    <div>
        <b-modal id="modal-3" title="post">
            <div>
                  <b-icon icon="x-square-fill" aria-hidden="true" class="close" @click="closeModal"></b-icon> 
            </div>
            <div class="thepost">
                <div class="cardPost">
                    <div class="infoPost"  >
                        <b-avatar :src="onePost.avatar"  class="avatarPost"></b-avatar>
                        <p class="ownerName"> {{onePost.firstname}} {{onePost.lastname}} <span>@{{onePost.pseudo}}</span></p>
                    </div>
                    <p class="timePost"> {{ $dayjs(onePost.date_creation).fromNow() }}</p>
                </div>
                <div>
                    <div class="contentPost">
                        <div class="one_post_none" >
                            <p class="textPost"> {{onePost.content}} </p>
                            <b-img :src="onePost.imageUrl" fluid alt="image de post" class="imagePost" v-if="onePost.imageUrl !=''"> </b-img>
                        </div>
                        <div class="reactionUser">
                            <p @click="seeComments" class="comment_intro" v-if="click_comment === true"> Voir les commentaires </p>
                            <p @click="hideComments" class="comment_intro" v-else> Cacher les commentaires </p>
                            <b-img @click="like" src="@/assets/images/like_unicorn_BW.png" fluid alt="funky licorne" class="like" v-if="postLikes===0" > </b-img>
                            <b-img @click="like" src="@/assets/images/like_unicorn.png" fluid alt="funky licorne" class="like" v-else > </b-img>
                            <p class="numberOfLikes">{{likes}}</p>
                            <div class="trash" v-if="owner ===true" @click="warningDestroy">
                                <b-icon  icon="trash-fill" aria-hidden="true" class="trash"></b-icon>
                                <p> Destroy🧨</p>
                            </div>
                        </div>
                        <div>
                            <b-alert show v-if="alertDestroy === true" variant="danger" id="alert"> Vous êtes sur ? 
                                <b-button @click="destroyPost" variant="danger">Oui</b-button>
                                <b-button @click ="closeDestroy" variant="success">Oups </b-button>
                            </b-alert>
                        </div>
                        <div class="create_c"> 
                            <div class="create_comment">
                                <p class="userName"> {{$store.state.auth.user.firstname}} {{$store.state.auth.user.lastname}} <span>@{{$store.state.auth.user.pseudo}}</span></p>
                            </div>
                            <div >
                                <b-form @submit="onComment" enctype="multipart/form-data"  >
                                        <b-form-textarea
                                            id="commentInput"
                                            class="commentInput"
                                            v-model="form.content"
                                            type="textarea"
                                            placeholder="Hennir un commentaire 👉"
                                            rows="1"
                                            max-rows="6">  
                                        </b-form-textarea>
                                    <div class="button_create">
                                            <img src="@/assets/images/unicorn_prout.png" alt="licorne fusée" />
                                            <b-button type="submit" variant="create">Lancement</b-button>
                                        </div>
                                </b-form>
                            </div>            
                        </div>                                  
                        <div v-if="visible_comments===true">
                            <Comments  class="comments" v-for="comment in comments" :key="comment.id" :comment="comment"/>
                        </div>
                        <div v-if="visible_comments===true && this.comments.length ===0"> 
                            <h2>Soyez le premier à à commenter ce post</h2> </div>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import Comments from '../components/comment.vue'

    
export default {
    components:{Comments},
    props :['onePost'],
  data () {
    return{
            form: {
                content: ''
            },
            comments:[],
            postLikes:"",
            likes:"",
            loadingLikes: true,
            userlike : false,
            owner : false,
            visible_comments : false,
            click_comment : true,
            alertDestroy : false,
            seeOneProfil : false,
        }
    },
    mounted(){


        let userId = localStorage.getItem('userId')
        let isAdmin = localStorage.getItem('isAdmin')
    
        if (this.onePost.user_id != userId && isAdmin != 1){
            this.owner = false
        }else{
            this.owner = true
        }


      
      this.$axios.$get(`comment/${this.onePost.id}/allcommentpost`)
        .then((comments)=>{
            this.comments = comments
        })

    this.$axios.$get(`post/${this.onePost.id}/countLikes`)
        .then((ret) => {
            this.likes = ret.likes,
            this.loadingLikes = false
        })
    


      this.$axios.$get(`post/${this.onePost.id}/likedBy`)
        .then((ret) => {
            this.postLikes = ret.liked
        })

    },

    methods: {

        closeModal(){
            this.$bvModal.hide('modal-3')
        },
        seeComments(){
            this.$axios.$get(`comment/${this.onePost.id}/allcommentpost`)
            .then((comments)=>{
                this.comments = comments
                this.click_comment = false
                this.visible_comments = true
            })
        },
        hideComments(){
                this.visible_comments = false
                this.click_comment = true
        },
        like(){
            this.$axios.$get(`post/${this.onePost.id}/like`)
            .then((ret) => {
                this.$axios.$get(`post/${this.onePost.id}/likedBy`)
                .then((ret) => {
                    this.postLikes = ret.liked
                })

                this.$axios.$get(`post/${this.onePost.id}/countLikes`)
                .then((ret)=>{
                    this.likes = ret.likes,
                    this.loadingLikes = false
                    })
            })
        },
        warningDestroy(){
            this.alertDestroy = true
        },

        closeDestroy(){
            this.alertDestroy = false
        },

        destroyPost(){
            this.$axios.$put(`post/${this.onePost.id}/deletepost/`)
            .then((ret) =>{
                location.reload();
                return false;
            })
        },

        onComment (event) {
        event.preventDefault()
        this.$axios
        .post(`/comment/${this.onePost.id}/createcomment`, this.form)        
        .then(response => {
            this.$axios.$get(`comment/${this.onePost.id}/allcommentpost`)
                .then((comments)=>{
                this.comments = comments
                this.form.content = "",
                this.seeComments()
                this.click_comment = false
                
            });
        })
    }
    }
}

</script>
<style>
#modal-3{
  background: #49756136;
}
</style>
