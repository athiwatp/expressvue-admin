<template lang="jade">
.content-header
  h1
    | {{user.fname}} {{user.lname}}
  a(v-link="{path:'/admin/users'}")
    i.fa.fa-arrow-left.margin
    span Users
  a.text-warning(v-link="{path:'/admin/users/edit/' + user._id}")
    i.fa.fa-edit.margin
    span Edit
  a.text-danger(href="" v-on:click.prevent="delete(user)")
    i.fa.fa-trash.margin
    span  Delete
.content
  .row
    .col-xs-12
      img.profile-picture-lg.img-circle.img-responsive(v-if="user.profile_picture" v-bind:src="'images/' + user.profile_picture")
      img.profile-picture-lg.img-circle.img-responsive(v-if="!user.profile_picture" v-bind:src="'images/profile_default.jpg'")
      table.table-hover.table-responsive.table-condensed
        tbody
          tr
            td: strong First Name:
            td {{user.fname}}
          tr
            td: strong Last Name:
            td {{user.lname}}
          tr
            td: strong Email:
            td {{user.email}}
          tr
            td: strong Role:
            td {{user.role}}
          tr
            td: strong Enabled:
            td
              a(href="" v-on:click.prevent="toggleEnabled(user)" v-bind:class="{'text-success': user.enabled, 'text-danger': !user.enabled}")
                span.glyphicon(v-bind:class="{'glyphicon-ok': user.enabled, 'glyphicon-remove': !user.enabled}")
          tr
            td: strong Created At:
            td {{ user.created | timeFull}}
          tr
            td: strong Updated At:
            td {{user.updated | timeFull}}
  .row
    .col-xs-12
      form(v-on:submit.prevent="upload()" enctype="multipart/form-data")
        legend Upload Profile Picture
        .form-group
          input#payload(type="file" v-el:imgupload name="img" accept="image/*")
        .form-group
          button.btn.btn-primary(type="submit")
            span.glyphicon.glyphicon-upload
            |     Upload
</template>

<script>
import Vue from "vue"
import VueResource from "vue-resource"
	export default {
		data(){
			return {
				title:"User",
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
			var userApi = this.$resource("/users{/_id}")
      userApi.get({_id:this.$route.params._id}).then((res) =>{
        this.user = res.data;
      })
		},
		methods:{
			get(){
        var userApi = this.$resource("/users{/_id}")
        userApi.get({_id:this.$route.params._id}).then((res) =>{
          this.user = res.data;
        })
			},
			save(user){
				if(user._id){
					this.$http.put("/users", user).then((results) => {
						this.$router.go("/admin/users");
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
					this.$router.go("/admin/users")
				})
			},
			select(user){
				this.user = Vue.util.extend({}, user);
			},
			toggleEnabled(user){
				user.enabled = !user.enabled;
				this.$http.put("/users", user).then((results) => {
          this.get()
        });
			},
      upload(img){
        var data = new FormData();
        var file = this.$els.imgupload.files[0];
        data.append("img", file);
        this.$http.post("/upload", data).then((results) => {
          if(results.status == 200 && results.data.filename){
            this.$http.put("/users/" + this.user._id, {profile_picture:results.data.filename})
            .then((res) => {
              this.get();
            });
          }
        });
      }
		}
	}
</script>
