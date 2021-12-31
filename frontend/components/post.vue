<template>
  <div class="posts">
    <div class="onepost">
        <b-avatar src="" class="avatarPost"></b-avatar>
        <div class="cardPost">
            <div class="infoPost"></div>
                <p class="ownerPseudo"> </p>
                <p class="ownerName"> </p>
                <p class="timePost"> </p>
            <div>
            <div class="contentPost">
                <b-img src="" fluid alt="image de post" class="imagePost"> </b-img>
                <p class="textPost"> </p>
            </div>
            <div class="reactionUser"></div>
                <p class="numberOfComments">  </p>
                <p>  <p>
                <b-img src="@/assets/like_unicorn.png" fluid alt="funky licorne" class="like" > </b-img>
                <p class="numberOfLikes"> </p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default{
  data () {
    return {
    }
  },
  loadPost () {
      // declation element
      let ownerPseudo = document.querySelector(".ownerPseudo")
      let ownerName = document.querySelector(".ownerName")
      let timePost = document.querySelector(".timePost")
      let imagePost = document.querySelector(".imagePost")
      let textPost = document.querySelector(".textPost")
      let avatar = document.querySelector(".avatarPost")

    //call API
      this.$axios
      .get('post')
      .then(response => response.data)
  }
   
}
</script>


<style>

</style>