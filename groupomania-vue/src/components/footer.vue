<template>
  <footer class="navbar-light bg-faded">
    <div id="footer">
      <p id="copyright"> Copyright © 2021 - Groupomania, Tous droits réservés.</p>
      <p id="label-url">Nos pages</p>
      <ul class="url-list">
        <li class="url-list-item"><router-link to="/community">Chat communautaire <i class="fas fa-comments"></i></router-link></li>
        <li class="url-list-item"><router-link to="/profile">Mon profil <i class="fas fa-user"></i></router-link></li>
      </ul>
    </div>
  </footer>
</template>


<script>
export default {
    name : 'navBar',
}
</script>



<style lang="scss">


  @font-face {
    font-family: "Roboto-R";
    src: local("Roboto"),
    url("../fonts/Roboto/Roboto-Regular.ttf") format("truetype");
  } 
  @font-face {
    font-family: "OpenSans-R";
    src: local("OpenSans"),
    url("../fonts/OpenSans/OpenSans-Regular.ttf") format("truetype");
  }
  footer {
    padding: 1.4rem 2.8rem;
    width: 100%;
    background-color: #172B5D;
    #copyright{
      font-family: "Roboto-R";
      color: white;
      margin-bottom: 20px;
    }
    #label-url{
      font-family: "OpenSans-R";
      color: white;
      margin-bottom: 5px;
    }
    .url-list{
      padding: 0;
      margin-bottom: 0;
      &-item{
        font-family: "OpenSans-R";
        list-style-type: none;
        display: inline-block;
        margin: 0 15px;
        a {
          color: white;
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