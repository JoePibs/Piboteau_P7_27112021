<template>
    <div class="onepost">
         <div class="cardPost">
            <div class="infoPost" >
                <b-avatar :src="post.avatar" class="avatarPost"></b-avatar>
                <p class="ownerName"> {{post.firstname}} {{post.lastname}} <span>@{{post.pseudo}}</span></p>
            </div>
            <p class="timePost"> il y a {{post.id}} jours</p>
        </div>
        <div>
            <div class="contentPost">
                <p class="textPost"> {{post.content}} </p>
                <b-img :src="post.imageUrl" fluid alt="image de post" class="imagePost" v-if="post.imageUrl !=''"> </b-img>
                <div class="reactionUser">
                    <p @click="seeComments" class="comment_intro" v-if="click_comment === true"> Commentaires </p>
                    <p @click="hideComments" class="comment_intro" v-else> Cacher les commentaires </p>
                    <b-img @click="like" src="@/assets/like_unicorn_BW.png" fluid alt="funky licorne" class="like" v-if="postLikes===0" > </b-img>
                    <b-img @click="like" src="@/assets/like_unicorn.png" fluid alt="funky licorne" class="like" v-else > </b-img>
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
                                    <img src="@/assets/unicorn_prout.png" alt="licorne fusée" />
                                    <b-button type="submit" variant="create">Lancement</b-button>
                                </div>
                        </b-form>
                    </div>            
                </div>
                            
                <div v-if="visible_comments===true">
                    <Comments  class="comments" v-for="comment in comments" :key="comment.id" :comment="comment"/>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import Comments from '../components/comment.vue'
export default {
    components:{Comments},
    props :['post'],
    data(){
        return{
            form: {
                content: ''
            },
            commments:[],
            postLikes:"",
            likes:"",
            loadingLikes: true,
            userlike : false,
            owner : false,
            visible_comments : false,
            click_comment : true,
            alertDestroy : false
        }
    },
    mounted(){

        let userId = localStorage.getItem('userId')
        let isAdmin = localStorage.getItem('isAdmin')
    
        if (this.post.user_id != userId && isAdmin != 1){
            this.owner = false
        }else{
            this.owner = true
        }

    
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

        onComment (event) {
        event.preventDefault()
        this.$axios
        .post(`/comment/${this.post.id}/createcomment`, this.form)        
        .then(response => {
            this.$axios.$get(`comment/${this.post.id}/allcommentpost`)
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

p{
    color: aliceblue;
    font-size :12px
}
.onepost{
    margin: 10px 0 10px 0;
    padding: 10px 0 10px 0;
}
.cardPost{
    display: flex;
    flex-direction: column;
}
.infoPost{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
}
.avatarPost{
    margin-right : 5px;
    width: 35px;
    height: 35px;
}

.ownerName{
    font-size: 14px;
    margin-top: -2px;
}
.ownerName span{
    padding-right: 5px;
    color: #5b9d7f;
    font-size: 10px;
}

.timePost{
    margin-left :40px;
    margin-top: -17px;
    color: grey;
    font-size: 10px;
    font-style: italic;
}
.contentPost{
    background-color:rgb(17, 17, 17) ;
    border-radius : 10px 10px 3px 3px;
    box-shadow:#5b9d7f 0px 1px 5px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}

.textPost{
    padding: 10px 5px 10px 10px;
    border-radius : 10px 10px 0px 0px;
    background: #5b9d7f4f;
}

.imagePost{
    width: 100%;
    height: 200px;
    position: relative;
    object-fit: cover;
    margin-top: -16px;
    margin-bottom : 10px;
}

.reactionUser{
    display: flex;
    flex-direction : row;
    justify-content: flex-end;
    margin-right: 20px;
    
}
.trash{
    display: flex;
    flex-direction : row;
    cursor: pointer;
}
.like{
    margin-top : -10px;
    height: 30px;
    cursor: pointer;
    
}
.numberOfLikes{
    margin-right: 10px;
}
.trash{
    color:#5b9d7f;
}
.comment_intro{
    cursor: pointer;
}
.create_c{

    padding: 5px 5px 5px 5px;
    margin-top : 3px;
    box-shadow: #5b9d7f13 0px 3px 6px, #5b9d7f10 0px 3px 6px;
}
.create_comment{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
}

.userName{
    padding-left : 10px;
    font-size : 14px;
}
.commentInput{
    background: none;
    border:1px #5b9d7f3f solid;
    margin-top : -1px;
    width: 100%;
    
}

.userName span{
    color: #5b9d7f;
    font-size: 10px ;
}

.btn-secondary {
    font-size : 10px;
    background-color: transparent;
    border: none;
    }
.button_file img{
    width: 30px;
    margin-right: 5px;
}
.button_create{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: -25px;
  cursor: pointer;

}
.button_create img {
  height: 40px;
  margin-left: auto;
  margin-right: -55px;
  z-index: 5;
}

.btn-create {
    color: #fff;
    font-size:10px;
    background-color: #5b9d7f;
    border-color: #5b9d7f;
}

.create_input_style{
    display: flex;
    flex-direction: nowrap;
    justify-content: flex-end;
    margin-top:5px;
    z-index: 4;
}

.btn-secondary:hover {
    
    background-color: transparent;
    border-color: #5b9d7f;
}

.btn:hover {
    color: #212529;
    text-decoration: none;
}

</style>



