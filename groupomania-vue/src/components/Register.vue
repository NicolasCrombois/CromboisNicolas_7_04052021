<template>
  <div class="form-container">
    <div class="form">
      <h1>Je m'enregistrer dès maintenant !</h1>
      <p>Afin d'accèder au réseau social de l'entreprise vous devez dans un premier temps vous inscrire !</p>
      <table>
        <tr>
          <td><label for="email">Votre adresse mail : </label></td>
          <td><input id="email" type="email" placeholder="mon.adresse@mail.fr"/></td>
        </tr>
        <tr>
          <td><label for="password">Votre mot de passe : </label></td>
          <td><input id="password" type="password"/></td>
        </tr>
      </table>
      <button @:click="register">S'inscrire</button>
    </div>
  </div>
</template>

<script>
var Vue = require('vue');
window.Vue = Vue;
new Vue({
  el : '.form',
  methods: {
    register: function () {
        const https = require('https')

        const data = JSON.stringify({
          email: document.getElementById("email").value(),
          password: document.getElementById("password").value()
        })
        const options = {
          hostname: 'http://localhost',
          port: 3000,
          path: '/api/auth/signup',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
          }
        }
        const req = https.request(options, res => {
          console.log(`statusCode: ${res.statusCode}`)

          res.on('data', d => {
            process.stdout.write(d)
          })
        })

        req.on('error', error => {
          console.error(error)
        })

        req.write(data)
        req.end()
      }
  }
})
 export default {

  }
</script>


<style scoped lang="scss">
  .form-container{
    position: relative;
    width: 90vw;
    height: 90vh;
    margin: auto;
  }
  .form{
    position:absolute;
    top: 0; 
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 50vw;
    height: 50vh;
    table {
      margin: auto;
      border-spacing: 0 15px;
      width: 65%;
    }
    label {
      float: right;
    }
    input {
      float: left;
      margin-left: 5px;
      padding: 3px 10px;
      border-radius: 25px;
      height: 30px;
      min-width: 180px;
      max-height: 280px;
      width: 40%;
    }
    button{
      margin-top: 25px;
      background-color: #743B0B;
      color: white;
      font-size: 16px;
      padding: 8px 45px;
      border-radius: 25px;
    }h1 {
      margin: 60px 0 0;
    }p {
      margin: 18px
    }
  }

</style>
