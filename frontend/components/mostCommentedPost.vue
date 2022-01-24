<template>
    <div class="mostpost">
         <div class="cardMostPost" @click="seeUser" v-b-modal.modal-2>
            <div class="infoMostPost" >
                <b-avatar :src="mostPost.avatar" class="avatarMostPost"></b-avatar>
                <p class="ownerNameMostPost"> {{mostPost.firstname}} {{mostPost.lastname}} <span>@{{mostPost.pseudo}}</span></p>
            </div>
            <p class="timeMostPost"> {{ $dayjs(mostPost.date_creation).fromNow() }}</p>
        </div>
        <seeProfil v-if ="seeOneProfil === true" :userPost="userPost" />
        <div>
            <div class="contentMostPost" @click="seePost"  v-b-modal.modal-3>
                <p class="textMostPost"> {{mostPost.content}} </p>
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
    props :['mostPost'],
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
            this.$axios.$get(`auth/${this.mostPost.user_id}/profil`)
            .then((userPost)=>{
                this.userPost = userPost[0]
                this.seeOneProfil = true
                
            })
        },
        seePost(){
            this.$axios.$get(`post/${this.mostPost.id}/onepost`)
            .then((onePost)=>{
                this.onePost = onePost[0]
                console.log(this.onePost)
                this.seeOnePost = true
            })
        },

    },
}
</script>





