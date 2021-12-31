<template>
    <b-container class="bv-example-row">
        <b-row>
            <b-col >1 of 3</b-col>

            <b-col><post/></b-col>

            <b-col>3 of 3</b-col>
        </b-row>
</b-container>
</template>

<script>
import post from '../components/post.vue'
export default {
  components: { post },
  name: 'timeline'
}
</script>
