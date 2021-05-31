<template>
  <div class="container">
    <div class="container-fluid">
      <NavBar />
      <div id="head-body">
        <h1>Votre Profil</h1>
      </div>
      <div id="profile">
        <div class="container-errors" v-if="success_info.length != 0">
          <div class="content-success">
            <div id="success-logo"><i class="fas fa-check"></i></div>
            <ul>
              <li v-for="success in success_info" :key="success.msg" class="align-middle text-center" v-html=success.msg>
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
        <div class="content-profile">
          <div>
            <aside class="icon"><div><i class="fas fa-user"></i></div></aside>
            <div class="content-profile-informations">
              <h2> Informations du compte: </h2>
              <ul>
                <li>
                  Prénom : {{ firstname }}
                </li>
                <li>
                  Nom :  {{ name }}
                </li>
                <li>
                  Du service :  {{ service }}
                </li>
              </ul>
            </div>
          </div>
          <p>Tu souhaites supprimer votre compte ? Cliques sur le button ci-dessous</p>
          <button @click="deleteUser()">Supprimer mon compte !</button>
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
  name: 'Profile',
  components: {
    NavBar,
    Footer
  },
  data() {
    return{
    errors: [],
    success_info: [],
    firstname: sessionStorage.getItem('user-firstname'),
    name: sessionStorage.getItem('user-name'),
    service: sessionStorage.getItem('user-status'),
    iduser: sessionStorage.getItem('user-id')
    }
  },
  methods: {
    deleteUser(){
      axios.post('http://localhost:5000/api/auth/delete'+this.iduser)
      .then(() => {
            this.success_info.push({msg: 'Votre compte a bien été supprimé !<br>Vous allez être déconnecté dans 5 secondes ...'})
      })
      .then(() => {
        sessionStorage.removeItem('user-token');
        sessionStorage.removeItem('user-id');
        sessionStorage.removeItem('user-status');
        sessionStorage.removeItem('user-name');
        sessionStorage.removeItem('user-firstname');
        setTimeout( () => this.$router.push({ path: '/' }), 5000);
      })
      .catch(error => this.errors.push({msg: error}));
    }
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
      #profile{
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
