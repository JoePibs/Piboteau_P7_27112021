<template>
  <div>
    <div  v-if="connected === false" class="header">
      <b-img class="logo"  src="@/assets/header_home.png" alt="logo"></b-img>
    </div>
    
    <div  v-else class="header_logged">
      <b-img class="logo_logged"  src="@/assets/Logo_Timeline.png" fluid alt="logo"></b-img>
      <h1> Entre collègues, tout est possible ! </h1>
      <div @click="seeAuth" class="avatar_logged" v-b-modal.modal-1 > 
       <b-avatar  class="header_avatar" variant="info" :src="$store.state.auth.user.avatar" ></b-avatar>
        <profil v-if = "see_auth === true"/> 
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

export default {
  components: { profil },
  name: 'default',
  data () {
    return {
      loading: true,
      connected:true,
      see_auth:false,

    }
  },
  async mounted () {
    await this.$store.dispatch('auth/init')
    this.loading = false
    let token = localStorage.getItem('token')
    if (token === null){
    this.connected =false
    }
  },
  methods:{
    seeAuth(){
      this.see_auth = true
    }
  }
}

  


</script>

<style>
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  margin: 0;
  background: black;
  max-width: 100%;
}
.header {
  background-color: rgb(0, 0, 0);
  width: 100%;
  max-height: 150px;
  border-bottom: solid 1px #5b9d7f;
  flex-direction: row;
  flex-wrap:nowrap;
  display: flex;
}

.logo {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  max-height: 150px;
  width: 100%;
  max-width:500px;
  justify-content: space-around;
  display: flex;
  
}
.logo_logged {
  text-align: left;
  height: 100%;
  max-height: 100px;
  width: 100px;
  max-width:100px;
  
}
.header_avatar{
  height: 50px;
  width: 50px;
  max-height: 50px;
  max-width: 50px;
  margin: auto auto auto auto;
  border: #5b9d7f solid 3px;
  cursor: pointer;

}

.avatar_menu{
  display:none;
}

.footer {
  width: 100%;
  height: auto;
  border-top: solid 1px #5b9d7f;
  padding: 20px;
}
.footer p {
  font-size: 10px;
  color: azure;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  margin-bottom: 2px;
  text-align: center;
}


.header_logged {
  background-color: rgb(0, 0, 0);
  width: 100%;
  padding-right : 10px;
  max-height: 100px;
  border-bottom: solid 1px #5b9d7f;
  align-items: center;
  flex-direction: row;
  flex-wrap:nowrap;
  display: flex;
}

.header_logged h1{
  width:100%;
  font-size : 16px;
  padding-right: 15px;
  background-image: linear-gradient(90deg, rgba(240,14,4,1) 0%, rgba(247,129,3,1) 17%, rgba(244,224,2,1) 34%, rgba(89,253,29,1) 47%, rgba(43,225,220,1) 60%, rgba(166,137,228,1) 74%, rgba(252,69,204,1) 90%);
  background-clip: text;
  color: transparent;
  text-align: justify;
}


.central{
  height: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding:20px 0px 20px 10px;
}

</style>
