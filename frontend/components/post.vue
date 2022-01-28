<template>
    <div class="thepost">
        <div class="thepost_card">
            <div class="thepost_info" @click="seeUser" v-b-modal.modal-2 >
                <b-avatar :src="post.avatar"  class="thepost_avatar"></b-avatar>
                <p class="thepost_ownername"> {{post.firstname}} {{post.lastname}} <span>@{{post.pseudo}}</span></p>
            </div>
            <seeProfil v-if = "seeOneProfil === true" :userPost="userPost" />
            <p class="thepost_time"> {{ $dayjs(post.date_creation).fromNow() }}</p>
        </div>
        <div>
            <div class="thepost_content">
                <div @click="seePost" class="one_post" v-b-modal.modal-3>
                    <div class="thepost_text_style">
                        <p class="thepost_text"> {{post.content}} </p>
                    </div>
                    <b-img :src="post.imageUrl" fluid alt="image de post" class="thepost_image" v-if="post.imageUrl !=''"> </b-img>
                </div>
                <seeOnePost v-if ="seeOnePost === true" :onePost="onePost" />
                <div class="reaction_user">
                    <p @click="seeComments" class="comment_intro" v-if="click_comment === true"> Voir les commentaires </p>
                    <p @click="hideComments" class="comment_intro" v-else> Cacher les commentaires </p>
                    <b-img @click="like" src="@/assets/images/like_unicorn_BW.png" fluid alt="funky licorne" class="like" v-if="postLikes===0" > </b-img>
                    <b-img @click="like" src="@/assets/images/like_unicorn.png" fluid alt="funky licorne" class="like" v-else > </b-img>
                    <p class="number_of_likes">{{likes}}</p>
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
                        <b-avatar :src="$store.state.auth.user.avatar"  class="thepost_avatar" id="avatar_create_comment"></b-avatar>
                        <p class="comment_username" id="comment_username"> {{$store.state.auth.user.firstname}} {{$store.state.auth.user.lastname}} <span>@{{$store.state.auth.user.pseudo}}</span></p>
                    </div>
                    <div >
                        <b-form @submit="onComment" enctype="multipart/form-data"  >
                                <b-form-textarea
                                    id="commentInput"
                                    class="comment_input"
                                    v-model="form.content"
                                    type="textarea"
                                    label ="taper votre commentaire"
                                    label-for="commentInput"
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
                <div class="comment_overflow" v-if="visible_comments===true">
                    <Comments  class="comments" v-for="comment in comments" :key="comment.id" :comment="comment"/>
                    <div class="nocomment" v-if="visible_comments===true && this.comments.length ===0"> 
                        <img src="@/assets/images/welcome_unicorn.png" alt="licorne dit hello" /> 
                        <h2>Soyez le premier à à commenter ce post</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import seeProfil from '../components/seeProfil.vue'
import Comments from '../components/comment.vue'
import seeOnePost from'../components/seeOnePost.vue'
export default {
    components:{Comments,seeProfil,seeOnePost},
    props :['post'],
    data(){
        return{
            form: {
                content: ''
            },
            onePost:[],
            userPost:[],
            commments:[],
            postLikes:"",
            likes:"",
            loadingLikes: true,
            userlike : false,
            owner : false,
            visible_comments : false,
            click_comment : true,
            alertDestroy : false,
            seeOneProfil : false,
            seeOnePost : false
        }
    },
    mounted(){

//admin control to activate "delete fonction"
        let userId = localStorage.getItem('userId')
        let isAdmin = localStorage.getItem('isAdmin')
    
        if (this.post.user_id != userId && isAdmin != 1){
            this.owner = false
        }else{
            this.owner = true
        }

//API call to load commentts & likes
        this.$axios.$get(`comment/${this.post.id}/allcommentpost`)
            .then((comments)=>{
                this.comments = comments
            })
        this.$axios.$get(`post/${this.post.id}/countLikes`)
            .then((ret) => {
                this.likes = ret.likes,
                this.loadingLikes = false
            }) 
        this.$axios.$get(`post/${this.post.id}/likedBy`)
            .then((ret) => {
                this.postLikes = ret.liked
            })
        },

    methods: {
//to see modal with user description or onePost only
        seeUser(){
            this.seeOneProfil = true
            this.$axios.$get(`auth/${this.post.user_id}/profil`)
            .then((userPost)=>{
                this.userPost = userPost[0]
                this.seeOneProfil = true
            })
        },
        seePost(){
            this.seeOnePost = true
            this.$axios.$get(`post/${this.post.id}/onepost`)
            .then((onePost)=>{
                this.onePost = onePost[0]
                this.seeOnePost = true
            })
        },
//action to comment , to do light, comment visibility is hidden at beginning
        seeComments(){
            this.$axios.$get(`comment/${this.post.id}/allcommentpost`)
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


//to add or erase a like & new count
        like(){
            this.$axios.$get(`post/${this.post.id}/like`)
            .then((ret) => {
                this.$axios.$get(`post/${this.post.id}/likedBy`)
                .then((ret) => {
                    this.postLikes = ret.liked
                })

                this.$axios.$get(`post/${this.post.id}/countLikes`)
                .then((ret)=>{
                    this.likes = ret.likes,
                    this.loadingLikes = false
                    })
            })
        },
//to desactivate a post
        warningDestroy(){
            this.alertDestroy = true
        },
        closeDestroy(){
            this.alertDestroy = false
        },
        destroyPost(){
            this.$axios.$put(`post/${this.post.id}/deletepost/`)
            .then((ret) =>{
                location.reload();
                return false;
            })
        },
//comment add 
        onComment (event) {
            event.preventDefault()
            this.$axios
            .post(`/comment/${this.post.id}/createcomment`, this.form)        
            .then(response => {
                this.$axios.$get(`comment/${this.post.id}/allcommentpost`)
                    .then((comments)=>{
                    this.comments = comments
                    this.form.content = ""
                    this.seeComments()
                    this.click_comment = false  
                });
            })
        }
    }
}


</script>







