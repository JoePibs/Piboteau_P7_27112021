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
export default {
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

<style>

p{
    color: aliceblue;
    font-size :12px
}
.mostpost{
    margin: 10px 0 10px 0;
    padding: 10px 0 10px 0;
}
.cardMostPost{
    display: flex;
    flex-direction: column;
}
.infoMostPost{
    display: flex;
    flex-direction: row;
}

.ownerNameMostPost{
    font-size: 14px;
    margin-top: -2px;
    padding-left:10px;
}

.ownerNameMostPost span{
    padding-right: 5px;
    color: #5b9d7f;
    font-size: 10px;
}

.timeMostPost{
    margin-left :40px;
    margin-top: -17px;
    color: grey;
    font-size: 10px;
    font-style: italic;
    padding-left:10px;
}
.contentMostPost{
    
    background-color:rgb(17, 17, 17) ;
    border-radius : 3px 3px 3px 3px;
    box-shadow:#5b9d7f 0px 1px 5px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    padding-bottom: 1px;
}

.textMostPost{
    padding: 10px 5px 0px 10px;
}

</style>



