<template lang="jade">
  .container
    .row
      .col-xs-4
        .panel.panel-default
          .panel-heading
            h3 Upload
          .panel-body
            form(v-on:submit.prevent="upload")
              .form-group
                label Title
                input.form-control(type="text" v-model="frm.title")
              .form-group
                label File
                input.form-control(type="file" v-el:imgupload name="img")
              .form-group
                button.btn.btn-primary(type="submit") Submit
      .col-xs-8
        .panel.panel-default
          .panel-heading
            h3 Results
          .panel-body
            pre {{results}}

</template>
<script>
  export default {
    data(){
      return {
        results:null,
        frm:{title:""}
      }
    },
    methods:{
      upload(){
        var fd = new FormData();
        var file = this.$els.imgupload.files[0];
        fd.append("img", file);
        fd.append("title", "this.frm.title");
        console.log(fd);
        this.$http.post("/uploadtest", fd,
          {
            upload:{
              onprogress:function(e){
                console.log((e.loaded / e.total) * 100)
              }
            }
          }).then(re => this.results = JSON.stringify(re));
      }
    }
  }

</script>
