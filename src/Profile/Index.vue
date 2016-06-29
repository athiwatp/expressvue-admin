<template lang="jade">
  .content-wrapper.full
    .container
      .content-header
        h3 User Profile
      .row
        .col-xs-12
          .box
            .box-header
              a.text-warning(v-link="{path:'/profile/edit/' + UserService.user._id}")
                i.fa.fa-edit.margin
                span Edit
              a.text-success(v-link="{path:'/profile/password/' + UserService.user._id}")
                i.fa.fa-lock.margin
                span Change Password
            .box-body
              h3
                | {{UserService.user.fname + ' ' + UserService.user.lname}}
                small    {{UserService.user.username}}
              img.profile-picture-lg.img-circle.img-responsive(v-if="UserService.user.profile_picture" v-bind:src="'images/' + UserService.user.profile_picture")
              img.profile-picture-lg.img-circle.img-responsive(v-if="!UserService.user.profile_picture" v-bind:src="'images/profile_default.jpg'")
            table.table-hover.table-responsive.table-condensed
              tbody
                tr
                  td: strong First Name:
                  td {{UserService.user.fname}}
                tr
                  td: strong Last Name:
                  td {{UserService.user.lname}}
                tr
                  td: strong Username:
                  td {{UserService.user.username}}
                tr
                  td: strong Email:
                  td {{UserService.user.email}}
                tr
                  td: strong Role:
                  td {{UserService.user.role}}
                tr
                  td: strong Enabled:
                  td(v-bind:class="{'text-success': UserService.user.enabled, 'text-danger': !UserService.user.enabled}")
                    span.glyphicon(v-bind:class="{'glyphicon-ok': UserService.user.enabled, 'glyphicon-remove': !UserService.user.enabled}")
                tr
                  td: strong Created At:
                  td {{UserService.user.created | timeFull}}
                tr
                  td: strong Updated At:
                  td {{UserService.user.updated | timeFull}}
            .box-footer
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

  import UserService from "../UserService.vue"
  export default {
    data(){
      return {
        user:{},
        UserService:UserService,
        img:""
      }
    },
    ready(){
      if(this.UserService.loggedIn){
        //this.get();
      }
      // this.$watch("UserService.loggedIn", (new_val, old_val) => {
      //   if(new_val){
      //     this.get();
      //   }
      // })
    },
    methods:{
      get(){
        this.$http.get("/users/" + this.UserService.user._id).then((results) => {
          this.user = results.data;
          UserService.user = results.data;
        })
      },
      upload(img){
        var data = new FormData();
        var file = this.$els.imgupload.files[0];
        data.append("img", file);
        this.$http.post("/upload", data).then((results) => {
          if(results.status == 200 && results.data.filename){
            this.$http.put("/users/" + this.UserService.user._id, {profile_picture:results.data.filename})
            .then((res) => {
              this.get();
            });
          }
        });
      }
    }
  }

</script>
