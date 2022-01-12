<template>
    <div class="mypost">
         <div class="cardMyPost">
            <div class="infoMyPost" >
                <b-avatar :src="myPost.avatar" class="avatarMyPost"></b-avatar>
                <p class="ownerNameMyPost"> {{myPost.firstname}} {{myPost.lastname}} <span>@{{myPost.pseudo}}</span></p>
            </div>
            <p class="timeMyPost"> il y a 5 jours</p>
        </div>
        <div>
            <div class="contentMyPost">
                <p class="textmyPost"> {{myPost.content}} </p>
            </div>
            </div>
        </div>

</template>

<script>
export default {
    props :['myPost'],
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
.mypost{
    margin: 10px 0 10px 0;
    padding: 10px 10px 10px 10px;
    
    
}
.cardMyPost{
    display: flex;
    flex-direction: column;
}
.infoMyPost{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
}

.ownerNameMyPost{
    font-size: 14px;
    margin-top: -2px;
    padding-left:10px;
}
.ownerNameMyPost span{
    padding-right: 5px;
    color: #5b9d7f;
    font-size: 10px;
}

.timeMyPost{
    margin-left :40px;
    margin-top: -17px;
    color: grey;
    font-size: 10px;
    font-style: italic;
    padding-left:10px;
}
.contentMyPost{
    border:solid 1px #5b9d7f3b;
    border-radius : 3px 3px 3px 3px;
    padding: 5px 0px 0px 5px;
    box-shadow:#5b9d7f 0px 1px 5px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}

.textMyPost{
    padding: 0px 0px 0px 0px;
    text-align: left;
}

</style>
