<template>
    <div>
          <b-modal id="modal-2" title="monProfil">
            <div>
                  <b-icon icon="x-square-fill" aria-hidden="true" class="close" @click="closeModal"></b-icon> 
            </div>
            <div class="myprofil_header">
              <b-avatar  class="modal_avatar" :src="userPost.avatar"></b-avatar>
              <p id="username_modal"> {{userPost.firstname}} {{userPost.lastname}}</p>
              <span id="pseudo_title_modal">@{{userPost.pseudo}}</span>
  
              <div v-if="userIsAdmin === true" id="desinscription" class="desinscription">
                <b-button @click="alert" variant="outline-info" class="mb-2" id="erase">
                  <b-icon icon="power" aria-hidden="true"></b-icon> Désactiver le compte
                </b-button>
                <b-alert show v-if="alertMessage === true" variant="danger" id="alert"> Vous êtes sur ? 
                  <b-button @click="desactivateAccount" variant="danger">Oui</b-button>
                  <b-button @click ="closeAlert" variant="success">Oups </b-button>
                </b-alert>
                <b-alert v-if ="userDesactivation === true" variant="success" show>Utilisateur désactivé 
                    <b-button @click ="closeDesactivateAlert" variant="success">Fermer et quitter le profil </b-button>
                </b-alert>
              </div>

              <div class="profil_style">
                <div class="details_style" id="admin_style">
                  <h3>My Role : </h3>
                  <p v-if="this.userPost.isAdmin===0">Une simple 🦄</p>
                  <p v-else>Une Admin 🦄 : THE LICORN</p>
                </div>
                            
                <div class="details_style" id="date_style">
                  <h3>🎂 My Inscription Day : </h3>
                  <p>{{ $dayjs(userPost.date_creation).format('DD MMMM YYYY') }}</p>
                </div>
                  <div class="details_style" id="email_style">
                    <h3>📧 My Email : </h3>
                     <p>{{userPost.email}}</p>
                  </div>
                <div class="details_style" id="bio_style">
                  <h3>📖My Story is : </h3>
                  <p>{{userPost.bio}}</p>
                </div>
              </div>
            </div>
          </b-modal>
          </div>
</template>

<script>
export default {
props :['userPost'],

  data () {
    return {
      isAdmin:"",
      userIsAdmin : false,
      alertMessage :false,
      userDesactivation : false,
    }
  },
  mounted () {
      const admin = localStorage.getItem('isAdmin')
      if(admin === 1){
          this.userIsAdmin = true
          this.role = "Une Admin 🦄 : THE LICORN"
      }else{   
          this.userIsAdmin = false
          this.role = "Une simple 🦄"
      } 
    
  },
methods:{
  alert(){
    this.alertMessage = true
  },
  closeAlert(){
    this.alertMessage = false
  },
  desactivateAccount(){
    this.$axios
      .$get(`auth/${this.userPost.id}/desactivatebyadmin`)
      .then( response =>{
          this.userDesactivation = true
          this.alertMessage = false
      }
    )
  },
  closeDesactivateAlert(){
     location.reload();
     return false;
  },

  closeAlert(){
    this.alertMessage = false
    },
  closeModal(){
    this.$bvModal.hide('modal-2')
  }
} 
}

</script>

