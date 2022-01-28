<template>
  <div>
    <b-modal id="modal-1" title="monProfil">
      <div>
        <b-icon icon="x-square-fill" aria-hidden="true" class="close" @click="closeModal"></b-icon> 
      </div>
      <div class="myprofil_header">
        <b-avatar  class="modal_avatar" :src="$store.state.auth.user.avatar"></b-avatar>
        <p id="username_modal"> {{$store.state.auth.user.firstname}} {{$store.state.auth.user.lastname}}</p>
        <span id="pseudo_title_modal">@{{$store.state.auth.user.pseudo}}</span>
        <div id="desinscription" class="desinscription">
          <b-button @click="alert" variant="outline-info" class="mb-2">
            <b-icon icon="power" aria-hidden="true"></b-icon> Désactiver mon compte
          </b-button>
          <b-alert show v-if="alertMessage === true" variant="danger" id="alert"> Vous êtes sur ? 
            <b-button @click="desactivateAccount" variant="danger">Oui</b-button>
            <b-button @click ="closeAlert" variant="success" id="oups">Oups </b-button>
            <p id="alert_text">En cliquant sur Oui, vous serez automatiquement renvoyé vers la page d'accueil et votre compte sera desactivé</p>
          </b-alert>
        </div>
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
          <b-form-group id="bio-group" label="Bio :" label-for="bio">
            <b-form-textarea
              id="bioInput"
              class="bioInput"
              v-model="form.bio"
              type="textarea"
              placeholder="Détailler votre licorne life, job, etc..."
              rows="5"
              max-rows="5">
            </b-form-textarea>
            </b-form-group>
          <b-form-file 
            v-model="form.avatar"
            @change="avatarChange"
            class="inputFile" 
            name="change_avatar" 
            id="change_avatar">
          </b-form-file >
          <div class="selectedFile">Selected file: {{ form.avatar ? form.avatar.name : '' }}</div>
          <div id="style_upload">
            <b-button onclick="document.querySelector('#change_avatar').click();" ><img id="profil_avatar" :src="form.avatar"/><span>Modifier votre avatar</span></b-button>        
          </div>
          <div class="button_modification">
            <b-button type="submit" id="validation_button" >Valider</b-button>
            <b-button @click="cancel" id="cancel_button" >Annuler</b-button>
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
        firstname: '',
        lastname: '',
        pseudo: '',
        avatar:'',
        bio:'',
      },
      loading: true,
      storelogg: false,
      alertMessage :false,

    }
  },
  mounted () {
    this.cancel()

  },
methods:{

  closeModal(){
    this.$bvModal.hide('modal-1')
  },
  alert(){
    this.alertMessage = true
  },
  closeAlert(){
    this.alertMessage = false
  },
  desactivateAccount(){
    this.$axios
      .$put("auth/desactivate")
      .then( response =>{
      this.$store.dispatch('auth/logout')
      this.$router.push('/');
      this.$bvModal.hide('modal-1')
      }
    )
    
  },
  checkFirstname(){
      const msgError = document.querySelector('#firstNameError')
      let firstname = this.form.firstname
      if(/^[a-zA-Z-\s]+$/.test(firstname)=== false){
        msgError.innerHTML = " Seul Elon Musk Jr a un symbole,chiffre ici 🦄"
        validation_button.disabled = true;
        document.querySelector('#firstname').style.border = "red 2px solid";
      }
      else{
        msgError.innerHTML = ""
        validation_button.disabled = false;
        document.querySelector('#firstname').style.border = "#5b9d7f 2px solid";
      }
    },

    
    checkLastname(){
      const msgError = document.querySelector('#lastNameError')
      let lastname = this.form.lastname
      if(/^[a-zA-Z-\s]+$/.test(lastname)=== false){
        msgError.innerHTML = " No symbole & chiffre, faut pas déconner 🦄"
        validation_button.disabled = true;
        document.querySelector('#lastname').style.border = "red 2px solid";
      }
      else{
        msgError.innerHTML = ""
        validation_button.disabled = false;
        document.querySelector('#lastname').style.border = "#5b9d7f 2px solid";
      }
    },

    
    checkPseudo(){
      const msgError = document.querySelector('#pseudoError')
      let pseudo = this.form.pseudo
       
      if(/^\S{4,50}$/.test(pseudo)=== false){
        msgError.innerHTML = " Au moins 4 caractères, petite 🦄 !"
        document.querySelector('#pseudo').style.border = "red 2px solid";
        validation_button.disabled = true;
      }
      else{
        msgError.innerHTML = ""
        validation_button.disabled = false;
        document.querySelector('#pseudo').style.border = "#5b9d7f 2px solid";
      }
    },

    checkEmailRegex(){
      const msgError = document.querySelector('#emailRegexError')
      let email = this.form.email
       
      if(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,7}$/.test(email)=== false){
        msgError.innerHTML = " Bien tenté mais un peu de serieux, petite 🦄 !"
        document.querySelector('#email').style.border = "red 2px solid";
        validation_button.disabled = true;
      }
      else{
        msgError.innerHTML = ""
        validation_button.disabled = false;
        document.querySelector('#email').style.border = "#5b9d7f 2px solid";
      }
    },
    
    avatarChange() {
        var formData = new FormData();
        var imagefile = document.querySelector('#change_avatar');
        formData.append("image", imagefile.files[0]);
        this.$axios.post('/upload', formData, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(res => {
            this.form.avatar= res.data.url
            imagefile = this.form.avatar

        })
    },
    cancel(){
      this.form.email = localStorage.getItem('email')
      this.form.firstname = localStorage.getItem('firstname')
      this.form.lastname = localStorage.getItem('lastname')
      this.form.pseudo = localStorage.getItem('pseudo')
      this.form.avatar = localStorage.getItem('avatar')
      const bio = localStorage.getItem('bio') 
        if(bio != "null"){
        this.form.bio = localStorage.getItem('bio')}
    },
    onSubmit (event) {
      event.preventDefault()
            this.$axios
              .put('auth/update', this.form)
              .then(async response => {
                localStorage.setItem('email', this.form.email ) 
                localStorage.setItem('firstname',this.form.firstname ) 
                localStorage.setItem('lastname',this.form.lastname) 
                localStorage.setItem('pseudo',this.form.pseudo) 
                localStorage.setItem('avatar',this.form.avatar)
                localStorage.setItem('bio',this.form.bio)
                alert("Licorne Modifié ")
                this.$router.push('/timeline') 
                location.reload();
                return false;

                })
              .catch(error => {
                alert(error.response.data.message)
              })
    }
  }
}

  


</script>


