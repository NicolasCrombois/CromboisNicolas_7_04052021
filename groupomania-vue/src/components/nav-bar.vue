<template>
  <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
    <div id="navbarNav">
      <img alt="Groupomania logo" src="../assets/icon-left-font-monochrome-white.svg">
      <ul id="navbar-nav">
        <li class="nav-item"><router-link to="/community">Chat communautaire <i class="fas fa-comments"></i></router-link></li> 
        <li class="nav-item"><router-link to="/profile">Mon profil <i class="fas fa-user"></i></router-link></li>
        <li class="nav-item" id="logout" @click="logout">Me déconnecter <i class="fas fa-sign-out-alt"></i></li>
      </ul>
    </div>
  </nav>
</template>


<script>
export default {
    name : 'navBar',
    methods: {
      logout: function(){
        sessionStorage.removeItem('user-token');
        sessionStorage.removeItem('user-id');
        sessionStorage.removeItem('user-status');
        sessionStorage.removeItem('user-name');
        sessionStorage.removeItem('user-firstname');
        this.$router.push('/');
      }
    }
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
  background-color: #172B5D;
  box-shadow: 2px 0px 8px rgba(255, 241, 241, 0.432), -2px 0px 8px rgba(255, 241, 241, 0.432);
  
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
      .nav-item {
        margin: 0 6px;
        display: inline-block;
      }
      #logout{
        margin-left: 35px;
        cursor: pointer;
        color: white;
      }
      a {
        font-weight: bold;
        color: white;

        &.router-link-exact-active {
          color: #d1515a;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .navbar{
    height: 90px;
    #navbarNav{
      #navbar-nav{
        float: none;
      }
      img{
        float: none;
        margin-bottom: 5px;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .navbar{
    height: 110px;
    padding: .1rem 1.1rem;
    img{
      max-width: 66%;
    }
  }
}
</style>