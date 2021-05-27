<template>
  <div class="publications">
    <div v-for="(publication) in publicationsGlobal" v-bind:key="publication.key" class="publication" ><!--, index-->
      <p>{{ publication }} </p>
      <ProfilePublication userid=publication.userId />
      <!--
      <div class="message">
        <p v-html="publication.publication_info.content">
        </p>
      </div>
      <div class="comments"> 
        <h3><i class="fas fa-comments"></i> Les commentaires</h3>
        <div v-if="publication.publication_info.Comments != null">
          <div v-for="commentUnit in publication.publication_info.Comments" v-bind:key="commentUnit.id"  class="comment">
            <div class="profile">
              <div class="avatar"><i class="fas fa-user"></i></div>
              <div class="profile-information" v-if="users[commentUnit.userId]">
                <p class="name">{{ users[commentUnit.userId].firstname }} {{ users[commentUnit.userId].name }}</p>
                <p v-if="users[commentUnit.userId].status != null" class="service">Du service {{ users[commentUnit.userId].status }}</p>
              </div>
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
          <button @click="postComment(publication.publication_info.id, index)">Envoyer !<i class="fas fa-location-arrow"></i></button>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
//import axios from 'axios';
import ProfilePublication from '../views/ProfilePublication';

export default {
  name: 'PostRegisterUser',
  components: {
      ProfilePublication,
  },
  computed: {
    publicationsGlobal(){
        return this.$store.state.publications
    }
  },
  methods: {

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
          font-family: "OpenSans-R";
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
            width: 35%;
            flex-wrap: nowrap;
            flex-direction: row-reverse;
            margin-right: 15px;
            &-information{
              margin-right: 25px;
            }
            .avatar{
              max-width: 60px;
              i{
                font-size: 50px;
                color: #D15F66;
                width: auto;
                margin: 0 auto;
              }
            }
            .name{
              text-align: right;
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
</style>