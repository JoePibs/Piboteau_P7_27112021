<template>
    <div>
        <div class="container" >
                <b-img src="@/assets/bad_unicorn.png" fluid alt="licorne vomito"></b-img>
            <div class="content" >
                <h1> ERREUR 404 </h1>
                <blockquote>" Même le plus fantastique animal peut choisir le mauvais chemin "
                    <p>Oli Corn KENOBI</p> </blockquote>
                <b-button id="return_login" href="/" >Back over the rainbow</b-button>
            </div>
        </div>
    </div>
</template>

<style>

.container{
    display: flex;
    flex-direction:row;
    flex-wrap: wrap;
    min-height: 500px;
    margin-bottom: 50px;
}
.content{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-content: center;
    margin-top: 50px;
}
h1{
    background-image: linear-gradient(90deg, rgba(240,14,4,1) 0%, rgba(247,129,3,1) 17%, rgba(244,224,2,1) 34%, rgba(89,253,29,1) 47%, rgba(43,225,220,1) 60%, rgba(166,137,228,1) 74%, rgba(252,69,204,1) 90%);
    background-clip: text;
    color: transparent;
    margin : 0px auto 0px auto;
}
p{
    font-size: 12px;
    font-style: italic;
    text-align: right;
}
blockquote{
    font-size: 20px;
    text-align: right;
    border: solid 1px #5b9d7f;
    border-radius: 5px;
    box-shadow: #5b9d7f79 0px 5px 10px, #5b9d7f81 0px 3px 3px;
    padding:30px 30px 30px 15px;

}
p,blockquote{
    color:white;
    margin : 10px 20px 10px 20px;
}
#return_login {
    max-width: 70% ;
    margin: 10px auto 10px auto;
    background-image:linear-gradient(60deg, rgba(240,14,4,1) 0%, rgba(247,129,3,1) 17%, rgba(244,224,2,1) 34%, rgba(89,253,29,1) 47%, rgba(43,225,220,1) 60%, rgba(166,137,228,1) 74%, rgba(252,69,204,1) 90%);
    border-color: #5b9d7f;
    box-shadow: #5b9d7f79 0px 5px 10px, #5b9d7f81 0px 3px 3px;
    color: black;
}
#return_login:hover {
    background-image: linear-gradient(90deg, rgba(240,14,4,1) 0%, rgba(247,129,3,1) 17%, rgba(244,224,2,1) 34%, rgba(89,253,29,1) 47%, rgba(43,225,220,1) 60%, rgba(166,137,228,1) 74%, rgba(252,69,204,1) 90%);
    background-clip: text;
    color: transparent;
}


@media screen and (min-width: 800px) {
    .container {
        flex-wrap: nowrap;
    }
    img{
        width: 70%;
    }
}

</style>