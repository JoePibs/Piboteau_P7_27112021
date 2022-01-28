<template>
  <b-button id="mode"  v-if=" darkMode" @click="toggleSwitch">
    <span>dark <b-icon icon="circle-half" aria-hidden="true"></b-icon></span>
  </b-button>
  <b-button id="mode" v-else @click="toggleSwitch">
    <span>light <b-icon icon="circle-half" aria-hidden="true"></b-icon></span>
  </b-button>

</template>
<script>
export default {
  data(){
    return{
      darkMode:true,
    }
  },
  methods:{
    toggleSwitch(){
      this.$colorMode.preference = this.$colorMode.preference === 'light' ? 'dark' : 'light';
      this.darkMode = !this.darkMode;
      
    }
  }
};
</script>
