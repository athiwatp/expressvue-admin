import Vue from 'vue'
import VueValidator from 'vue-validator'
import VueRouter from 'vue-router'
import VueResource from "vue-resource"
import AuthService from "./AuthService.vue"
import TokenService from "./TokenService.vue"
import App from './App.vue'
import Main from './Main.vue'
import Todos from './Todos.vue'
import Test from './Test.vue'
import About from './About.vue'
import Profile from './Profile/Index.vue'
import Profile_Edit from './Profile/Edit.vue'
import Profile_Password from './Profile/Password.vue'
import Login from './Login.vue'
import Register from './Register.vue'
import Admin from './Admin/Index.vue'
import Configuration from './Admin/Configuration/Index.vue'
import Users from './Admin/Users/Index.vue'
import Users_New from './Admin/Users/New.vue'
import Users_Edit from './Admin/Users/Edit.vue'
import Users_View from './Admin/Users/View.vue'
import Users_Password from './Admin/Users/Password.vue'
import Email from './Admin/Email/Index.vue'
import Messages from './Messages/Messages.vue'
import Messages_Index from './Messages/Index.vue'
import Messages_New from './Messages/New.vue'
import Messages_View from './Messages/View.vue'

// Initialize Vue Plugins
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueValidator)

Vue.mixin({
	data(){
		return {
			test:"testdata"
		}
	}
})

// Filters
Vue.filter("timeFull", (value) => {
	return moment(value).format("M/D/YYYY, h:mm:ss a")
})
Vue.filter("timeFromNow", (value) => {
	return moment(value).fromNow(true)
})
Vue.filter("isRead", value =>{
	return true
})
Vue.filter("truncate", (value) => {
	return _.truncate(value,{length:30})
})

// Setup Transitions



// Setup router and Auth Services
var router = new VueRouter({
	linkActiveClass:"active"
});
var Auth = new AuthService();

Vue.http.interceptors.push({
	request(request){
		request.headers.access_token = TokenService.get();
		return request;
	},
	response(response){
		if(response.status == 401){
			Auth.reset();
			router.go("/login");
		}
		return response;
	}
});
router.beforeEach(Auth.routerInterceptor());

router.map({
	"/":{
		component:Main,
		authenticate:true,
		subRoutes:{
			"/todos":{
				component:Todos
			}
		}
	},
	"/test":{
		component:Test,
		authenticate:true
	},
	"/about":{
		component:About,
	},
	"/profile":{
		component:Profile,
		authenticate:true
	},
	"/profile/edit/:_id":{
		component:Profile_Edit,
		authenticate:true
	},
	"/profile/password/:_id":{
		component:Profile_Password,
		authenticate:true
	},
	"/login":{
		component:Login
	},
	"/register":{
		component:Register
	},
	"/unauthorized":{
		component:Users
	},
	"/admin":{
		component:Admin,
		authenticate:true,
		subRoutes:{
			"/users":{
				component:Users
			},
			"/users/new":{
				component:Users_New
			},
			"/users/edit/:_id":{
				component:Users_Edit
			},
			"/users/view/:_id":{
				component:Users_View
			},
			"/users/password/:_id":{
				component:Users_Password
			},
			"/email":{
				component:Email
			},
			"/configuration":{
				component:Configuration
			}
		}
	},
	"/messages":{
		component:Messages,
		authenticate:true,
		subRoutes:{
			"/":{
				component:Messages_Index,
				authenticate:true,
			},
			"/new":{
				authenticate:true,
				component:Messages_New
			},
			"/view/:_id":{
				authenticate:true,
				component:Messages_View
			}
		}
	}
});
router.start(App, "#app");
