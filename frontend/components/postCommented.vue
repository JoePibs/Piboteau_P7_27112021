<template>
    <div class="commentedPost">
         <div class="cardCommentedPost">
            <div class="infoCommentedPost" >
                <b-avatar :src="postIcommented.avatar" class="avatarCommentedPost"></b-avatar>
                <p class="ownerNameCommentedPost"> {{postIcommented.firstname}} {{postIcommented.lastname}} <span>@{{postIcommented.pseudo}}</span></p>
            </div>
        </div>
        <div>
            <div class="contentCommentedPost">
                <p class="textCommentedPost"> {{postIcommented.content}} </p>

            </div>
            </div>
        </div>

</template>

<script>
export default {
    props :['postIcommented'],
    data(){
        return{
        }
    },

    methods: {

    },
}
</script>


<style>

p{
    color: aliceblue;
    font-size :12px
}
.CommentedPost{
    margin: 10px 0 10px 0;
    padding: 10px 0 10px 0;
}
.cardCommentedPost{
    display: flex;
    flex-direction: column;

    margin: 20px 0 10px 0;
}
.infoCommentedPost{
    display: flex;
    flex-direction: row;
}

.ownerNameCommentedPost{
    font-size: 14px;
    margin-top: -2px;
    padding-left:10px;
}

.ownerNameCommentedPost span{
    padding-right: 5px;
    color: #5b9d7f;
    font-size: 10px;
}


.contentCommentedPost{
    background-color:rgb(17, 17, 17) ;
    border-radius : 3px 3px 3px 3px;
    box-shadow:#5b9d7f 0px 1px 5px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    padding-bottom: 1px
}

.textCommentedPost{
    padding: 10px 5px 0px 10px;
}

</style>



