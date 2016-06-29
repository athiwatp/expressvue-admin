<!-- Admin INdex page  -->
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
      li.header {{title}}
      li(v-link-active)
        a(v-link="{path: '/admin/users', activeClass:'active'}")
          i.fa.fa-user
          span Users
      li(v-link-active)
        a(v-link="{path:'/admin/configuration'}")
          i.fa.fa-wrench
          span Configuration
      li(v-link-active)
        a(v-link="{path: '/admin/email', activeClass:'active'}")
          i.fa.fa-envelope-o
          span Email
.content-wrapper
  router-view()
footer.main-footer
  .pull-right Express-VueJS
  strong No @ Copyright
</template>


<script>
import UserService from "../UserService.vue"

export default {
  data(){
    return {
      UserService,
      title:"Administration"
    }
  }
}

</script>
