<template>
    <div class="commentedPost">
         <div class="cardCommentedPost">
            <div class="infoCommentedPost" @click="seeUser" v-b-modal.modal-2 >
                <b-avatar :src="postIcommented.avatar" class="avatarCommentedPost"></b-avatar>
                <p class="ownerNameCommentedPost"> {{postIcommented.firstname}} {{postIcommented.lastname}} <span>@{{postIcommented.pseudo}}</span></p>
            </div>
            <p class="timeMyPost"> {{ $dayjs(postIcommented.date_creation).fromNow() }} </p>
        </div>
        <seeProfil v-if ="seeOneProfil === true" :userPost="userPost" />
        <div>
            <div class="contentCommentedPost" @click="seePost"  v-b-modal.modal-3>
                <p class="textCommentedPost"> {{postIcommented.content}} </p>
            </div>
        </div>
        <seeOnePost v-if ="seeOnePost=== true" :onePost="onePost" />
    </div>

</template>

<script>
import seeProfil from '../components/seeProfil.vue'
import Comments from '../components/comment.vue'
import seeOnePost from'../components/seeOnePost.vue'
export default {
    components:{Comments,seeProfil,seeOnePost},
    props :['postIcommented'],
    data(){
        return{
            userPost:[],
            onePost:[],
            seeOneProfil:false,
            seeOnePost:false
        }
    },

    methods: {
        seeUser(){
            this.$axios.$get(`auth/${this.postIcommented.user_id}/profil`)
            .then((userPost)=>{
                this.userPost = userPost[0]
                this.seeOneProfil = true
                
            })
        },
        seePost(){
            this.$axios.$get(`post/${this.postIcommented.id}/onepost`)
            .then((onePost)=>{
                this.onePost = onePost[0]
                this.seeOnePost = true
            })
        },

    },
}
</script>





