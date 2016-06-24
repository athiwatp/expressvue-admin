<template lang="jade">
	.content-header
		h1 {{title}}
			small
	.content
		.row
			.col-xs-12.col-sm-9
				.box.box-default
					.box-header
						.pull-right
							a(v-link="{path:'/admin/users/new'}")
								i.fa.fa-plus
						h3.box-title User Administration
					.box-body
						.row
							.col-xs-6
								input.form-control.input-sm(type="text" v-model="search")
					table.table.table-condensed.table-hover.table-responsive
						thead
							tr
								th
								th First Name
								th Last Name
								th Username
								th Email
								th Role
								th Enabled
								th
						tbody
							tr(v-for="user in users | filterBy search in 'fname' 'lname' 'username' 'email'")
								td
									img.profile-picture.img-circle.img-responsive(v-if="user.profile_picture" v-bind:src="'images/' + user.profile_picture" )
									img.profile-picture.img-circle.img-responsive(v-if="!user.profile_picture" v-bind:src="'images/profile_default.jpg'" )
								td: a(href="" v-link="{path:'/admin/users/view/' + user._id}") {{user.fname}}
								td {{user.lname}}
								td {{user.username}}
								td {{user.email}}
								td {{user.role}}
								td
									a(href="" v-on:click.prevent="toggleEnabled(user)" v-bind:class="{'text-success': user.enabled, 'text-danger': !user.enabled}")
										span.glyphicon(v-bind:class="{'glyphicon-ok': user.enabled, 'glyphicon-remove': !user.enabled}")
								td: a.text-danger(href="" v-on:click.prevent="delete(user)"): span.glyphicon.glyphicon-trash

</template>

<script>
import Vue from "vue"
import VueResource from "vue-resource"
	export default {
		data(){
			return {
				title:"Users",
				search:"",
				user:{
					fname:"",
					lname:"",
					username:"",
					email:"",
					password:"",
					role:"user",
					enabled:true,
				},
				users:[]
			}
		},
		ready(){
			this.get();
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
						this.user = {};
						this.get();
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
