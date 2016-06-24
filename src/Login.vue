
<template lang="jade">
.container
  .row
    .col-xs-12.col-xs-offset-0.col-sm-6.col-sm-offset-3
      form(v-on:submit.prevent="login(user)")
        legend.center-block Login
        .form-group
          label Username
          input.form-control(type="text" v-model="user.username")
        .form-group
          label Password
          input.form-control(type="password" v-model="user.password")
        .form-group(v-if="error_message")
          p.text-danger {{error_message}}
        .form-group
          button.btn.btn-primary(type="submit") Login

</template>

<script>
import AuthService from "./AuthService.vue"
import UserService from "./UserService.vue"
export default{
  ready(){
    this.as = new AuthService();
  },
  data(){
    return {
      UserService:UserService,
      title:"Login",
      error_message:null,
      user:{
        username:"",
        password:""
      },
      as:{}
    }
  },
  methods:{
    login(user){
      this.as.login(user, (results) => {
        if(!results.status){
          this.error_message = results.message
        }
      });
    },
    validate(){
      this.as.validate();
    }
  }
}

</script>
