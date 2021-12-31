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

<style>
.signup{
  border: solid 1px #5b9d7f;
  border-radius : 5px;
  box-shadow: #5b9d7f79 0px 10px 20px, #5b9d7f81 0px 6px 6px;
}
</style>