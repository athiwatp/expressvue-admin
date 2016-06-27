<template lang="jade">
  header.main-header
    a(v-link="{path: '/', exact:true}").logo {{title}}
    nav(role="navigation").navbar.navbar-static-top
      // Sidebar toggle
      a.sidebar-toggle(data-toggle="offcanvas" role="button")
      ul.nav.navbar-nav
        li(v-link-active v-if="UserService.loggedIn")
          a(v-link="{path: '/test', activeClass:'active'}") Test
        li(v-link-active)
          a(v-link="{path: '/about', activeClass:'active'}") About

      div.navbar-custom-menu
        ul.nav.navbar-nav
          // Messages
          li.dropdown.messages-menu
            a.dropdown-toggle(data-toggle="dropdown" aria-expanded="false")
              i.fa.fa-envelope-o
              span.label.label-success 4
            ul.dropdown-menu
              li.header You have 4 messages
              li
                ul.menu
                  li
                    a()
                      .pull-left
                        img.profile-picture-sm.img-circle(alt="User Img" src="/images/profile_default.jpg")
                      h4
                        | Website Admin
                        small
                          i.fa.fa-clock-o 5 min
                      p This is some test message data
              li.footer
                a(v-link="{path:'/messages' }") See All Messages
          // Settings
          li.dropdown.notifications-menu
            a.dropdown-toggle(href="" data-toggle="dropdown")
              i.fa.fa-cog
              |    Settings
            ul.dropdown-menu
              li.header
                | Site Settings
              li
                ul.menu
                  li
                    a(v-link="{path: '/admin', activeClass:'active'}")
                      i.fa.fa-wrench.info
                      |   Administration

          li.dropdown.user.user-menu(v-if="UserService.loggedIn")
            a.dropdown-toggle(href="#" data-toggle="dropdown")
              img.user-image(v-if="!UserService.user.profile_picture" v-bind:src="'images/profile_default.jpg'" alt="User Image")
              img.user-image(v-if="UserService.user.profile_picture" v-bind:src="'images/' + UserService.user.profile_picture" alt="User Image")
              span.hidden-xs {{UserService.user.username}}
              span.caret
            ul.dropdown-menu
              // User Image
              li.user-header
                img.img-circle(v-if="!UserService.user.profile_picture" v-bind:src="'images/profile_default.jpg'" alt="User Image")
                img.img-circle(v-if="UserService.user.profile_picture" v-bind:src="'images/' + UserService.user.profile_picture" alt="User Image")
                p
                  | {{UserService.user.fname}} {{UserService.user.lname}}
                  small {{UserService.user.email}}

              // Menu Body
              li.user-footer
                .pull-left
                  a.btn.btn-default.btn-flat(v-link="{path: '/profile', activeClass:'active'}") Profile
                .pull-right
                  a.btn.btn-default.btn-flat(href="" v-on:click.prevent="logout()") Logout
  router-view
</template>

<script>
import UserService from "./UserService.vue"
import AuthService from "./AuthService.vue"
export default {

  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      title: 'Hello Vue!',
      UserService:UserService,
    }
  },
  ready(){
  },
  methods:{
    logout:function(){
      var a = new AuthService();
      a.logout();
    }
  }
}
</script>

<style>
</style>
