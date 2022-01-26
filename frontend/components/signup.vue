<template>
  <b-form @submit="onSubmit" v-if="show">
    <b-form-group id="firstname-group" label="Prénom:" label-for="firstname">
      <b-form-input
        id="firstname"
        v-model="form.firstname"
        @change="checkingFirstname"
        placeholder="Entrez votre prénom"
        required
      ></b-form-input>
      <div class="errorMessage" id="firstNameError"></div>

    </b-form-group>
    <b-form-group id="lastname-group" label="Nom :" label-for="lastname">
      <b-form-input
        id="lastname"
        v-model="form.lastname"
        @change="checkLastname"
        placeholder="Entrez votre nom"
        required
      ></b-form-input>
      <div class="errorMessage" id="lastNameError"></div>

    </b-form-group>
    <b-form-group id="pseudo-group" label="Pseudo :" label-for="pseudo">
      <b-form-input
        id="pseudo"
        @change="checkPseudo"
        v-model="form.pseudo"
        placeholder="Entrez votre pseudo"
        required
      ></b-form-input>
      <div class="errorMessage" id="pseudoError"></div>

      <div></div>
    </b-form-group>
    <b-form-group id="email-group" label="Email :" label-for="email">
      <b-form-input
        id="email"
        v-model="form.email"
        @change= "checkEmailRegex"
        type="email"
        placeholder="Entrez votre email"
        required
      ></b-form-input>
      <div class="errorMessage" id="emailRegexError"></div>
    </b-form-group>

    <b-form-group
      id="confirm-email-group"
      label="Confirmation email:"
      label-for="confirm-email"
    >
      <b-form-input
        id="confirm-email"
        v-model="form.emailconfirm"
        @change="checkEmail"
        type="email"
        placeholder="Entrez à nouveau votre email"
        required
      ></b-form-input>
      <div class="errorMessage" id="emailError"></div>

    </b-form-group>
    <b-form-group id="password-group" label="Password :" label-for="password">
      <b-form-input
        type="password"
        id="password"
        v-model="form.password"
        @change= "checkPasswordRegex"
        placeholder="Entrez votre mot de passe"
        required
      ></b-form-input>
      <div class="errorMessage" id="passwordRegexError"></div>
    </b-form-group>

    <b-form-group id="password-confirm-group" label="Confirmez le password :" label-for="password-confirm">
      <b-form-input
        id="password-confirm"
        type="password"
        v-model="form.confirmpassword"
        @change="checkPassword"
        placeholder="Entrez votre mot de passe"
        required
      ></b-form-input>
      <div class="errorMessage" id="passwordError"></div>      
    </b-form-group>
                   <b-form-file 
                    v-model="form.avatar"
                    @change="avatarChange"
                    class="inputFile" 
                    name="post_avatar" 
                    id="post_avatar">
                    
                </b-form-file >
                
                <div class="selectedFile">Selected file: {{ form.avatar ? form.avatar.name : '' }}</div>
                
                <div class="create_style" id="style_upload" onclick="document.querySelector('#post_avatar').click();">
                  
                        <b-button id="inscription"  ><img id="new_avatar" :src="form.avatar"><span>votre avatar</span> </b-button> 
      
                </div>

    <div class="button_inscription">
      <img src="@/assets/images/unicorn_prout.png" alt="licorne lancement" />
      <b-button type="submit" variant="primary" id="signupButton" >Launch</b-button>
    </div>
  </b-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        emailconfirm: '',
        password: '',
        confirmpassword: '',
        firstname: '',
        lastname: '',
        pseudo: '',
        avatar:'http://localhost:8080/images/ponita.png1642095102033.png'
      },
      show: true
    }
  },

  methods: {
    checkingFirstname(){
      const msgError = document.querySelector('#firstNameError')
      let firstname = this.form.firstname
      console.log(firstname)
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

    
    checkPasswordRegex(){
      const msgError = document.querySelector('#passwordRegexError')
      let password = this.form.password
       
      if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)=== false){
        msgError.innerHTML = " Minimum une minuscule,un majuscule, un chiffre & un symbole, petite 🦄 !"
        document.querySelector('#password').style.border = "red 2px solid";
        signupButton.disabled = true;
      }
      else{
        msgError.innerHTML = ""
        document.querySelector('#password').style.border = "#5b9d7f 2px solid";
        signupButton.disabled = false;
      }
    },

    



    checkEmail () {
      const msgError = document.querySelector('#emailError')
      if (this.form.email === this.form.emailconfirm) {
        msgError.innerHTML = ''
        document.querySelector('#email').style.border = "#5b9d7f 2px solid";
        document.querySelector('#confirm-email').style.border = "#5b9d7f 2px solid";
        signupButton.disabled = false;
      } else {
        msgError.innerHTML = '⚠️Les deux emails sont différents⚠️'
        document.querySelector('#email').style.border = "red 2px solid";
        document.querySelector('#confirm-email').style.border = "red 2px solid";
        signupButton.disabled = true;
      }
    },

    checkPassword () {
      const msgError = document.querySelector('#passwordError')
      if (this.form.password === this.form.confirmpassword) {
        msgError.innerHTML = ''
        document.querySelector('#password').style.border = "#5b9d7f 2px solid";
        document.querySelector('#password-confirm').style.border = "#5b9d7f 2px solid";
         signupButton.disabled = false;
      } else {
        msgError.innerHTML = '⚠️Les deux mots de passe sont différents⚠️'
        document.querySelector('#password').style.border = "red 2px solid";
        document.querySelector('#password-confirm').style.border = "red 2px solid";
        signupButton.disabled = true;
      }
    },
    avatarChange() {
        var formData = new FormData();
        var imagefile = document.querySelector('#post_avatar');
        formData.append("image", imagefile.files[0]);
        this.$axios.post('/upload', formData, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(res => {
            this.form.avatar= res.data.url
        })
    },

    onSubmit (event) {
      event.preventDefault()
            if (this.form.email === '' || this.form.email !== this.form.emailconfirm)
              return
            if (
              this.form.password === '' ||
              this.form.password !== this.form.confirmpassword
            )
              return
            this.$axios
              .post('auth/signup', this.form)
              .then(async response => {
                await this.$store.dispatch('auth/login', {
                  email: this.form.email,
                  password: this.form.password
                })
                this.$router.push('/timeline') 
              })
              .catch(error => {
                alert(error.data.message)
              })
      }
    }
}
</script>


