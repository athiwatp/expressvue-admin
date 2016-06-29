<template lang="jade">
.login-box
  .login-logo
      | Change Password
  .login-box-body
    p
      | Change Password for
      b   {{user.username}}
    validator(name="uservalidation" v-bind:groups="['passwordGroup']")
      form(v-on:submit.prevent="save" novalidate)
        .form-group.has-feedback(v-bind:class="{'has-error': $uservalidation.passwordGroup.invalid && $uservalidation.passwordGroup.touched}")
          input.form-control(type="password" v-model="user.password" group="passwordGroup" v-validate:password="{ minlength: 8, required: true }" placeholder="New Passwrod")
          span.glyphicon.glyphicon-lock.form-control-feedback
        .form-group.has-feedback(v-bind:class="{'has-error': $uservalidation.passwordGroup.invalid && $uservalidation.passwordGroup.touched}")
          input.form-control(type="password" v-model="confirm" group="passwordGroup" v-validate:confirm="{ minlength: 8, required: true }" placeholder="Confirm")
          span.glyphicon.glyphicon-lock.form-control-feedback
        .form-group(v-if="$uservalidation.passwordGroup.invalid && $uservalidation.passwordGroup.touched")
          p.text-danger(v-if="$uservalidation.password.required") Password Required
          p.text-danger(v-if="$uservalidation.password.minlength") Password is too short
          p.text-danger(v-if="$uservalidation.confirm.required") Please confirm your password
        .row
          .col-xs-8
          .col-xs-4
            button.btn.btn-primary.btn-block.btn-flat(type="submit" v-if="!$uservalidation.passwordGroup.invalid && $uservalidation.passwordGroup.touched") Submit
</template>
<script>
export default {
  data(){
    return {
      title:"Change Password",
      user:{
        password:""
      },
      confirm:""
    }
  },
  computed:{
    matching(){
      return this.user.password == this.confirm;
    }
  },
  ready(){
    this.get();
  },
  methods:{
    get(){
      var userApi = this.$resource("/users{/_id}")
      this.$http.get("/users", {_id: this.$route.params._id}).then((res) =>{
        this.user = res.data;
      })
    },
    save(user){
      this.$http.put("/users",this.user).then((results) => {
        this.$router.go("/profile");
      })

    },
  }
}
</script>
