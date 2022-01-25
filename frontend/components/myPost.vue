<template>
    <div class="post">
         <div class="post_card"  >
            <div class="post_info" @click="seeUser" v-b-modal.modal-2 >
                <b-avatar :src="myPost.avatar" class="post_avatar"></b-avatar>
                <p class="post_ownername"> {{myPost.firstname}} {{myPost.lastname}} <span>@{{myPost.pseudo}}</span></p>
            </div>
            <seeProfil v-if = "seeOneProfil === true" :userPost="userPost" />
            <p class="post_time"> {{ $dayjs(myPost.date_creation).fromNow() }} </p>
        </div>
        <div @click="seePost" v-b-modal.modal-3>
            <div class="post_content"  >
                <p class="post_text"> {{myPost.content}} </p>
            </div>
        </div>
        <seeOnePost v-if ="seeOnePost === true" :onePost="onePost" />
    </div>
</template>

<script>
import seeProfil from '../components/seeProfil.vue'
import seeOnePost from'../components/seeOnePost.vue'
export default {
    components: {seeProfil,seeOnePost},
    props :['myPost' ],
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
            this.$axios.$get(`auth/${this.myPost.user_id}/profil`)
            .then((userPost)=>{
                console.log(userPost[0])
                this.userPost = userPost[0]
                this.seeOneProfil = true
            })
        },
        seePost(){
            this.seeOnePost = true
            this.$axios.$get(`post/${this.myPost.id}/onepost`)
            .then((onePost)=>{
                this.onePost = onePost[0]
                this.seeOnePost = true
            })
        },
    },
}
</script>


