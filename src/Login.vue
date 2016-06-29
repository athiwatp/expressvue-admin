
<template lang="jade">
.login-box
  .login-logo
    a(v-link="{path:'/'}")
      b Express-VueJS
      | Admin
  .login-box-body
    a.pull-right(v-link="{path:'/register'}") Sign Up
    p Sign in to start you session
    form(v-on:submit.prevent="login(user)")
      .form-group.has-feedback
        input.form-control(type="text" v-model="user.username" placeholder="Username")
        span.glyphicon.glyphicon-envelope.form-control-feedback
      .form-group.has-feedback
        input.form-control(type="password" v-model="user.password" placeholder="Password")
        span.glyphicon.glyphicon-lock.form-control-feedback
      .form-group(v-if="error_message")
        p.text-danger {{error_message}}
      .row
        .col-xs-8
        .col-xs-4
          button.btn.btn-primary.btn-block.btn-flat(type="submit") Login

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
