<template lang="jade">
aside.main-sidebar
  .sidebar
    // User panel
    .user-panel
      .pull-left.image
        img.img-circle.profile-picture(v-if="!UserService.user.profile_picture" v-bind:src="'images/profile_default.jpg'" alt="User Image")
        img.img-circle.profile-picture(v-if="UserService.user.profile_picture" v-bind:src="'images/' + UserService.user.profile_picture" alt="User Image")
      .pull-left.info
        p  {{UserService.user.fname}} {{UserService.user.lname}}
    // Search
    form.sidebar-form
      .input-group
        input(type="text" placeholder="Search").form-control
        span.input-group-btn
          button.btn.btn-flat
            i.fa.fa-search

    // Sidebar Menu
    ul.sidebar-menu
      li.header
        span(v-if="MessageService.messages.length != 0") {{MessageService.messages.length}}
        span(v-if="MessageService.messages.length == 0") No
        |   Message
        span(v-if="MessageService.messages.length > 1 || MessageService.messages.length == 0") s
        span.text-blue(v-if="unreadMessages != 0")       ,{{unreadMessages}} Unread
        span.pull-right
          a.text-green(v-link="{path: '/messages/new'}")
            i.fa.fa-plus
      li( v-for="message in MessageService.messages | orderBy 'created' -1" v-link-active)
        a(v-link="{path: '/messages/view/' + message._id, activeClass:'active'}")
          .pull-left
            img.img-circle.profile-picture-sm(v-if="!message.from.profile_picture" v-bind:src="'images/profile_default.jpg'" alt="User Image")
            img.img-circle.profile-picture-sm(v-if="message.from.profile_picture" v-bind:src="'images/' + message.from.profile_picture" alt="User Image")
          h5
            span(v-bind:class="{'text-blue': !message.read}") {{message.from.fname}} {{message.from.lname}}
            small.pull-right(v-bind:class="{'text-blue': !message.read}")
              i.fa.fa-clock-o   {{message.created | timeFromNow}}
          p(style="font-size:12px; margin-left:20px") {{message.content | truncate}}
.content-wrapper
  router-view
footer.main-footer
  .pull-right Express-VueJS
  strong No @ Copyright
</template>

<script>
import Vue from 'vue'
import io from "socket.io-client/socket.io.js"
import UserService from "../UserService.vue"
import MessageService from "../MessageService.vue"
var messageApi = Vue.resource("/messages{/_id}")
	export default {
    route:{
      data(){
      }
    },
		data(){
			return {
				UserService,
				title:"Messages",
        MessageService,
        socket:null
			}
		},
    computed:{
      unreadMessages(){
        return (_.filter(MessageService.messages, {read:false})).length
      }
    },
    ready(){
      // this.socket = io.connect("http://localhost:3000");
			// this.socket.on("messages", (data) => {
			// 	if(data && data.method == "insert"){
      //     if(data.new_data.to_id && data.new_data.to_id == UserService.user._id){
      //       this.messages.push(data.new_data);
      //     }
			// 	}
			// 	if(data && data.method == "update"){
      //     if(data.new_data.to_id && data.new_data.to_id == UserService.user._id){
      //       var i =_.findIndex(this.messages, function(t){ return t._id == data.new_data._id });
  		// 	 		this.messages.$set(i, data.new_data);
      //     }
      //
			// 	}
			// 	if(data && data.method == "delete"){
      //     if(data && data.method == "insert"){
      //       if(data.new_data.to_id && data.old_data.to_id == UserService.user._id){
      //         var i =_.findIndex(this.messages, function(t){
      //           return t._id == data.old_data._id
      //         });
    	// 		 		this.messages.splice(i,1);
      //       }
  		// 		}
      //
			// 	}
			// })
    }
	}
</script>
