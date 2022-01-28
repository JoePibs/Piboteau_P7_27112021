<template>
  <div>
    <div  v-if="this.$store.state.auth.loggedIn === false" class="header">
      <b-img class="logo" @click="returnHome" src="@/assets/images/Logo_Timeline.png" fluid alt="logo"></b-img>
      <h1 class="home_title">Groupomania</h1>
      <div class="header_action">
        <lightmode/>
      </div>
    </div>
    
    <div  v-else class="header">
      <b-img class="logo" @click="returnHome" src="@/assets/images/Logo_Timeline.png" fluid alt="logo"></b-img>
      <div class="header_action">
        <lightmode/>
        <b-button @click="disconnect" id="logout" class="logbtn"><b-icon icon="power" aria-hidden="true"></b-icon>Logout</b-button>
        <div @click="seeAuth" class="avatar" v-b-modal.modal-1 > 
        <b-avatar  class="header_avatar" variant="info" :src="$store.state.auth.user.avatar" ></b-avatar>
          <profil v-if = "see_auth === true"/> 
        </div>
      </div>
    </div> 

    <div class="central" v-if="loading === false">
      <Nuxt/>
    </div>
    <div class="footer">
      <p>2021 copyright : MylittlePony Faction</p>
      <p>Jonathan Piboteau website</p>
    </div>
  </div>
</template>

<script>
import profil from "../components/profil.vue"
import lightmode from "../components/lightMode.vue"
export default {
  components: { profil,lightmode },
  name: 'default',
  data () {
    return {
      loading: true,
      connected:false,
      see_auth:false,

    }
  },
  async mounted () {
    await this.$store.dispatch('auth/init')
    this.loading = false
    
  },
  methods:{
    seeAuth(){
      this.see_auth = true
    },
    
    returnHome(){
      this.$router.push('/');
    },
    disconnect(){
      this.$store.dispatch('auth/logout')
      this.$router.push('/');
    }
  }
}

  


</script>

