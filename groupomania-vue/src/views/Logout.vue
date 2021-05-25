<template>
    <h1> Vous êtes en cours de déconnection ...</h1>
</template>

<script>
 export default {
    methods: {
        function () {
            sessionStorage.removeItem('user-token');
            sessionStorage.removeItem('user-id');
            this.$router.push('/');
        }
    }
 }
</script>