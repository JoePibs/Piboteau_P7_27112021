<template>
    <div class="comment_overflow">
        <div class="comment">
            <div class="card_comment">
                <div class="info_comment" >
                    <b-avatar :src="comment.avatar"  class="avatarPost" id="avatar_comment"></b-avatar>
                    <p class="owner_comment"> {{comment.firstname}} {{comment.lastname}} <span>@{{comment.pseudo}}</span></p>
                </div>
            </div>
            <div id="comment_style">
                <div class="content_comment">
                    <p class="text_comment"> {{comment.content}} </p>
                </div>
                <div class="trash_comment" v-if="owner===true" @click="warningDestroyComment">
                    <p> 🧨 Destroy</p>
                </div>
            </div>
        </div>
        <b-alert show v-if="alertDestroyComment === true" variant="danger" id="alert"> Vous êtes sur ? 
            <b-button @click="destroyComment" variant="danger">Oui</b-button>
            <b-button @click ="closeDestroyComment" variant="success">Oups </b-button>
        </b-alert>
    </div>
</template>

<script>
export default {
    props :['comment'],
    data(){
        return{
            alertDestroyComment: false,
            owner: false
        }
    },
    mounted(){
        
        let userId = localStorage.getItem('userId')
        let isAdmin = localStorage.getItem('isAdmin')
    
        if (this.comment.user_id != userId && isAdmin != 1){
            this.owner = false
        }else{
            this.owner = true
        }
    },
    methods: {
        warningDestroyComment(){
            this.alertDestroyComment = true
            console.log(this.comment)
        },
        closeDestroyComment(){
            this.alertDestroyComment = false
        },
        destroyComment(){
            this.$axios.$put(`comment/${this.comment.id}/deletecomment/`)
            .then((ret) =>{
                location.reload();
                return false;
            })
        },
    },
}
</script>





