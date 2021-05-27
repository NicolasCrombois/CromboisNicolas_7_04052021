<template>
  <aside class="profile">
    <i class="fas fa-user"></i>
    <div class="profile-information">
        <p>{{ usersGlobal }}</p>
      <!--<p class="name">{{ usersGlobal[userid].firstname }} {{usersGlobal[userid].name }}</p>
      <p v-if="usersGlobal[userid].status != null" class="service">Du service {{ usersGlobal[userid].status }}</p>
      <p class="date">Publié le {{ publication.publication_info.updatedAt }}</p>-->
    </div>
  </aside>
</template>

<script>
import axios from 'axios';

export default ({
    name: 'ProfilePublication',
    props: {
      userid : String
    },
    computed: {
      usersGlobal(){
          return this.$store.state.users
      }
    },
    mounted() {
      console.log(this.$props.userid)
      axios.get(process.env.VUE_APP_API_HOST+'auth/'+this.$props.userid)
      .then(userInfo => {
          if(!(this.$props.userid in this.$store.state.users)){
            this.$store.state.users[this.$props.userid] = userInfo.data
          }
      })
      console.log(this.$store.state.users)
    }
})
</script>



