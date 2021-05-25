<template>
  <div class="container">
    <div class="container-fluid">
      <NavBar />
      <div id="head-body">
        <h1>Le t'Chat</h1>
          <p>Vous êtes dans l'onglet communauté, ici vous y retrouverez les publications de vos collègues à propos de divers sujet.<br/>
          Et vous pouvez, vous aussi, échanger avec vos collègues en publiant des articles ou en les commentant</p>
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
      <div class="publications">
        <div v-for="(publication, index) in publications" v-bind:key="publication.key" class="publication" >
          <aside class="profile">
            <i class="fas fa-user"></i>
            <div class="profile-information">
              <p class="name">{{ publication.user_info.firstname }} {{ publication.user_info.name }}</p>
              <p v-if="publication.user_info.status != null" class="service">Du service {{ publication.user_info.status }}</p>
              <p class="date">Publié le {{ publication.publication_info.updatedAt }}</p>
            </div>
          </aside>
          <div class="message">
            <p>
              {{ publication.publication_info.content }}
            </p>
          </div>
          <div class="comments"> 
            <h3><i class="fas fa-comments"></i> Les commentaires</h3>
            <div v-if="publication.publication_info.Comments != null">
              <div v-for="commentUnit in publication.publication_info.Comments" v-bind:key="commentUnit.id"  class="comment">
                <div class="profile">
                  <div class="profile-information">
                    <p class="name">{{ users[commentUnit.userId].firstname }} {{ users[commentUnit.userId].name }}</p>
                    <p v-if="users[commentUnit.userId].status != null" class="service">{{ users[commentUnit.userId].status }}</p>
                  </div>
                  <i class="fas fa-user"></i>
                </div>
                <div class="comment-container">
                  <p class="comment-container-message">
                    {{ commentUnit.content }}
                  </p>
                  <p class="comment-container-date">{{ commentUnit.updatedAt }}</p>
                </div>
              </div>
            </div>
            <div class="form-comment">
              <label>Ajouter votre commentaires:</label>
              <textarea v-model="comment[index]" name="comment"></textarea>
              <button @click="postComment(publication.publication_info.id, index)"><p>Envoyer !</p><i class="fas fa-location-arrow"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/nav-bar';
import axios from 'axios';

export default {
  name: 'PostRegisterUser',
  components: {
    NavBar
  },
  data() {
    return{
    message: '',
    publications: [],
    errors: [],
    success_info: [],
    comment: [],
    infoUserComment: [],
    users: [],
    }
  },
  methods: {
    refresh(){
      this.publications = [];
      axios.get('http://localhost:5000/api/publication/')
      .then(res => {
        (res.data).forEach(element => {
            let datearray = element.updatedAt.split(/T|-|:/);
            element.updatedAt = datearray[2]+'/'+datearray[1]+'/'+datearray[0]+' à '+datearray[3]+"h"+datearray[4];
            axios.get('http://localhost:5000/api/auth/'+element.userId)
            .then(userInfo => {
              this.publications.push({publication_info: element, user_info: userInfo.data})
            })
        });
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
        axios.post('http://localhost:5000/api/publication/publish', {content: this.message, userId: sessionStorage.getItem('user-id')})
        .then ((res) => {
          if(res.data.message == "Message Posted"){
            this.success_info.push({msg: 'Votre message vient être publié !'})
          }
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

        axios.post('http://localhost:5000/api/comment/publish', {publicationId: publicationId, content: this.comment[index], userId: sessionStorage.getItem('user-id')})
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
    axios.get('http://localhost:5000/api/publication/')
    .then(res => {
      (res.data).forEach(publication => {

          var reg = new RegExp("((http://)[a-zA-Z0-9/.]+)+","gi");
          var replacedText = (publication.content).replace(reg, "<A href='$1' target=_blank>$1</A>");

          reg = new RegExp("((https://)[a-zA-Z0-9/.]+)+","gi");
          replacedText = (publication.content).replace(reg, "<A href='$1' target=_blank>$1</A>");

          publication.content = replacedText;

          let datearray = publication.updatedAt.split(/T|-|:/);
          publication.updatedAt = datearray[2]+'/'+datearray[1]+'/'+datearray[0]+' à '+datearray[3]+"h"+datearray[4];


          axios.get('http://localhost:5000/api/auth/'+publication.userId)
          .then(userInfo => {
            this.publications.push({publication_info: publication, user_info: userInfo.data})
          })
          .catch(error => console.log(error));
          (publication.Comments).forEach(comment => {
            let datearray = comment.updatedAt.split(/T|-|:/);
            comment.updatedAt = datearray[2]+'/'+datearray[1]+'/'+datearray[0]+' à '+datearray[3]+"h"+datearray[4];
            const keyuser = comment.userId;
            if(!(keyuser in this.users)){
              axios.get('http://localhost:5000/api/auth/'+comment.userId)
              .then(userInfo => {
                this.users[keyuser] = userInfo.data
              })
            }
          });
      });
    })
    .catch(error => console.log(error));
  }
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
      .publications{
        background-color: #e2e2e2;
        .publication{
          position: relative;
          &::before {
            content: "";
            position: absolute;
            display: block;
            width: 80%;
            height: 1px;
            background: rgb(151, 151, 151);
            left: calc(10%);
            top: 1px;
          }
          &::after {
            content: "";
            position: absolute;
            display: block;
            width: 90%;
            height: 2px;
            background: rgb(151, 151, 151);
            left: calc(5%);
            bottom: 1px;
          }
          &:nth-child(even){
            background-color: #f3f3f3;
          }
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 30px 15px;
          .profile{
            width: 20%;
            display: flex;
            flex-wrap: wrap;
            i{
              font-size: 64px;
              margin: auto;
              width: 100%;
              margin-bottom: 20px;
            }
            .name{
              width: 100%;
              margin: 0;
              color: #862e34;
              font-family: "OpenSans-B";
            }
            .service{
              width: 100%;
              font-family: "OpenSans-SM";
              color: #2c3e50;
            }
            .date{
              font-family: "OpenSans-R";
              color: #2c3e50;
            }
          }
          .message{
            width: 75%;
            background-color: white;
            border-radius: 20px;
            padding: 20px;
            text-align: left;
            font-family: "Roboto-R";
            box-shadow: 0px 0px 5px #818181;
          }
          .comments{
            width: 100%;
            padding-top: 25px;
            h3 {
              color: #862e34;
              margin: 25px 0;
            }
            .comment{
              padding: 15px 0;
              display: flex;
              .profile{
                margin-left: 10%;
                width: 32%;
                flex-wrap: nowrap;
                i{
                  font-size: 50px;
                  color: #D15F66;
                  width: auto;
                  margin: 0 auto;
                }
              }
              &-container{
                max-width: 56%;
                padding-top: 25px;
                &-message{
                  padding: 10px;
                  background-color: white;
                  border-radius: 0px 25px 25px 25px;
                  box-shadow: 3px 5px 5px #818181;
                }
                &-date{
                  float: right;
                }
              }
            }
          }
          .form-comment{
            display: flex;
            label{
              font-family: "OpenSans-SM";
              float: right;
              margin: auto 0;
              padding: 0 15px;
              vertical-align: middle;
              max-width: 370px;
              min-width: 280px;
              width: 20%;
            }
            textarea{
              width: 60%;
              background-color: white;
              border-radius: 20px;
              padding: 20px;
              text-align: left;
            }
            button{
              display: flex;
              flex-wrap: wrap;
              width: 20%;
              border: none;
              background-color: rgba($color: #000000, $alpha: 0);
              color: #2c3e50;
              &:hover{
                color: #455c74;
              }
              i{
                display: inline-block;
                width: 100%;
                font-size: 46px;;
              }
              p{
                display: inline-block;
                width: 100%;
                margin: 0;
              }
            }
          }
        }
      }
    }
  }

</style>
