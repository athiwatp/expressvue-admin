<template lang="jade">
.content-header
  h1 Edit
    small {{user.fname}} {{user.lname}}
.content
  .row
    .col-xs-6
      .box.box-default
        .box-header
          h3.box-title
        .box-body
          form(v-on:submit.prevent="save(user)")
            .form-group
              label First Name
              input.form-control(type="text" id="fname" placeholder="First Name" v-model="user.fname")
            .form-group
              label Last Name
              input.form-control(type="text" id="fname" placeholder="Last Name" v-model="user.lname")
            .form-group
              label Username
              input.form-control(type="text" id="fname" placeholder="Username" v-model="user.username")
            .form-group
              label Email
              input.form-control(type="text" id="fname" placeholder="Email" v-model="user.email")
            .form-group
              select.form-control(type="text" id="fname" placeholder="Role" v-model="user.role")
                option(value="user") user
                option(value="admin") admin
            a.btn.btn-flat.btn-default.margin(v-link="{path :'/profile'}")
              i.fa.fa-times
              span  Cancel
            button.btn.btn-flat.btn-primary.margin(type="submit")
              i.fa.fa-floppy-o
              span  Submit
</template>

<script>
import UserService from "../UserService.vue"
import Vue from "vue"
import VueResource from "vue-resource"
	export default {
		data(){
			return {
				title:"New User",
				search:"",
				user:{
					fname:"",
					lname:"",
					username:"",
					email:"",
					role:"user",
					enabled:true,
				},
				confirm:""

			}
		},
		ready(){
			var userApi = this.$resource("/users{/_id}")
      userApi.get({_id:this.$route.params._id}).then((res) =>{
        this.user = res.data;
      })
		},
		methods:{
			get(){
				this.$http.get("/users").then((results) => {
					this.users = results.data
				});
			},
			save(user){
				if(user._id){
					this.$http.put("/users", user).then((results) => {
            UserService.getCurrentUser();
						this.$router.go("/profile");
					})
				}else{
					this.$http.post("/users", user).then((results) => {
						this.user = {};
						this.get();
					})
				}
			},
			delete(user){
				this.$http.delete("/users", user).then((results) => {
					this.get();
				})
			},
			select(user){
				this.user = Vue.util.extend({}, user);
			},
			toggleEnabled(user){
				user.enabled = !user.enabled;
				this.save(user);
			}
		}
	}
</script>
