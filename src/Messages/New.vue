<template lang="jade">
.content-header
  .pull-left.image
    img.img-circle.profile-picture(v-if="!UserService.user.profile_picture" v-bind:src="'images/profile_default.jpg'" alt="User Image")
    img.img-circle.profile-picture(v-if="UserService.user.profile_picture" v-bind:src="'images/' + UserService.user.profile_picture" alt="User Image")
  h4
    | {{UserService.user.fname}} {{UserService.user.lname}}
    small  {{UserService.user.email}}
  br
.content
  .box
    .box-header
      form.form-horizontal
        .form-group
          label.col-xs-1.control-label To:
          .col-xs-11
            select.form-control(v-model="message.to")
              option(v-for="user in users" v-bind:value="user") {{user.fname}} {{user.lname}}
    .box-body
      textarea.form-control(rows="10" v-model="message.content")
    .box-footer
      button.btn.btn-default(v-on:click.prevent="sendMessage")
        i.fa.fa-paper-plane
        span  Send
</template>

<script>
import Vue from 'vue'
import UserService from "../UserService.vue"
var messageApi = Vue.resource("/messages{/_id}")
var userApi = Vue.resource("/users{/_id}")
export default {

  data(){
    return {
      title:"New Message",
      UserService:UserService,
      selectedUser:{},
      users:[],
      message:{
        content:"",
        read:false,
        replied:false

      }
    }
  },
  ready(){
    userApi.get().then(response => {
      this.users = response.data;
    })
  },
  methods:{
    sendMessage(){
      this.message.to_id = this.message.to._id;
      this.message.from = UserService.user;
      this.message.from_id = UserService.user._id;
      messageApi.save(this.message).then(response => {
        this.$router.go("/messages");
      })
    }
  }
}

</script>
