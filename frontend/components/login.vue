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
      <img src="@/assets/images/unicorn_skating.png" alt="licorne qui skate" />
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

