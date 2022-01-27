<template>
  <div>
    <b-container class="container" v-if="connected === false">
      <b-row class="form">
        <bodyHome />
      </b-row>
  
      <b-row class="description">
        <b-row class="title">
          <h2 class="subtitle">My Groupomania Socia Network</h2>
        </b-row>
        <b-row class="explain">
          <b-row class="description_theme">
            <div class="bloc">
              <img src="@/assets/images/welcome_unicorn.png" alt="licorne dit hello" />
              <div class="content_description">
                <p>Discutez de tout et de rien avec vos collègues !</p>
              </div>
            </div>
          </b-row>
        
          <b-row class="description_theme">
            <div class="bloc">
              <img src="@/assets/images/succes_unicorn.png" alt="licorne qui danse" />
              <div class="content_description">
                <p>It’s a funny time !!!</p>
                <p>Pas de prise de tech ou de tête. Une prise de main facile</p>
              </div>
            </div>
          </b-row>
        </b-row>
      </b-row>
       <b-row class="title">
          <h2 class="subtitle">La famille en chiffres</h2>
        </b-row>
      <b-row class="stats">
        <stats />
      </b-row>
    </b-container>

    <b-container class="container_else" v-else>
      <img src="@/assets/images/gif_licorne.gif" alt="licorne dit hello" />
      <div class="comeback">
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
      connected:false,

      }
    },
    mounted(){
      if (this.$store.state.auth.loggedIn === true){
        this.connected = true
      }
      
    },
    methods: {
      timeline(){
         this.$router.push('/timeline') 
      }
    },
}

         
</script>


