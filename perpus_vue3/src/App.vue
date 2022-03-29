<template>
  <div>
    <router-view/>
  </div>
</template>
<script>
export default {
  methods: {
    CekToken: function(){
      if(localStorage.getItem('Authorization')){
          let token = {
              headers : { "Authorization" : "Bearer " + localStorage.getItem("Authorization")}
          }

          this.axios.get('/login_check', token)
          .then( response => {
              if(response.data.status === 1){
                this.$store.commit('setToken', localStorage.getItem("Authorization"))
                this.$store.commit('setUser', response.data.data)
              } else {
                this.$store.commit('logout')
                this.$router.push('/login')
              }
          })
          .catch(error => {
            this.$store.commit('logout')
            this.$router.push('/login')
          });
  
      } else {
        this.$store.commit('logout')
        this.$router.push('/login')
      }
    }
  },
  mounted() {
    this.CekToken()
  },
}
</script>
