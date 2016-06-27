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
import Profile from './Profile.vue'
import Login from './Login.vue'
import Admin from './Admin/Index.vue'
import Users from './Admin/Users/Index.vue'
import Users_New from './Admin/Users/New.vue'
import Users_Edit from './Admin/Users/Edit.vue'
import Users_View from './Admin/Users/View.vue'
import Email from './Admin/Email/Index.vue'

Vue.filter("timeFull", (value) => {
	return moment(value).format("M/D/YYYY, h:mm:ss a")
})

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueValidator)
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
	"/login":{
		component:Login
	},
	"/register":{
		component:Users
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
			"/email":{
				component:Email
			}
		}
	}
});
router.start(App, "#app");
