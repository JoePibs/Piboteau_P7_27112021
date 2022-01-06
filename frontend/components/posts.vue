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
                <b-img :src="post.imageUrl" fluid alt="image de post" class="imagePost"> </b-img>

            <div class="reactionUser">
                <p> Commentaires <p>
                <b-img src="@/assets/like_unicorn.png" fluid alt="funky licorne" class="like" > </b-img>
                <p class="numberOfLikes">{{likes}}</p>
                <p class=delete_post>Supprimer</p>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props :['post'],
    data(){
        return{
            likes:"",
            loadingLikes: true,
            deletepost: false
        }
    },

    methods: {

    },

mounted(){
    this.$axios.$get(`post/${this.post.id}/countLikes`)
        .then((ret) => {
            this.likes = ret.likes,
            this.loadingLikes = false
        })
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
    border:solid 1px #5b9d7f3b;
    border-radius : 3px 3px 3px 3px;
    box-shadow:#5b9d7f 0px 1px 5px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}

.textPost{
    padding: 10px 5px 0px 10px;
}

.imagePost{
    width: 100%;
    height: 150px;
    position: relative;
    object-fit: cover;
    margin-bottom : 10px;
}

.reactionUser{
    display: flex;
    flex-direction : row;
    justify-content: flex-end;
    margin-right: 20px;
    
}
.like{
    margin-top : -10px;
    height: 30px;
    
}
.numberOfLikes{
    margin-right: 10px;
}
</style>



