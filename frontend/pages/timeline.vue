<template >
    <b-container class="bv-example-row">
      
        <b-row>
            <b-col class="hidden">3 of 3</b-col>

            <b-col class= "visibility" ><postsTimeline  /></b-col>

            <b-col class="hidden">3 of 3</b-col>
        </b-row>
</b-container>
</template>

<script>
import postsTimeline from '../components/postsTimeline.vue'
export default {
  components: { postsTimeline },
  name: 'timeline',
  data () {
      return {

      }
    },
}
</script>

<style>
.hidden{
  display: none;
}
.visibility{
  width: 100%;
  height: 500px;
  overflow: auto;
}
</style>