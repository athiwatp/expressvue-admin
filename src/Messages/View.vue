<template lang="jade">
.content-header

  p.pull-right(style="font-size:12px; color:#888888")
    i.fa.fa-clock-o   {{message.created | timeFromNow}}
  p.pull-right(style="margin-right:15px;" v-on:click.prevent="deleteMessage")
    a.text-danger(href="")
      i.fa.fa-trash-o
      span   Delete
  .pull-left.image
    img.img-circle.profile-picture(v-if="!message.from.profile_picture" v-bind:src="'images/profile_default.jpg'" alt="User Image")
    img.img-circle.profile-picture(v-if="message.from.profile_picture" v-bind:src="'images/' + message.from.profile_picture" alt="User Image")
  h4
    | {{message.from.fname}} {{message.from.lname}}
    small  {{message.from.email}}
.content
  .box
    .box-header
      i.fa.fa-clock-o
        |   {{message.created | timeFull}}
    .box-body
      p {{message.content}}
    .box-footer
  .box
    .box-header
      h4 Reply
    .box-body
      textarea.form-control(rows="10" v-model="replyMessage.content")
    .box-footer
      button.btn.btn-default(v-on:click.prevent="replyToMessage")
        i.fa.fa-paper-plane
        span  Send
</template>

<script>
import Vue from 'vue'
var messageApi = Vue.resource("/messages{/_id}")
import UserService from "../UserService.vue"
	export default {
    route:{
      data(){
        messageApi.get({_id: this.$route.params._id}).then(response => {
          this.message = response.data;
        })
        this.message.read = true;
        //messageApi.save({_id:this.message._id}, this.message).then();
      }
    },
		data(){
			return {
				UserService,
				title:"Message Header",
        message:{},
        replyMessage:{}
			}
		},
    ready(){
      // messageApi.get({_id: this.$route.params._id}).then(response => {
      //   this.message = response.data;
      // })
    },
    methods:{
      replyToMessage(){
        this.replyMessage.to_id = this.message.from._id;
        this.replyMessage.from = UserService.user;
        this.replyMessage.from_id = UserService.user._id;
        messageApi.save(this.replyMessage).then(response => {
          this.$router.go("/messages");
        });
      },
      deleteMessage(){
        messageApi.delete({_id:this.message._id}, this.message).then(response => {
          this.$router.go("/messages")
        })
      }
    }
	}
</script>
