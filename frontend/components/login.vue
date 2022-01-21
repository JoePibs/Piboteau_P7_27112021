<template>
  <b-form @submit="onSubmit" v-if="show">
    <b-form-group id="input-group-5" label="Email:" label-for="input-5">
      <b-form-input
        id="input-5"
        v-model="form.email"
        type="email"
        placeholder="Entrez votre email"
        required
      ></b-form-input>
    </b-form-group>
    <b-form-group id="input-group-6" label="Password:" label-for="input-">
      <b-form-input
        id="input-6"
        type="password"
        v-model="form.password"
        placeholder="Entrez votre mot de passe"
        required
      ></b-form-input>
    </b-form-group>
    <div class="button_inscription">
      <img src="@/assets/unicorn_skating.png" alt="licorne qui skate" />
      <b-button type="submit" variant="primary">Back in the Game</b-button>
    </div>
  </b-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true
    }
  },

  methods: {
    async onSubmit (event) {
      event.preventDefault()
      await this.$store.dispatch('auth/login', {
        email: this.form.email,
        password: this.form.password
      })
      if (this.$store.state.auth.loggedIn)
          this.$router.push('/timeline') 
    },
    
  
  }
  
}
</script>

<style>
.nav-tabs {
  border-bottom: 1px solid #5b9d7f;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: #f5f6f8;
  background-color: #5b9d7f;
  border-color: #5b9d7f;
}
a {
  color: #5b9d7f;
}
.d-block {
  margin-left: 20px;
  font-size: 14px;
  color: white;
}
.form-control {
  color: #fff;
  background-color: #212529;
  border: 1px solid #212529;
  font-size: 12px;
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
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
}
</style>
