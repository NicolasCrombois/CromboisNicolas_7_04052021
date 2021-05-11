<template>
  <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
    <div id="navbarNav">
      <img alt="Groupomania logo" src="../assets/icon-left-font-monochrome-black.svg">
      <ul id="navbar-nav">
        <li class="nav-item"><router-link to="/register">S'enregistrer</router-link></li> |
        <li class="nav-item"><router-link to="/login">Se connecter</router-link></li>
      </ul>
    </div>
  </nav>
  <router-view class="view"></router-view>
</template>

<script>
export default {
    name : 'navBar'
}
</script>



<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{ margin : 0 }
.navbar {
  padding: .1rem 2.8rem;
  width: 100%;
  height: 60px;
  background-color: #F1E6D0;
  
  img{
    max-width: 30%;
    float: left;
    max-height: 35px;
  }
  #navbarNav{
    width: 100%;
    #navbar-nav{
      float: right;
      margin: 0;
      padding: 0;
      list-style-type: none;
      margin-top: 6px;
      li {
        display: inline-block;
      }
      a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
          color: #B97842;
        }
      }
    }
  }
}
</style>