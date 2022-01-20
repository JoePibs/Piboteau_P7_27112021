<template>
    <div>
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
                <div id="trash_comment" v-if="owner===true" @click="warningDestroyComment">
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

<style>

p{
    color: aliceblue;
    font-size :12px
}
.comment{
    margin: 0 0 0 0;
    padding: 0px 0 10px 0;
    display: flex;
    justify-content: right;

    flex-direction: column;
}

.card_comment{
    display: flex;
    flex-direction: column;
}
.info_comment{
    display: flex;
    flex-direction: row;
}

.owner_comment{
    font-size: 12px;
    margin: 8px 2px 5px 0px ;
    padding-left:2px;
}

.owner_comment span{
    padding-right: 5px;
    color: #5b9d7f;
    font-size: 8px;
}


.content_comment{
    border:solid 1px #5b9d7f3b;
    border-radius : 8px 8px 8px 8px;
    margin: 0px 10px 5px 10px;
    width:fit-content;
    max-width: 80%;
    min-width: 45%;
    box-shadow:#5b9d7f 0px 1px 5px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    background-color: #5b9d7f;
    text-overflow: ellipsis;
}

.text_comment{
    margin : 3px 3px 3px 3px;
    padding : 3px 3px 3px 3px;
    overflow-wrap: break-word;
}

#comment_style{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 350px;
}
#trash_comment{
    display: flex;
    flex-direction: row;
    width: fit-content;
    text-align: center;
    margin: auto 0 auto 0;

    cursor: pointer;
}
#trash_comment p{
    margin-bottom: 0px;
    font-size : 10px;
}

#avatar_comment{
    height: 15px;
    width:15px;
    margin: 10px 2px 5px 10px ;
}
</style>



