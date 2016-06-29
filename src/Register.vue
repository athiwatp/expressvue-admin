
<template lang="jade">
.login-box
  .login-logo
    a(v-link="{path:'/'}")
      b Express-VueJS
      | Admin
  .login-box-body
    p Register a new membership
    validator(name="uservalidation" v-bind:groups="['passwordGroup']")
      form(v-on:submit.prevent="register")
        .form-group.has-feedback
          input.form-control(type="text" v-model="user.fname" placeholder="First Name")
          span.glyphicon.glyphicon-user.form-control-feedback
        .form-group.has-feedback
          input.form-control(type="text" v-model="user.lname" placeholder="Last Name")
          span.glyphicon.glyphicon-user.form-control-feedback
        .form-group.has-feedback
          input.form-control(type="text" v-model="user.username" placeholder="Username")
          span.glyphicon.glyphicon-user.form-control-feedback
        .form-group.has-feedback
          input.form-control(type="text" v-model="user.email" placeholder="Email")
          span.glyphicon.glyphicon-envelope.form-control-feedback
        .form-group.has-feedback(v-bind:class="{'has-error': $uservalidation.passwordGroup.invalid && $uservalidation.passwordGroup.touched}")
          input.form-control(type="password" v-model="user.password" group="passwordGroup" v-validate:password="{ minlength: 8, required: true }" placeholder="New Password")
          span.glyphicon.glyphicon-lock.form-control-feedback
        .form-group.has-feedback(v-bind:class="{'has-error': $uservalidation.passwordGroup.invalid && $uservalidation.passwordGroup.touched}")
          input.form-control(type="password" v-model="confirm" group="passwordGroup" v-validate:confirm="{ minlength: 8, required: true }" placeholder="Confirm Password")
          span.glyphicon.glyphicon-lock.form-control-feedback
        .form-group(v-if="$uservalidation.passwordGroup.invalid && $uservalidation.passwordGroup.touched")
          p.text-danger(v-if="$uservalidation.password.required") Password Required
          p.text-danger(v-if="$uservalidation.password.minlength") Password is too short
          p.text-danger(v-if="$uservalidation.confirm.required") Please confirm your password
        .form-group(v-if="error_message")
          p.text-danger {{error_message}}
        .row
          .col-xs-8
            a.btn.btn-default.btn-block.btn-flat(v-link="{path:'/'}") Cancel
          .col-xs-4
            button.btn.btn-primary.btn-block.btn-flat(type="submit") Register

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
      title:"Register",
      error_message:null,
      user:{
        fname:"",
        lname:"",
        username:"",
        email:"",
        password:""
      },
      as:{}
    }
  },
  computed:{
    matching(){
      return this.user.password == this.confirm;
    }
  },
  methods:{
    register(){
      this.$http.post("/auth/register", this.user).then(response =>{
        if(response.status == 200){
          this.$router.go("/");
        }
      })
    },
    validate(){
      this.as.validate();
    }
  }
}

</script>
