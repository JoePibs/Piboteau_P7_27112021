<template>
    <div class="post">
         <div class="post_card">
            <div class="post_info" @click="seeUser" v-b-modal.modal-2 >
                <b-avatar :src="postIcommented.avatar" class="post_avatar"></b-avatar>
                <p class="post_ownername"> {{postIcommented.firstname}} {{postIcommented.lastname}} <span>@{{postIcommented.pseudo}}</span></p>
            </div>
            <seeProfil v-if = "seeOneProfil === true" :userPost="userPost" />
            <p class="post_time"> {{ $dayjs(postIcommented.date_creation).fromNow() }} </p>
        </div>
        <div>
            <div class="post_content" @click="seePost" v-b-modal.modal-3 >
                <p class="post_text"> {{postIcommented.content}} </p>
                <seeOnePost v-if ="seeOnePost === true" :onePost="onePost" />
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
    props :['postIcommented'],
    data(){
        return{
            onePost:[],
            userPost:[],
            seeOneProfil: false,
            seeOnePost: false,
        }
    },

    methods: {
        seeUser(){
            this.seeOneProfil = true
            this.$axios.$get(`auth/${this.postIcommented.user_id}/profil`)
            .then((userPost)=>{
                console.log(userPost[0])
                this.userPost = userPost[0]
                this.seeOneProfil = true
                console.log(this.seeOneProfil)
            })
        },
        seePost(){
            this.seeOnePost = true
            this.$axios.$get(`post/${this.postIcommented.id}/onepost`)
            .then((onePost)=>{
                this.onePost = onePost[0]
                this.seeOnePost = true
            })
        },
        

    },
}
</script>





