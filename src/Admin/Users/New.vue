<template lang="jade">
.content-header
  h1 {{title}}
  small
.content
  .row
    .col-xs-6
      .box.box-default
        .box-header
          h3.box-title
        .box-body
          validator(name="uservalidation" v-bind:groups="['passwordGroup']")
            form(v-on:submit.prevent="save(user)" novalidate)
              .form-group
                label First Name
                input.form-control(type="text" id="fname" placeholder="First Name" v-model="user.fname")
              .form-group
                label Last Name
                input.form-control(type="text" id="fname" placeholder="Last Name" v-model="user.lname")

              // Username
              .form-group(v-bind:class="{'has-error': $uservalidation.username.invalid && $uservalidation.username.touched}")
                label Username
                input.form-control(type="text" id="fname" placeholder="Username" v-validate:username="['required']" v-model="user.username")
                span.text-danger(v-if="$uservalidation.username.invalid && $uservalidation.username.touched") Username Required

              // Email
              .form-group(v-bind:class="{'has-error': $uservalidation.email.invalid && $uservalidation.email.touched}")
                label Email
                input.form-control(type="text" id="fname" placeholder="Email" v-validate:email="['required']" v-model="user.email")
                span.text-danger(v-if="$uservalidation.email.invalid && $uservalidation.email.touched") Email Required
                
              // Role
              .form-group
                label Role
                input.form-control(type="text" id="fname" placeholder="First Name" v-model="user.role")

              // Password
              .form-group(v-bind:class="{'has-error': $uservalidation.passwordGroup.invalid && $uservalidation.passwordGroup.touched}")
                label Password
                input.form-control(type="password" group="passwordGroup" v-validate:password="{ minlength: 8, required: true }" id="fname" placeholder="First Name" v-model="user.password")
                // Validation Error
                span.text-danger(v-if="$uservalidation.passwordGroup.invalid && $uservalidation.passwordGroup.touched") Invalid password

              // Confirm Password
              .form-group(v-bind:class="{'has-error': $uservalidation.passwordGroup.invalid && $uservalidation.passwordGroup.touched}")
                label Confirm
                input.form-control(type="password" group="passwordGroup" v-validate:password="{ minlength: 8, required: true }" id="fname" placeholder="First Name" v-model="confirm")

              a.btn.btn-flat.btn-default.margin(v-link="{path :'/admin/users'}")
                i.fa.fa-times
                span  Cancel
              button.btn.btn-flat.btn-primary.margin(type="submit" v-if="$uservalidation.valid")
                i.fa.fa-floppy-o
                span  Submit
</template>

<script>
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
					password:"",
					role:"user",
					enabled:true,
				},
				confirm:""

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
						this.$router.go("/admin/users");
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
