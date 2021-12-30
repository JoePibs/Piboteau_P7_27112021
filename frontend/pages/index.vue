<template>
<b-container class="container">
    <b-row class = "form"> 
      <bodyHome/>
    </b-row>

    <b-row class = "description">
      <b-col>
        <b-row class = "title"> 
          <h2>My Groupomania Socia Network</h2>
        </b-row>

        <b-row class = "description_theme"> 

          <div class="bloc">
            <img src="@/assets/welcome_unicorn.png" alt="licorne dit hello">
            <div class=content_description>
              <p>Discutez de tout et de rien avec vos collègues !</p> 
            </div>
          </div>

        </b-row>

        <b-row class = "description_theme"> 

          <div class="bloc">
            <img src="@/assets/succes_unicorn.png" alt="licorne qui danse">
            <div class=content_description>
              <p>It’s a funny time !!!</p> 
              <p>Pas de prise de tech ou de tête. Une prise de main facile </p>
            </div>
          </div>

        </b-row>
      </b-col>
    </b-row>
    <b-row class = "stats"> 
      <stats/>
    </b-row>
</b-container>
  
</template>

<script>
import bodyHome from '../components/bodyHome.vue'
import stats from '../components/stats.vue'
export default {
  components: { bodyHome, stats },
  name: 'test'
}
</script>

<style>
.form{
  justify-content: center;
  margin-right:auto ;
  margin-left: auto;
  padding: 20px;
}

p{
  margin-top: 20px;
  color: white;
  margin-right: 0;
  margin-left: 0;
  text-align: center;
  font-size : 12px
}

.col,h2{

  margin:10px 0px 10px 0px;
  padding:2px 2px 2px 10px;
  text-align: center;
  color :white;
  font-size: 18px;
}
.title{
  margin:0;
  padding:0;
}
.description_theme{
  background-color: black;
  max-width: 90%;
  border: solid 1px #5b9d7f;
  border-radius : 5px;
  box-shadow: #5b9d7f79 0px 10px 20px, #5b9d7f81 0px 6px 6px;
  margin-left: auto;
  margin-right: auto;
}

.bloc{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 10px;
  max-height: 100px;
  justify-content: left;
}
.bloc img{
  width: 30%;
  padding: 10px;
}
.bloc p{
  margin: 10px;
  text-align: left;
  justify-content: center;
}
.description_theme{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 20px ;
  align-items: center;
  justify-content: center;
}
</style>
