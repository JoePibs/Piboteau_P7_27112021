<template>
    <b-form  @submit="onSubmit" v-if="show">
        <b-form-group id="input-group-1" label="Prénom:" label-for="input-1">
            <b-form-input
            id="input-1"
            v-model="form.firstname"
            placeholder="Entrez votre prénom"
            required
            ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Nom:" label-for="input-2">
            <b-form-input
            id="input-2"
            v-model="form.name"
            placeholder="Entrez votre nom"
            required
            ></b-form-input>
        </b-form-group>
        <b-form-group
            id="input-group-3"
            label="Email:"
            label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="form.email"
            type="email"
            placeholder="Entrez votre email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Confirmation email:"
          label-for="input-4"
        >
            <b-form-input
            id="input-4"
            v-model="form.emailconfirm"
            type="email"
            placeholder="Entrez à nouveau votre email"
            required
            ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-6" label="Password:" label-for="input-6">
            <b-form-input
            id="input-6"
            v-model="form.password"
            placeholder="Entrez votre mot de passe"
            required
            ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-7" label="Password:" label-for="input-7">
            <b-form-input
            id="input-7"
            v-model="form.confirmpassword"
            placeholder="Entrez votre mot de passe"
            required
            ></b-form-input>
        </b-form-group>
        <div class=button_inscription>
            <img src="@/assets/unicorn_prout.png" alt="licorne lancement">
            <b-button type="submit" variant="primary">Launch</b-button>
        </div>
        
    </b-form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          emailconfirm :'',
          password :'',
          confirmpassword:'',
          firstname:'',
          name: '',
        },
        show: true,
      }
    },
    methods: {
      onSubmit(event) {
        console.log(data)
        event.preventDefault()
        alert(JSON.stringify(this.form))
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
    width: 80%;
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

</style>