<template>
    <div class="mostpost">
         <div class="cardMostPost">
            <div class="infoMostPost" >
                <b-avatar :src="mostPost.avatar" class="avatarMostPost"></b-avatar>
                <p class="ownerNameMostPost"> {{mostPost.firstname}} {{mostPost.lastname}} <span>@{{mostPost.pseudo}}</span></p>
            </div>
            <p class="timeMostPost"> il y a 5 jours</p>
        </div>
        <div>
            <div class="contentMostPost">
                <p class="textMostPost"> {{mostPost.content}} </p>
            </div>
            </div>
        </div>

</template>

<script>
export default {
    props :['mostPost'],
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
    border:solid 1px #5b9d7f3b;
    border-radius : 3px 3px 3px 3px;
    box-shadow:#5b9d7f 0px 1px 5px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}

.textMostPost{
    padding: 10px 5px 0px 10px;
}

</style>



