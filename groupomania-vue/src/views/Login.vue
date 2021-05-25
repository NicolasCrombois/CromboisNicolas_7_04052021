<template>
  <div class="form-container">
    <div class="container-errors" v-if="errors.length != 0">
      <div class="content-errors">
        <div id="error-logo"><i class="fas fa-exclamation-circle"></i></div>
        <p>Oups ... il semble y avoir quelques problèmes :</p>
        <ul>
          <li v-for="error in errors" :key="error.msg" >
            {{ error.msg }}
          </li>
        </ul>
      </div>
    </div>
    <div class="form">
      <div id="logo"><img alt="Groupomania logo" src="../assets/icon.svg"></div>
      <h1>De retour ?</h1>
      <p>Connectes-toi afin d'être au courant des <br/>nouvelles publications de tes collègues !</p>
      <div id="form">
        <table>
          <tr>
            <td><div class="icon"><i class="far fa-envelope"></i></div></td>
            <td class="inputTable"><input id="email" v-model="email" type="email" placeholder="Adresse mail"/></td>
          </tr>
          <tr>
            <td><div class="icon"><i class="fas fa-lock"></i></div></td>
            <td class="inputTable"><input id="password"  v-model="password" type="password" placeholder="Mot de passe"/></td>
          </tr>
        </table>
      </div>
      <button @click="login()">Me connecter</button>
      <p id="registerLink">Tu fais parti de Groupomania et tu n'es toujours pas inscrit ?<br/><router-link to="/register">Inscris toi dès maintenant !</router-link></p>
      <router-view/>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

 export default {
  data() {
    return{
      user:{
        email: null,
        password: null
      },
      errors: [],
    }
  },
  methods: {
    login: function () {
      this.errors = [];
      axios.post('http://localhost:5000/api/auth/login', 
      {
        email: this.email,
        password: this.password
      })
      .then((res) => {
        const token = res.data.token;
        sessionStorage.setItem('user-token', token);
        sessionStorage.setItem('user-id', res.data.userId);
        this.$router.push('/');
      })
      .catch((error) => {
        if(error.response.status == 401){
          this.errors.push({ msg : "Le compte choisi n'existe pas !"})
        }
        if(error.response.status == 405){
          this.errors.push({ msg : "Le mot de passe n'est pas correct !"})
        }
      })
    }
  }
}
</script>


<style scoped lang="scss">
  .form-container{
    position: relative;
    height: 800px;
    max-height: 98vh;
    margin: auto;
    .container-errors{
      width: 100%;
      z-index: 1;
      position: absolute;
      top: 4vh;
      display: flex;
      .content-success{
        background-color: #30ac0a;
        border-radius: 5px;
        color: white;
        width: 70vw;
        max-width: 750px;
        margin: auto;
        padding: 10px;
        #success-logo{
          float: left;
          margin-left: 10px;
          position: absolute;
          top: 50%;
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
          i{
            margin: auto;
            font-size: 48px;
          }
        }
      }
      .content-errors{
        background-color: #f9461c;
        border-radius: 5px;
        color: white;
        width: 70vw;
        max-width: 620px;
        margin: auto;
        padding: 10px;
        #error-logo{
          float: left;
          margin-left: 10px;
          position: absolute;
          top: 50%;
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
          i{
            margin: auto;
            font-size: 48px;
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
          li{
            margin-bottom: 4px;
            list-style-type: none;
            text-align: left;
            padding-left: 5%;
            font-family: "OpenSans-R";
          }
        }
      }
    }
  }
  .form{
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    border : 2px solid #414141;
    border-radius: 25px;
    box-shadow: 0px 0px 10px black;
    position:absolute;
    top: 0; 
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 40vw;
    max-width: 650px;
    height: 760px;
    max-height: 95vh;
    #logo{
      background-color: #F6E7D9;
      height: 150px;
      width: 100%;
      border-radius: 25px 25px 0px 0px; 
      border-bottom: 1px solid #6A5949;
      img {
        max-height: 150px;
        border-bottom: 1px solid #6A5949;
      }
    }
    div#form{
      width: 100%;
      table {
        width: 60%;
        margin: auto;
        border-collapse: separate;
        border-spacing: 0 15px;
        tr{
          height: 40px;
          td{
            width: 20%;
            input{
              border-radius: 0px 25px 25px 0px;
              width: 100%;
              height: 40px;
            }
            div.icon{
              float: right;
              width:  100%;
              height: 10%;
              i{
                top: calc(50% - 15px);
                width: 100%;
                padding-top: 12px;
                padding-left: 3px;
                height: 40px;
                background-color: #C4B3A4;
                border-radius: 25px 0px 0px 25px;
              }
            }
          }
          .inputTable{
            width: 80%;
          }
        }
      }
    }
    label {
      float: right;
    }
    input {
      float: left;
      margin-left: -3px;
      padding: 3px 10px;
      border-radius: 25px;
      height: 30px;
      max-height: 280px;
    }
    button{
      background-color: #743B0B;
      color: white;
      font-size: 16px;
      padding: 1px 45px;
      margin: 0 auto;
      border-radius: 25px;
      bottom: 230px;
      left: calc(50% - 85px);
      height: 28px;
    }h1 {
      margin: 25px 0 0;
      font-size: 2.1rem;
      padding: 10px;
      text-align: center;
      width: 100%;
    }p {
      margin: auto;
      margin-top: 15px;
      font-size: 0.9rem;
      padding: 10px;
    }
    #registerLink{
      width: 100%;
    }
    a {
      margin-left: 10px;
    }
  }
@media screen and (max-width: 768px) {
  .form-container{
    background-color: #dfdfdf;
    max-height: 100vh;
    .form{
      background-color: white;
      margin-top : 0;
      height: 100vh;
      max-height: 100vh;
      border-radius: 0;
      box-shadow: 0px 0px 20px #454545;
      border: 0px;
      width: 80vw;
      #logo{
        border-radius: 0;
      }
    }
  }
}
@media screen and (max-width: 425px) {
  .form-container{
    .form{
      width: 100vw;
      div#form table{
        width: 80%;
      }
    }
  }
}
</style>
