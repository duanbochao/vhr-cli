<template>
    <div class="login">
        hello world
    </div>
</template>
<script>
export default {
   data() {
      return {
      }
   },
   created() {
     this.login();
   },
   methods:{
     login(){
        this.postRequest('/login',{
          username:'admin',
          password:'1233'
        }).then(resp=>{

        })
     }
   }
}
</script>
<style scoped>


</style>
