<script>
import Vue from "vue"
import VueResource from "vue-resource"
import io from "socket.io-client/socket.io.js"
import UserService from "./UserService.vue"
Vue.use(VueResource);
export default  {
  messages:[],
  socket:null,
  init(_id){
    Vue.http.get("/messages", {to_id:_id}).then(response => {
      this.messages = response.data;

      // Socketio
      this.socket = io.connect("http://localhost:3000");
			this.socket.on("messages", (data) => {
				if(data && data.method == "insert"){
          if(data.new_data.to_id && data.new_data.to_id == UserService.user._id){
            this.messages.push(data.new_data);
          }
				}
				if(data && data.method == "update"){
          if(data.new_data.to_id && data.new_data.to_id == UserService.user._id){
            var i =_.findIndex(this.messages, function(t){ return t._id == data.new_data._id });
  			 		this.messages.$set(i, data.new_data);
          }
				}
				if(data && data.method == "delete"){
            var i =_.findIndex(this.messages, function(t){
              return t._id == data.old_data._id
            });
            if(i != -1){this.messages.splice(i,1);}

				}
			})
    })
  }
}
</script>
