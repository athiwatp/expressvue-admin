<script>
import Vue from "vue"
import VueResource from "vue-resource"
Vue.use(VueResource);
export default {
  loggedIn:false,
  user:{},
  ready(){
    this.$watch("loggedIn", value => {
      console.log(value)
    })
  },
  getCurrentUser(){
    if(this.user._id){
      Vue.http.get("/users",{_id: this.user._id}).then(response => {
        this.user = response.data;
      })
    }
  }
}

</script>
