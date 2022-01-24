<template>
  <div>
    <b-tabs style  class="signup" content-class="mt-3">
      <b-tab  title="S'inscrire" active >
        <signup/>
    </b-tab>

    <b-tab title="Se connecter">
        <login/>
    </b-tab>
      
  </b-tabs>

</div>
</template>

<script>
import login from '../components/login.vue'
import signup from '../components/signup.vue'
export default {
  components: { signup, login },
  name: 'joe'
}
</script>
