<template>
  <div>
    <b-container class="container" v-if="connected === false">
      <b-row class="form">
        <bodyHome />
      </b-row>

      <b-row class="description">
        <b-col>
          <b-row class="title">
            <h2>My Groupomania Socia Network</h2>
          </b-row>

          <b-row class="description_theme">
            <div class="bloc">
              <img src="@/assets/welcome_unicorn.png" alt="licorne dit hello" />
              <div class="content_description">
                <p>Discutez de tout et de rien avec vos collègues !</p>
              </div>
            </div>
          </b-row>

          <b-row class="description_theme">
            <div class="bloc">
              <img src="@/assets/succes_unicorn.png" alt="licorne qui danse" />
              <div class="content_description">
                <p>It’s a funny time !!!</p>
                <p>Pas de prise de tech ou de tête. Une prise de main facile</p>
              </div>
            </div>
          </b-row>
        </b-col>
      </b-row>
      <b-row class="stats">
        <stats />
      </b-row>
    </b-container>
    <b-container class="container_else" v-else>
      <img src="@/assets/gif_licorne.gif" alt="licorne dit hello" />
      <div>
      <h2>Hello <span>{{ $store.state.auth.user.pseudo }} !</span> </H2>
      <p>Déja de retour ?? </p>
      <router-link to="/timeline">
      <button > Go to the rainbow 🌈  ? </button></router-link>
      </div>
    </b-container>
  </div>
</template>

<script>
import bodyHome from '../components/bodyHome.vue'
import stats from '../components/stats.vue'
export default {
  components: { bodyHome, stats },
  name: 'test',
  data () {
      return {
      connected:true,

      }
    },
    mounted(){
      let token = localStorage.getItem('token')
      if (token === null){
        this.connected =false
      }
    },
    methods: {
      timeline(){
         this.$router.push('/timeline') 
      }
    },
}

         
</script>


<style>
.form {
  display: flex;
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
  padding: 20px;
}

p {
  margin-top: 20px;
  color: white;
  margin-right: 0;
  margin-left: 0;
  text-align: center;
  font-size: 12px;
}

.col,
h2 {
  margin: 10px 0px 10px 0px;
  padding: 2px 2px 2px 10px;
  text-align: center;
  color: white;
  font-size: 18px;
}
.title {
  margin: 0;
  padding: 0;
}
.description_theme {
  background-color: black;
  max-width: 90%;
  border: solid 1px #5b9d7f;
  border-radius: 5px;
  box-shadow: #5b9d7f79 0px 10px 20px, #5b9d7f81 0px 6px 6px;
  margin-left: auto;
  margin-right: auto;
}

.bloc {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 10px;
  max-height: 100px;
  justify-content: left;
}
.bloc img {
  width: 30%;
  padding: 10px;
}
.bloc p {
  margin: 10px;
  text-align: left;
  justify-content: center;
}
.description_theme {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 20px;
  align-items: center;
  justify-content: center;
}
.container_else{
  padding: 20px;
  width: 100%;
  display: flex ;
  flex-direction: row;
  justify-content: space-evenly;
}
.container_else img{
  height: 40%;
  width: 40%;
  border-radius :50%;
}

.container_else h2{
  font-size : 22px;
}

.container_else p{
  font-size : 17px;
}
.container_else span{
  background-image: linear-gradient(90deg, rgba(240,14,4,1) 0%, rgba(247,129,3,1) 17%, rgba(244,224,2,1) 34%, rgba(89,253,29,1) 47%, rgba(43,225,220,1) 60%, rgba(166,137,228,1) 74%, rgba(252,69,204,1) 90%);
  background-clip: text;
  color: transparent;
}
.container_else button{
  font-size: 14px;
  color : white;
  border: #5b9d7f 1px solid;
  border-radius :10%;
 box-shadow: #5b9d7f 0px 1px 4px 0px;
  background-color:transparent;
  padding : 10px

}
</style>
