<template>
    <div class="create"> 
        <div class="create_post">
            <b-avatar variant="info" :src="$store.state.auth.user.avatar" class="avatar_user" alt="userImage"></b-avatar>
            <p class="username_create"> {{$store.state.auth.user.firstname}} {{$store.state.auth.user.lastname}} <span>@{{$store.state.auth.user.pseudo}}</span></p>
        
            <b-form @submit="onSubmit" enctype="multipart/form-data" >
                    <b-form-textarea
                        id="postInput"
                        class="postInput"
                        v-model="form.content"
                        label="Taper votre post"
                        label-for="postInput"
                        type="textarea"
                        placeholder="Hennir la bonne parole 👉"
                        rows="4"
                        max-rows="6">
                    </b-form-textarea>

                    <b-form-file 
                        v-model="form.image" 
                        class="inputFile" 
                        name="post_image" 
                        @change="imageChange"
                        id="post_image">
                    </b-form-file >
                    
                    <div class="selectedFile">Selected file: {{ form.imageUrl ? form.imageUrl.name : '' }}</div>
                    
                    <div class="create_input_style">
                        <div id="overview" v-if="overviewSee === false" @click="seeOverview">Afficher l'aperçu</div>
                        <div id="overview" v-if="overviewSee === true" @click="closeOverview">Fermer l'apercu</div>
                        <div class="button_file">
                            <b-button onclick="document.querySelector('#post_image').click();" ><img src="@/assets/images/file_image.png" alt="logo image vectoriel" />add image</b-button>
                        </div>

                        <div class="button_create">
                            <img src="@/assets/images/unicorn_prout.png" alt="licorne fusée" />
                            <b-button type="submit" variant="create">Lancement</b-button>
                        </div>
                    </div>
            </b-form>
        </div>
        <div v-if="overview === true" class="overview_style">
            <div  class="thepost_info">
                <b-avatar :src="$store.state.auth.user.avatar"  class="post_avatar"></b-avatar>
                <p class="thepost_ownername"> {{$store.state.auth.user.firstname}} {{$store.state.auth.user.lastname}} <span>@{{$store.state.auth.user.pseudo}}</span></p>
            </div>
            <div>
                <p class="thepost_time"> il y a xx minutes</p>
            </div>
            <div class="thepost_content">
                <div class="thepost_text_style">
                    <p class="thepost_text"> {{form.content}} </p>
                </div>
                <b-img :src="form.imageUrl" fluid alt="image de post" class="thepost_image" v-if="form.imageUrl !=''"> </b-img>
            </div>
        </div>       
    </div>
        

</template>

<script>
  export default {
      
    data() {
      return {
        form: {
            userId:'',
            content: '',
            imageUrl: '',
        },
        overview: false,
        overviewSee : false
        
      }
    },
 
  methods: {
    seeOverview(){
        this.overview = true
        this.overviewSee = true

    },
    closeOverview(){

        this.overview = false
        this.overviewSee = false

    },
    imageChange() {
        var formData = new FormData();
        var imagefile = document.querySelector('#post_image');
        formData.append("image", imagefile.files[0]);
        this.$axios.post('/upload', formData, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(res => {
            this.form.imageUrl= res.data.url
        })
    },
 
    
    onSubmit (event) {
        event.preventDefault()
        let userId = localStorage.getItem('userId')
        this.form.userId = userId
        this.$axios
        .post('/post/createpost', this.form)        
        .then(response => {
            location.reload();
                return false;
        })
     
    }
  }
}
</script>