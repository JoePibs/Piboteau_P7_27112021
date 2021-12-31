<template>
  <div>
    <div class="header">
      <b-img class="logo"  src="@/assets/header_home.png" fluid alt="logo"></b-img>
    </div>
    <div v-if="loading === false">
      <Nuxt />
    </div>
    <div class="footer">
      <p>2021 copyright : MylittlePony Faction</p>
      <p>Jonathan Piboteau website</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true
    }
  },
  async mounted () {
    await this.$store.dispatch('auth/init')
    this.loading = false
  }
}
</script>

<style>
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  margin: 0;
  background: black;
  max-width: 100%;
}
.header {
  background-color: rgb(0, 0, 0);
  width: 100%;
  max-height: 150px;
  border-bottom: solid 1px #5b9d7f;
}

.logo {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  max-height: 150px;
  width: 100%;
  max-width:500px;
  justify-content: space-around;
  display: flex;
  
}
.footer {
  width: 100%;
  height: auto;
  border-top: solid 1px #5b9d7f;
  padding: 20px;
}
.footer p {
  font-size: 10px;
  color: azure;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  margin-bottom: 2px;
  text-align: center;
}
</style>
