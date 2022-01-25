<template>
    <div class="mostpost">
         <div class="cardMostPost" >
            <div class="infoMostPost" @click="seeUser" v-b-modal.modal-2 >
                <b-avatar :src="mostPost.avatar" class="avatarMostPost"></b-avatar>
                <p class="ownerNameMostPost"> {{mostPost.firstname}} {{mostPost.lastname}} <span>@{{mostPost.pseudo}}</span></p>
            </div>
            <seeProfil v-if = "seeOneProfil === true" :userPost="userPost" />
            <p class="timeMostPost"> {{ $dayjs(mostPost.date_creation).fromNow() }}</p>
        </div>
        <div @click="seePost" v-b-modal.modal-3>
            <div class="contentMostPost" >
                <p class="textMostPost"> {{mostPost.content}} </p>
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





