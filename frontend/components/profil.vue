<template>
    <div>
          <b-avatar v-b-modal.modal-1 class="header_avatar" variant="info" :src="$store.state.auth.user.avatar">
          </b-avatar>
          <b-modal id="modal-1" title="monProfil">
            <div class="monProfil_header">
              <b-avatar  class="modal_avatar" variant="info" :src="$store.state.auth.user.avatar"></b-avatar>
              <p class="userName"> {{$store.state.auth.user.firstname}} {{$store.state.auth.user.lastname}}</p>
              <span>@{{$store.state.auth.user.pseudo}}</span>
            </div>

            <b-form @submit="onSubmit" >
              <b-form-group id="firstname-group" label="Prénom:" label-for="firstname">
                <b-form-input
                  id="firstname"
                  v-model="form.firstname"
                  @change ="checkFirstname"
                  required
                ></b-form-input>
                <div class="errorMessage" id="firstNameError"></div>

              </b-form-group>
              <b-form-group id="lastname-group" label="Nom :" label-for="lastname">
                <b-form-input
                  id="lastname"
                  v-model="form.lastname"
                  @change ="checkLastname"
                  required
                ></b-form-input>
                <div class="errorMessage" id="lastNameError"></div>

              </b-form-group>
              <b-form-group id="pseudo-group" label="Pseudo :" label-for="pseudo">
                <b-form-input
                  id="pseudo"
                  v-model="form.pseudo"
                  @change ="checkPseudo"
                  required
                ></b-form-input>
                <div class="errorMessage" id="pseudoError"></div>

                <div></div>
              </b-form-group>
              <b-form-group id="email-group" label="Email :" label-for="email">
                <b-form-input
                  id="email"
                  v-model="form.email"
                  type="email"
                  @change ="checkEmailRegex"
                  required
                ></b-form-input>
                <div class="errorMessage" id="emailRegexError"></div>
              </b-form-group>
              <div class="button_inscription">
                <img src="@/assets/unicorn_prout.png" alt="licorne lancement" />
                <b-button type="submit" variant="primary" id="signupButton" >Modifier le profil </b-button>
              </div>
            </b-form>
          </b-modal>
          </div>
</template>

<script>
export default {

  data () {
    return {
      form: {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        pseudo: ''
      },
      loading: true,
      storelogg: false,
      modalShow: false

    }
  },
  mounted () {
  this.form.email = localStorage.getItem('email')
  this.form.firstname = this.$store.state.auth.user.firstname
  this.form.lastname = this.$store.state.auth.user.lastname
  this.form.pseudo = this.$store.state.auth.user.pseudo
  },
methods:{
  checkFirstname(){
      const msgError = document.querySelector('#firstNameError')
      let firstname = this.form.firstname
      if(/^[a-zA-Z-\s]+$/.test(firstname)=== false){
        msgError.innerHTML = " Seul Elon Musk Jr a un symbole,chiffre ici 🦄"
        signupButton.disabled = true;
        document.querySelector('#firstname').style.border = "red 2px solid";
      }
      else{
        msgError.innerHTML = ""
        signupButton.disabled = false;
        document.querySelector('#firstname').style.border = "#5b9d7f 2px solid";
      }
    },

    
    checkLastname(){
      const msgError = document.querySelector('#lastNameError')
      let lastname = this.form.lastname
      if(/^[a-zA-Z-\s]+$/.test(lastname)=== false){
        msgError.innerHTML = " No symbole & chiffre, faut pas déconner 🦄"
        signupButton.disabled = true;
        document.querySelector('#lastname').style.border = "red 2px solid";
      }
      else{
        msgError.innerHTML = ""
        signupButton.disabled = false;
        document.querySelector('#lastname').style.border = "#5b9d7f 2px solid";
      }
    },

    
    checkPseudo(){
      const msgError = document.querySelector('#pseudoError')
      let pseudo = this.form.pseudo
       
      if(/^\S{4,50}$/.test(pseudo)=== false){
        msgError.innerHTML = " Au moins 4 caractères, petite 🦄 !"
        document.querySelector('#pseudo').style.border = "red 2px solid";
        signupButton.disabled = true;
      }
      else{
        msgError.innerHTML = ""
        signupButton.disabled = false;
        document.querySelector('#pseudo').style.border = "#5b9d7f 2px solid";
      }
    },

    checkEmailRegex(){
      const msgError = document.querySelector('#emailRegexError')
      let email = this.form.email
       
      if(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,7}$/.test(email)=== false){
        msgError.innerHTML = " Bien tenté mais un peu de serieux, petite 🦄 !"
        document.querySelector('#email').style.border = "red 2px solid";
        signupButton.disabled = true;
      }
      else{
        msgError.innerHTML = ""
        signupButton.disabled = false;
        document.querySelector('#email').style.border = "#5b9d7f 2px solid";
      }
    },
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


#modal-1{
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
  margin-top :-20px;
}
.modal_avatar{
  
  height: 100px;
  width: 100px;
  max-height: 100px;
  max-width: 100px;
  margin: auto auto auto auto;
  text-align: center;
  border: #5b9d7f solid 3px;

}
.modal-header, .modal-footer{
  display:none;
}

.modal-content {
  background-color : black ;
}

.btn-primary {
  color: #fff;
  background-color: #5b9d7f;
  border-color: #5b9d7f;
  margin-left: 40px;
}
.btn-primary:disabled{
  color: rgba(66, 65, 65, 0.541);
  background-color: #0d0e0d;
  border-color: #9d5b5b;
  margin-left: 40px;
}

.errorMessage {
  font-size: 10px;
  color: #5b9d7f;
  display: flex;
  margin : 3px 10px 0 20px;
  white-space: normal;
  justify-content: center;
}
</style>
