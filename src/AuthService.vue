<script>
  import Vue from "vue"
  import VueRouter from "vue-router"
  import VueResource from "vue-resource"
  import UserService from "./UserService.vue"
  import MessageService from "./MessageService.vue"
  // import TokenService from "./TokenService.vue"
  var TokenService = {
    set(token){
      localStorage.setItem("access_token", token);
    },
    get(){
      return localStorage.getItem("access_token");
    },
    remove(){
      localStorage.removeItem("access_token");
    }
  };


  Vue.use(VueRouter);
  Vue.use(VueResource);
  var router = new VueRouter();

  export default class {
    constructor(){

    }
    // Functions
    setUserServiceLoggedIn(user,token){
      UserService.loggedIn = true;
      UserService.user = user;
      TokenService.set(token);
      // Load in messages
      MessageService.init(user._id)
    }
    login(user, cb){
      Vue.http.post("/auth/login", user).then((results) => {
        if(results.data && results.data.status){
          // Set user to logged in
          this.setUserServiceLoggedIn(results.data.user,results.data.access_token);
          router.go("/");
        }
        cb(results.data)
      });

    }
    reset(){
      UserService.loggedIn = false;
      UserService.user = {};
      TokenService.remove();
    }
    logout(user){
      UserService.loggedIn = false;
      UserService.user = {};
      TokenService.remove();
      router.go("/login");
      Vue.http.post("/auth/logout", user).then((results) => {

      });
    }

    validate(token){
      token = token || TokenService.get();
      return Vue.http.post("/auth/validate")
    }
    getUser(cb){ // Sets UserService.user and .loggedIn token exists and is valid
      var token = TokenService.get()
      if(token && token != "undefined"){
        this.validate(token).then((results) => {
          if(results.data && results.data.status){
            this.setUserServiceLoggedIn(results.data.user,token);

            if(typeof cb == "function"){
              return cb(true);
            }
          }else{
            this.reset();
            if(typeof cb == "function"){
              return cb(false);
            }
          }
        });
      }

    }

    isAuthenticated(cb){ // return a callback(bool) if user is authenticated
      var token = TokenService.get()
      if(token && token != "undefined"){
        if(!UserService.loggedIn){
          this.getUser(status => {
            if(typeof cb == "function"){
              if(status){

              }
              return cb(status);
            }
          });
        }else{
          if(typeof cb == "function"){

            return cb(true);
          }
        }
      }else{
        if(typeof cb == "function"){
          return cb(false);
        }
      }
    }

    routerInterceptor(){
      return ({to, next, from}) => {
      	// Does the route require authentication
      		if(to.authenticate){
      			// Is the user authenticated, check by token
      			this.isAuthenticated((status) => {
      				if(status){
      					// Allow route transition
      					next()
      				}else{
      					// Redirect to login
      					router.go("/login");
      				}
      			});
      		// Route does not require Authentication
      		}else{
      			// Get the logged in user by token if it exists.
      			this.getUser();
      			next();
      		}
      	// If the route does not require authentication, allow transition
      }
    }

    httpInterceptor(){
      return {
      	request(request){
      		request.headers.access_token = TokenService.get();
      		return request;
      	},
      	response(response){
      		if(response.status == 401){
      			this.reset();
      			router.go("/login");
      		}
      		return response;
      	}
      }
    }
  }

</script>
