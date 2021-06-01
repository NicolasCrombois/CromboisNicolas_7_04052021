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
        <div v-if="publications.length > 0">
          <div v-for="(publication, index) in publications" v-bind:key="publication.key" class="publication" >
            <div class="buttonDelete" @click="deletePub(publication.id)" v-if="userStatus=='RH'"><i class="fas fa-trash-alt"></i></div>
            <aside class="profile">
              <i class="fas fa-user"></i>
              <div class="profile-information" v-if="users[publication.info.userId]">
                <p class="name">{{ users[publication.info.userId].firstname }} {{ users[publication.info.userId].name }}</p>
                <p v-if=" users[publication.info.userId].status != null" class="service">Du service {{ users[publication.info.userId].status }}</p>
                <p v-else class="service">Service non renseigné </p>
                <p class="date">Publié le {{ publication.info.updatedAt }}</p>
              </div>
            </aside>
            <div class="message">
              <p v-html="publication.info.content">
              </p>
            </div>
            <div class="comments"> 
              <h3><i class="fas fa-comments"></i> Les commentaires</h3>
              <div v-if="publication.info.Comments != null">
                <div v-for="commentUnit in publication.info.Comments" v-bind:key="commentUnit.id"  class="comment">
                  <div class="buttonDelete" @click="deleteComment(commentUnit.id)" v-if="userStatus=='RH'"><i class="fas fa-trash-alt"></i></div>
                  <div class="profile">
                    <div class="profile-information" v-if="users[commentUnit.userId] != null">
                      <p v-if="users[commentUnit.userId].name != null && users[commentUnit.userId].firstname != null" class="name">{{ users[commentUnit.userId].firstname }} {{ users[commentUnit.userId].name }}</p>
                      <p v-else class="name">Utilisateur supprimé</p>
                      <p v-if="users[commentUnit.userId].status != null" class="service">Du service {{ users[commentUnit.userId].status }}</p>
                      <p v-else class="service">Service non renseigné </p>
                    </div>
                    <div class="profile-information" v-else>
                      <p class="name">Utilisateur supprimé</p>
                    </div>
                    <i class="fas fa-user"></i>
                  </div>
                  <div class="comment-container">
                    <p class="comment-container-message" v-html="commentUnit.content">
                    </p>
                    <p class="comment-container-date">{{ commentUnit.updatedAt }}</p>
                  </div>
                </div>
              </div>
              <div class="form-comment">
                <label>Ajouter votre commentaires:</label>
                <textarea v-model="comment[index]" name="comment"></textarea>
                <button @click="postComment(publication.id, index)"><i class="fas fa-location-arrow"></i></button>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p id="no-publication">
            Il n'y a pas de publication pour le moment ... 
            <br>Sois le premier a poster ! 
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from '../components/nav-bar';
import Footer from '../components/footer';
import axios from 'axios';

export default {
  name: 'Community',
  components: {
    NavBar,
    Footer
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
    userStatus: sessionStorage.getItem('user-status')
    }
  },
  methods: {
    async loadPublications(){
      this.publications = [];
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('user-token');
      await axios.get('http://localhost:5000/api/publication/')
      .then(res => {
        (res.data).forEach(publication => {

          var reg = new RegExp("((http://)[a-zA-Z0-9/.]+)+","gi");
          var replacedText = (publication.content).replace(reg, "<A href='$1' target=_blank>$1</A>");
          replacedText = replacedText.replace(/(?:\r\n|\r|\n)/g, '<br>');
          publication.content = replacedText;

          const date = new Date(Date.parse(publication.updatedAt))
          publication.updatedAt = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth()+1)).slice(-2)+'/'+date.getFullYear()+' à '+ date.getHours()+'h'+('0' + date.getMinutes()).slice(-2) ;

          publication.Comments.forEach(comment => {
            
            const dateComment = new Date(Date.parse(comment.updatedAt))
            comment.updatedAt = ('0' + dateComment.getDate()).slice(-2) + '/' + ('0' + (dateComment.getMonth()+1)).slice(-2)+'/'+dateComment.getFullYear()+' à '+ dateComment.getHours()+'h'+('0' + dateComment.getMinutes()).slice(-2) ;

            var reg = new RegExp("((http://)[a-zA-Z0-9/.]+)+","gi");
            var replacedText = (comment.content).replace(reg, "<A href='$1' target=_blank>$1</A>");
            replacedText = replacedText.replace(/(?:\r\n|\r|\n)/g, '<br>');
            comment.content = replacedText;

          });
          this.publications.push({ id : publication.id, info: {Comments: publication.Comments, content: publication.content, updatedAt: publication.updatedAt, userId: publication.userId}});
        });
      })
      .catch(error => console.log(error));
    },
    async loadUsers(){
      this.users = [];
      for (let index = 0; index < (this.publications).length; index++) {
       if(!(this.publications[index].info.userId in this.users)){
          await axios.get('http://localhost:5000/api/auth/'+this.publications[index].info.userId)
          .then(userInfo => {
            this.users[this.publications[index].info.userId] = {name: userInfo.data.name, firstname: userInfo.data.firstname, status: userInfo.data.status};
          })
          .catch(error => console.log(error));
        }
        (this.publications[index].info.Comments).forEach(comment => {
          if(!(comment.userId in this.users)){
            axios.get('http://localhost:5000/api/auth/'+comment.userId)
            .then(userInfo => {
              this.users[comment.userId] = {name: userInfo.data.name, firstname: userInfo.data.firstname, status: userInfo.data.status};
            })
            .catch(error => console.log(error));
          }
        });
      }
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
          this.$router.go(0);
        })
        .catch((error) => {
          this.errors.push({msg: error})
        })
      }
    },
    postComment(publicationId, index){
      if(this.errors.length == 0){
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('user-token');
        axios.post('http://localhost:5000/api/comment/publish', {publicationId: publicationId, content: this.comment[index], userId: sessionStorage.getItem('user-id')})
        .then (() =>{
          this.$router.go(0);
        })
        .catch((error) => {
          this.errors.push({msg: error})
        })
      }
    },
    refresh(){
      this.message = '';
      this.errors = [];
      this.success_info = [];
      this.comment = [];
      this.loadPublications()
      .then(() => {
        this.loadUsers()
      })
    },
    deletePub(publicationId){
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('user-token');
      axios.delete('http://localhost:5000/api/publication/' + publicationId)
      .then (() =>{
        this.$router.go(0);
      })
      .catch((error) => {
        this.errors.push({msg: error})
      })

    },
    deleteComment: function(commentId){
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('user-token');
      axios.delete('http://localhost:5000/api/comment/delete' + commentId)
      .then (() =>{
        this.$router.go(0);
      })
      .catch((error) => {
        this.errors.push({msg: error})
      })

    }
  },
  mounted() {
    this.refresh()
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
        #no-publication{
          margin: 0;
          padding: 50px;
          font-family: "OpenSans-SM";
          font-size: 18px;
          font-style: oblique;
        }
        .publication{
          position: relative;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 55px 15px;
          .buttonDelete{
            position: absolute;
            font-size: 20px;
            color: red;
            top: 15px;
            right: 15px;
          }
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
          &:last-child::after {
            display: none;
          }
          &:nth-child(even){
            background-color: #f3f3f3;
          }
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
            overflow-wrap: break-word;
            word-wrap: break-word;
            hyphens: auto;
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
              position: relative;
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
                  overflow-wrap: break-word;
                  word-wrap: break-word;
                  hyphens: auto;
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
                font-size: 46px;
                margin: auto;
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

@media screen and (max-width: 768px) {
  .container{
    max-width: 100%;
    padding: 0;
    .container-fluid{
      .publications{
        .publication{
          .profile{
            width: 30%;
          }
          .message{
            width: 67%;
          }
          .comments{
            .comment{
              flex-wrap: wrap;
              .profile{
                width: 100%;
                display: flex;
                flex-direction: row-reverse;
                &-information{
                  float: right;
                  width: 80%;
                  .name{
                    text-align: left;
                  }
                  .service{
                    text-align: left;
                  }
                }
                i{
                  float: left;
                }
              }
              &-container{
                padding-top: 5px;
                width: 80%;
                margin-left: 20%;
                max-width: 100%;
              }
            }
          }
          .form-comment{
            flex-wrap: wrap;
            width: 80%;
            margin: auto;
            textarea{
              width: 80%;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 425px) {
  .container .container-fluid .publications .publication{
    .profile{
      width: 100%;
      i{
        width: 18%;
        margin: 0 11px 0 0;
      }
      &-information{
        width: 78%;
        .name{
          text-align: left;
        }
        .service{
          text-align: left;
        }
        .date{
          text-align: right;
        }
      }
    }
    .message{
      width: 100%;
      margin-top: 15px;
    }
    .comments{
      .comment{
        flex-wrap: wrap;
        .profile{
          width: 100%;
          display: flex;
          flex-direction: row-reverse;
          &-information{
            float: right;
            width: 80%;
          }
          i{
            float: left;
          }
        }
        &-container{
          padding-top: 5px;
          width: 85%;
          margin-left: 15%;
          max-width: 100%;
        }
      }
    }
    .form-comment{
      label{
        margin: 0;
        padding: 0;
        margin-bottom: 10px;
        min-width: 150px;
        width: 100%;
      }
      textarea{
        width: 80%;
      }
    }
  }
}
</style>
