<template>
    <b-form  @submit="onSubmit" v-if="show">
        <b-form-group id="firstname-group" label="Prénom:" label-for="firstname">
            <b-form-input
            id="firstname"
            v-model="form.firstname"
            placeholder="Entrez votre prénom"
            required
            ></b-form-input>
        </b-form-group>
        <b-form-group id="lastname-group" label="Nom :" label-for="lastname">
            <b-form-input
            id="lastname"
            v-model="form.lastname"
            placeholder="Entrez votre nom"
            required
            ></b-form-input>
        </b-form-group>
        <b-form-group id="pseudo-group" label="Pseudo :" label-for="pseudo">
            <b-form-input
            id="pseudo"
            v-model="form.pseudo"
            placeholder="Entrez votre pseudo"
            required
            ></b-form-input>

            <div class = "errorMessage" id="pseudoError"></div>
            <div>

            </div>
        </b-form-group>
        <b-form-group
            id="email-group"
            label="Email :"
            label-for="email"
        >
          <b-form-input
            id="email"
            v-model="form.email"
            @change="checkEmail"
            type="email"
            placeholder="Entrez votre email"
            required
          ></b-form-input>
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
            <div class = "errorMessage" id="emailError"></div>
            
        </b-form-group>
        <b-form-group id="password-group" label="Password :" label-for="password">
            <b-form-input
            type="password"
            id="password"
            v-model="form.password"
            @change="checkPassword"
            placeholder="Entrez votre mot de passe"
            required
            ></b-form-input>
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
            <div class = "errorMessage" id="passwordError"></div>
        </b-form-group>
        <div class=button_inscription>
            <img src="@/assets/unicorn_prout.png" alt="licorne lancement">
            <b-button type="submit" variant="primary">Launch</b-button>
        </div>
        
    </b-form>
</template>

<script>
import  axios from 'axios'
  export default {
    data() {
      return {
        form: {
          email: '',
          emailconfirm :'',
          password :'',
          confirmpassword:'',
          firstname:'',
          lastname: '',
          pseudo :'',
        },
        show: true,
      }
    },
    
    methods:
    {
        
      checkEmail(event){
           var body ={
              email : this.form.email,
              emailConfirm : this.form.emailconfirm,
            }
        function emailConfirmation(){
           
            let email = body.email
            let confirmEmail = body.emailConfirm
            console.log(email,confirmEmail)
            if(email === confirmEmail){
                let msgError = document.querySelector('#emailError');
                msgError.innerHTML = ""
            }
            else {
                let msgError = document.querySelector('#emailError');
                msgError.innerHTML = "⚠️Les deux emails sont différents⚠️"
            }
        }
        emailConfirmation()

      },

      checkPassword(event){
          var body ={
              password : this.form.password,
              passwordconfirm : this.form.confirmpassword,
          }
        function passwordConfirmation(){
            let password = body.password
            let confirmpassword = body.passwordconfirm
            console.log(password,confirmpassword)
            if(password === confirmpassword){
                let msgError = document.querySelector('#passwordError');
                msgError.innerHTML = ""
            }
            else {
                let msgError = document.querySelector('#passwordError');
                msgError.innerHTML = "⚠️Les deux mots de passe sont différents⚠️"
            }
        }
        passwordConfirmation()

      },

      onSubmit(event) {
        event.preventDefault();
        var body = {
            firstname:this.form.firstname,
            lastname:this.form.lastname,
            password:this.form.password,
            pseudo:this.form.pseudo,
            email:this.form.email,
            emailconfirm:this.form.emailconfirm,
            confirmpassword:this.form.confirmpassword
            }
        function confirmInput(){
            let email = body.email
            let confirmEmail = body.emailconfirm
            let password = body.password
            let confirmPassword = body.confirmpassword
            if(confirmPassword === password && email === confirmEmail){
                axios.post('http://localhost:8080/api/auth/signup',body)
                .then(response => {
                    console.log(response)
                    if (response.status === 250){
                    alert("change ton pseudo !!! ");
                    } else if(response.status === 251){
                        alert("Email déja utilisé");
                    }else{
                        alert("Vous etes maintenant une licorne ");
                    }
                })
                .catch(error => {
                response.status(500).json ({message : "It's end of the world ==> serveur HS"})
                });
            } else
                    alert("Merci de modifier les éléments non valides ");  

            }
        confirmInput()
        }
        

        
    }
  }
</script>

<style>
.nav-tabs {
    border-bottom: 1px solid #5b9d7f;
}
.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    color: #f5f6f8;
    background-color: #5b9d7f;
    border-color: #5b9d7f;
}
a {
    color: #5b9d7f;
}
.form-control{
    color: #fff;
    background-color: #212529;
    border: 1px solid #212529;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
}
.form-control:focus {
    color: #5b9d7f;
    background-color: #292828;
    border-color: #5b9d7f;
    box-shadow: 0 0 0 0.2rem #5b9d7f29;
}
.btn-primary {
    color: #fff;
    background-color: #5b9d7f;
    border-color: #5b9d7f;
    margin-left: 40px;
}
.button_inscription{
    display: flex;
    flex-direction: row;
    align-items: center;
}


.button_inscription img{
    height: 50px;
    margin-left:auto ;
    margin-right: -55px;
    z-index: 1;

}

.errorMessage{
    font-size: 10px;
    color :#5b9d7f;
    display: flex;
    justify-content: center;

}
</style>