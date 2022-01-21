<template>
    <div>
          <b-modal id="modal-2" title="monProfil">
            <div>
                  <b-icon icon="x-square-fill" aria-hidden="true" class="close" @click="closeModal"></b-icon> 
            </div>
            <div class="monProfil_header">
              <b-avatar  class="modal_avatar" :src="userPost.avatar"></b-avatar>
              <p id="userName_modal"> {{userPost.firstname}} {{userPost.lastname}}</p>
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
      console.log(admin)
      if(admin === "1"){
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
    location.reload()
  }
} 
}

   
    
          
  


</script>

<style>
.header_avatar{
  height: 50px;
  width: 50px;
  max-height: 50px;
  max-width: 50px;
  margin: auto auto auto auto;
  border: #5b9d7f solid 3px;
  cursor: pointer;

}


#modal-2{
  background: #49756136;
}
.monProfil_header{
  display: flex;
  flex-direction: column;
  text-align: center;
}
.monProfil_header p{
  font-size: 20px;
}

.monProfil_header span{
  color: #5b9d7f;
}
.modal_avatar{
  
  height: 100px;
  width: 100px;
  max-height: 100px;
  max-width: 100px;
  margin: -30px auto auto auto;
  text-align: center;
  border: #5b9d7f solid 3px;

}

  
.modal-footer{
  display:none;
}
.modal-header{

  display:none;
  color:#5b9d7f;
  height: 0px;
  border: none;
}
.modal-header h5{
  display:none;
}
.close{
  color:#14f590;
}
.close:hover {
    color:#97032f;
    text-decoration: none;
}
.modal-content {
  background-color : rgb(0, 0, 0) ;
}

.btn-primary {
  color: #fff;
  background-color: #5b9d7f;
  border-color: #5b9d7f;
  margin-left: 40px;
}
.profil_style{
    margin-top :30px;
}
.details_style{
    display: flex;
    flex-direction : column;
    text-align: left;
    width: 100%;
}
.details_style h3{
    font-size :16px;
    color: #5b9d7f;
    background-color: rgb(36, 35, 35);
    padding:10px 10px 10px 10px ;
}
.details_style p{
    font-size :14px;

}

#userName_modal{
  margin-bottom : 0px;

}

.close{
  color:#5b9d7f;
  cursor: pointer;
}
</style>
