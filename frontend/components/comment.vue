<template>
    <div>
        <div class="comment">
            <div class="card_comment">
                <div class="info_comment" >
                    <p class="owner_comment"> {{comment.firstname}} {{comment.lastname}} <span>@{{comment.pseudo}}</span></p>
                </div>
            </div>
            <div>
                <div class="content_comment">
                    <p class="text_comment"> {{comment.content}} </p>
                </div>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    props :['comment'],
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
    font-size: 14px;
    margin: 0 0 5px 0;
    padding-left:10px;
}

.owner_comment span{
    padding-right: 5px;
    color: #5b9d7f;
    font-size: 10px;
}


.content_comment{
    border:solid 1px #5b9d7f3b;
    border-radius : 8px 8px 8px 8px;
    margin: 0px 10px 5px 10px;
    width:fit-content;
    max-width: 90%;
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


</style>



