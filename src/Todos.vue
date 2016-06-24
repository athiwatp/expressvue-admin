<template lang="jade">
	.content-header
		h1 {{title}}
			small Keep track of tasks.
	.content
		.row
			.col-xs-12.col-sm-3
				.panel-info.panel
					.panel-heading
						a.pull-right.text-primary(href="" v-on:click.prevent="new()")
							span.glyphicon.glyphicon-plus
						h4 Todo
					.panel-body
						form(v-on:submit.prevent="save(todo)")
							.form-group
								label Title
								input.form-control(type="text" v-model="todo.title" placeholder="Title")
							.form-group
								label Description
								textarea.form-control(type="text" rows="5" v-model="todo.description" placeholder="Title")
							.checkbox
								label
									input(type="checkbox" v-model="todo.completed")
									| Completed
							.form-group
								button.btn.btn-primary(type="submit") Submit
					.panel-footer
			.col-xs-12.col-sm-9
				ul.list-group
					li.list-group-item(v-for="todo in todos" href="" v-bind:class="{ 'list-group-item-success': todo.completed }")
						a(href="" v-on:click.prevent="toggle(todo)"): span.pull-right.glyphicon.glyphicon-ok.text-success(v-if="todo.completed")
						a(href="" v-on:click.prevent="select(todo)"): h4(v-bind:class="{'strike':todo.completed}") {{todo.title}}
						p(v-bind:class="{'strike':todo.completed}") {{{todo.description}}}
						div
							button.btn.btn-danger.btn-sm.left-spacing-md(href="" v-on:click.prevent="delete(todo)")
								span.glyphicon.glyphicon-trash
								|   Delete
							button.btn.btn-success.btn-sm.left-spacing-md(href="" v-bind:disabled="todo.completed" v-on:click.prevent="toggle(todo)")
								span.glyphicon.glyphicon-ok
								|       Finish
</template>

<script>
import io from "socket.io-client/socket.io.js"
import Vue from "vue"
import VueResource from "vue-resource"
	export default {
		socket:null,
		ready (){
			this.get();
			this.socket = io.connect("http://localhost:3000");
			this.socket.on("todos", (data) => {
				if(data && data.method == "insert"){
			 		this.todos.push(data.new_data);
				}
				if(data && data.method == "update"){
			 		var i =_.findIndex(this.todos, function(t){ return t._id == data.new_data._id });
			 		this.todos.$set(i, data.new_data);
				}
				if(data && data.method == "delete"){
			 		var i =_.findIndex(this.todos, function(t){ return t._id == data.old_data._id });
			 		this.todos.splice(i,1);
				}
			})
		},
		data(){
			return {
				title:"Todos",
				todos:[],
				todo:{
					title:"",
					description:"",
					completed:false,
				}
			}
		},
		methods:{
			get(){
				this.$http.get("/todos").then((results) => {
					this.todos = results.data;
				});
			},
			delete(todo){
				this.$http.delete("/todos", todo).then((results) => {

				});
			},
			update(){
				this.$http.put("/todos", todo).then((results) => {
				});
			},
			save(todo){
				if(todo._id){
					this.$http.put("/todos", todo).then((results) => {

					});
				}else{
					this.$http.post("/todos", todo).then((results) => {

					});
				}
			},
			toggle(todo){
				todo.completed = !todo.completed;
				this.save(todo);
			},
			select(todo){
				this.todo = Vue.util.extend({}, todo);
			},
			new(){
				this.todo = {};
			}
		}
	}
</script>
<style >
.strike{
	text-decoration: line-through;
}
</style>
