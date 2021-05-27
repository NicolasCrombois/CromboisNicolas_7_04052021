<template>
  <div class="container">
    <div class="container-fluid">
      <NavBar />
      <div id="head-body">
        <h1>Le t'Chat</h1>
          <p>Vous êtes dans l'onglet communauté, ici vous y retrouverez les publications de vos collègues à propos de divers sujet.<br/>
          Et vous pouvez, vous aussi, échanger avec eux en publiant des articles ou en les commentant</p>
      </div>
      <div id="form">
        <div class="container-errors" v-if="success_info.length != 0">
          <div class="content-success">
            <div id="success-logo"><i class="fas fa-check"></i></div>
            <ul>
              <li v-for="success in success_info" :key="success.msg" class="align-middle text-center">
                {{ success.msg }}
              </li>
            </ul>
          </div>
        </div>
        <div class="container-errors" v-if="errors.length != 0">
          <div class="content-errors">
            <div id="error-logo"><i class="fas fa-exclamation-circle"></i></div>
            <ul>
              <li v-for="error in errors" :key="error.msg" >
                {{ error.msg }}
              </li>
            </ul>
          </div>
        </div>
        <div class="icon"><i class="far fa-envelope"></i> <p>Votre message :</p></div>
        <textarea class="inputTable" placeholder="Votre message ..." v-model="message"></textarea>
        <button @click="postPublication()">Je publie !</button>
      </div>
      <Publication />
    </div>
  </div>
</template>

<script>
import NavBar from '../components/nav-bar';
import Publication from '../views/Publication';
import axios from 'axios';

export default {
  name: 'PostRegisterUser',
  components: {
    NavBar,
    Publication
  },
  computed: {
    publicationsGlobal(){
      return this.$store.state.publications
    }
  },
  data() {
    return{
    message: '',
    errors: [],
    success_info: [],
    }
  },
  methods: {
    refresh(){
      this.publications = [];
      axios.get(process.env.VUE_APP_API_HOST+'publication/')
      .then(res => {
        this.$store.commit('setPublicationsGlobal', res.data)
        /*(res.data).forEach(element => {
            let datearray = element.updatedAt.split(/T|-|:/);
            element.updatedAt = datearray[2]+'/'+datearray[1]+'/'+datearray[0]+' à '+datearray[3]+"h"+datearray[4];
            axios.get(process.env.VUE_APP_API_HOST+'auth/'+element.userId)
            .then(userInfo => {
              this.publications.push({publication_info: element, user_info: userInfo.data})
            })
        });*/
      })
      .catch(error => console.log(error));
    },
    postPublication(){
      this.errors = [];
      this.success_info = []
      if (this.message == ''){
        this.errors.push({msg : 'Aucun message n\'a été saisi'})
      }
      if(this.errors.length == 0){
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('user-token');
        axios.post(process.env.VUE_APP_API_HOST+'publication/publish', {content: this.message, userId: sessionStorage.getItem('user-id')})
        .then ((res) => {
          if(res.data.message == "Message Posted"){
            this.success_info.push({msg: 'Votre message vient être publié !'})
          }
        })
        .then(() => {
          this.refresh()
        })
        .catch((error) => {
          this.errors.push({msg: error})
        })
      }
    },
    postComment(publicationId, index){
      if(this.errors.length == 0){
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('user-token');
        console.log(this.comment[index]);

        axios.post(process.env.VUE_APP_API_HOST+'comment/publish', {publicationId: publicationId, content: this.comment[index], userId: sessionStorage.getItem('user-id')})
        .then (
          this.refresh()
        )
        .catch((error) => {
          this.errors.push({msg: error})
        })
      }
    }
  },
  mounted() {
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('user-token');
    axios.get(process.env.VUE_APP_API_HOST+'publication/')
    .then(res => {
      this.$store.commit('setPublicationsGlobal', res.data);
      console.log(this.$store.state.publications);
      /*(res.data).forEach(publication => {

        var reg = new RegExp("((http://)[a-zA-Z0-9/.]+)+","gi");
        var replacedText = (publication.content).replace(reg, "<A href='$1' target=_blank>$1</A>");

        reg = new RegExp("((https://)[a-zA-Z0-9/.]+)+","gi");
        replacedText = (publication.content).replace(reg, "<A href='$1' target=_blank>$1</A>");


        replacedText = replacedText.replace(/(?:\r\n|\r|\n)/g, '<br>');

        publication.content = replacedText;

        /*let datearray = publication.updatedAt.split(/T|-|:/);
        publication.updatedAt = datearray[2]+'/'+datearray[1]+'/'+datearray[0]+' à '+datearray[3]+"h"+datearray[4];
        
          // push info publication dans this?publications
          // Et apres faire call pour user 
        axios.get(process.env.VUE_APP_API_HOST+'auth/'+publication.userId)
        .then(userInfo => {
          this.publications.push({publication_info: publication, user_info: userInfo.data})
        })
        .catch(error => console.log(error));
        (publication.Comments).forEach(comment => {
          let datearray = comment.updatedAt.split(/T|-|:/);
          comment.updatedAt = datearray[2]+'/'+datearray[1]+'/'+datearray[0]+' à '+datearray[3]+"h"+datearray[4];
          const keyuser = comment.userId;
          if(!(keyuser in this.users)){
            axios.get(process.env.VUE_APP_API_HOST+'auth/'+comment.userId)
            .then(userInfo => {
              this.users[keyuser] = userInfo.data
            })
          }
        });
      });*/
    })
    .catch(error => console.log(error))
  },
}
</script>


<style scoped lang="scss">
  @font-face {
    font-family: "OpenSans-R";
    src: local("OpenSans"),
    url("../fonts/OpenSans/OpenSans-Regular.ttf") format("truetype");
  }
  @font-face {
    font-family: "OpenSans-SM";
    src: local("OpenSans"),
    url("../fonts/OpenSans/OpenSans-Semibold.ttf") format("truetype");
  }
  @font-face {
    font-family: "OpenSans-B";
    src: local("OpenSans"),
    url("../fonts/OpenSans/OpenSans-Bold.ttf") format("truetype");
  }
  @font-face {
    font-family: "Roboto-R";
    src: local("Roboto"),
    url("../fonts/Roboto/Roboto-Regular.ttf") format("truetype");
  }
  .container{
    .container-fluid{
      border-left: solid 1px #CDCDCD;
      border-right: solid 1px #CDCDCD;
      padding: 0;
      #head-body{
        background-image: url("../assets/background-texture-groupomania.jpg");
        padding: 15px;
        color: white;
        p {
          font-family: "OpenSans-R";
        }
        h1 {
          font-family: "OpenSans-SM";
        }
      }
      #form{
        width: 95%;
        margin: auto;
        padding: 20px 0;
        display: flex;
        flex-wrap: wrap;
        
        .container-errors{
          width: 100%;
          top: 4vh;
          display: flex;
          .content-success{
            background-color: #30ac0a;
            border-radius: 5px;
            color: white;
            width: 100%;
            margin: auto;
            padding: 10px;
            display: flex;
            li{
              font-size: 18px;
            }
            #success-logo{
              float: left;
              margin-left: 10px;
              height: auto;
              position: relative;
              i{
                margin: auto;
                font-size: 48px;
                position: absolute;
                top: 50%;
                -ms-transform: translateY(-50%);
                transform: translateY(-50%);
              }
            }
          }
          .content-errors{
            background-color: #f9461c;
            border-radius: 5px;
            color: white;
            width: 100%;
            margin: auto;
            padding: 10px;
            display: flex;
            #error-logo{
              float: left;
              margin-left: 10px;
              height: auto;
              position: relative;
              i{
                margin: auto;
                font-size: 48px;
                position: absolute;
                top: 50%;
                -ms-transform: translateY(-50%);
                transform: translateY(-50%);
              }
            }
          }
          p{
            text-align: left;
            padding-left: 3%;
            font-weight: 700;
            float: right;
            width: 90%;
          }
          ul{
            padding: 0;
            float: right;
            width: 90%;
            margin: 0;
            margin-left: 60px;
            li{
              margin-bottom: 4px;
              list-style-type: none;
              text-align: left;
              font-family: "OpenSans-R";
            }
          }
          
        }
        .icon{
          width : 100%;
          i{
            font-size: 20px;
          }
          p{
            font-family: "OpenSans-R";            
            display: inline-block;
            font-size: 20px;
            padding-left: 5px;
          }
        }
        textarea{
          width: 100%;
          min-height: 100px;
          border: 2px solid #d1515a;
          border-radius: 10px;
          padding: 10px;
          font-size: 18px;
        }
        button{
          background-color: #862e34;
          color: white;
          font-size: 16px;
          padding: 10px 45px;
          margin: 15px auto;
          border-radius: 25px;
          bottom: 230px;
          left: calc(50% - 85px);
        }
      }
    }
  }

</style>
