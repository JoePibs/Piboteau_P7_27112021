<template>
    <div class="post">
         <div class="post_card" >
            <div class="post_info" @click="seeUser" v-b-modal.modal-2 >
                <b-avatar :src="mostPost.avatar" class="post_avatar"></b-avatar>
                <p class="post_ownername"> {{mostPost.firstname}} {{mostPost.lastname}} <span>@{{mostPost.pseudo}}</span></p>
            </div>
            <seeProfil v-if = "seeOneProfil === true" :userPost="userPost" />
            <p class="post_time"> {{ $dayjs(mostPost.date_creation).fromNow() }}</p>
        </div>
        <div @click="seePost" v-b-modal.modal-3>
            <div class="post_content" >
                <p class="post_text"> {{mostPost.content}} </p>
            </div>
        </div>
        <seeOnePost v-if ="seeOnePost === true" :onePost="onePost" />
    </div>

</template>

<script>
import Comments from '../components/comment.vue'
import seeProfil from '../components/seeProfil.vue'
import seeOnePost from'../components/seeOnePost.vue'
export default {
    components:{Comments,seeProfil,seeOnePost},
    props :['mostPost'],
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
            this.$axios.$get(`auth/${this.mostPost.user_id}/profil`)
            .then((userPost)=>{
                this.userPost = userPost[0]
                this.seeOneProfil = true
            })
        },
        seePost(){
            this.seeOnePost = true
            this.$axios.$get(`post/${this.mostPost.id}/onepost`)
            .then((onePost)=>{
                this.onePost = onePost[0]
                this.seeOnePost = true
            })
        },
        
    },
}
</script>





