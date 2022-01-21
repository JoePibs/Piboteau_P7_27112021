<template>
    <div class="create"> 
        <div class="create_post">
            <b-avatar variant="info" :src="$store.state.auth.user.avatar" class="avatarUser" alt="userImage"></b-avatar>
            <p class="userName_create"> {{$store.state.auth.user.firstname}} {{$store.state.auth.user.lastname}} <span>@{{$store.state.auth.user.pseudo}}</span></p>
        
            <b-form @submit="onSubmit" enctype="multipart/form-data" >
                    <b-form-textarea
                        id="postInput"
                        class="postInput"
                        v-model="form.content"
                        type="textarea"
                        placeholder="Hennir la bonne parole 👉"
                        rows="2"
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
                            <b-button onclick="document.querySelector('#post_image').click();" ><img src="@/assets/file_image.png" alt="logo image vectoriel" />add image</b-button>
                        </div>

                        <div class="button_create">
                            <img src="@/assets/unicorn_prout.png" alt="licorne fusée" />
                            <b-button type="submit" variant="create">Lancement</b-button>
                        </div>
                    </div>
            </b-form>
        </div>
        <div v-if="overview === true" class="overview_style">
            <div  class="infoPost">
                <b-avatar :src="$store.state.auth.user.avatar"  class="avatarPost"></b-avatar>
                <p class="ownerName"> {{$store.state.auth.user.firstname}} {{$store.state.auth.user.lastname}} <span>@{{$store.state.auth.user.pseudo}}</span></p>
            </div>
            <div>
                <p class="timePost"> il y a xx minutes</p>
            </div>
            <div class="contentPost">
                    <p class="textPost"> {{form.content}} </p>
                    <b-img :src="form.imageUrl" fluid alt="image de post" class="imagePost" v-if="form.imageUrl !=''"> </b-img>
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

<style>
.create{

    border-bottom: dashed 1px#5b9d7f;
    padding: 5px 5px 10px 5px;
    margin-top : 3px;
    margin-bottom:20px;
}
.create_post{
    margin-top : 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
}
.userName_create span{
    font-size:10px;
    color: #5b9d7f;
}
.userName_create{
    padding-left : 10px;
    font-size : 14px;
}
.postInput{
    margin-left:30px;
    background: none;
    border:1px #5b9d7f3f solid;
    margin-top : -15px;
    width: 340px;
    
}

.userName span{
    color: #5b9d7f;
    font-size: 10px ;
}
.inputFile{
    display: none;

}
.button_file{
    width: auto;
    display: flex;
    flex-direction: row;
}

#overview{

    font-size : 13px;
    color: #5b9d7f;
    background-color: transparent;
    margin-top:-5px;
    margin-right:30px;
    cursor: pointer;
}

.overview_style{
    width:300px;
    margin: 20px auto 10px auto;
}
.btn-secondary {
    font-size : 10px;
    background-color: transparent;
    border: none;
    margin-top:-10px;
    }
.button_file img{
    width: 30px;
    margin-right: 5px;
}

.button_create{
  display: flex;
  flex-direction: row;
  align-items: center;

}
.button_create img {
  height: 40px;
  margin-left: auto;
  margin-right: -55px;
  z-index: 5;
}

.btn-create {
    color: #fff;
    font-size:10px;
    background-color: #5b9d7f;
    border-color: #5b9d7f;
    margin-left: 45px;
}

.create_input_style{
    display: flex;
    flex-direction: nowrap;
    justify-content: flex-end;
    margin-top:5px;
    z-index: 4;
}

.btn-secondary:hover {
    
    background-color: transparent;
    border-color: #5b9d7f;
}

.btn:hover {
    color: #212529;
    text-decoration: none;
}
.selectedFile{
    display:none;
}

</style>