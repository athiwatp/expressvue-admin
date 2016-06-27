<template>
	<div class="content-header">
		<h3> {{title}} </h3>
	</div>
	<div class="content">
		<div class="col-xs-12 col-sm-6">
			<form v-on:submit.prevent="save_config">

				<div class="form-group">
					<label for="">SMTP Server</label>
					<input v-model="config.smtp.host" type="text" class="form-control" id="" placeholder="SMTP Server">
				</div>
				<div class="form-group">
					<label for="">Port</label>
					<input v-model="config.smtp.port" type="number" class="form-control" id="" placeholder="Port">
				</div>
				<legend></legend>
				<div class="checkbox">
					<label>
						<input v-model="authentication" type="checkbox" value="">
						Authentication
					</label>
				</div>
				<div class="form-group">
					<label for="">Username</label>
					<input v-bind:disabled="!authentication" v-model="config.smtp.auth.user" type="text" class="form-control" id="" placeholder="Username">
				</div>
				<div class="form-group">
					<label for="">Pasword</label>
					<input v-bind:disabled="!authentication" v-model="config.smtp.auth.pass" type="password" class="form-control" id="" placeholder="Password">
				</div>
				<select v-model="config.smtp.authMethod" name="" id="input" class="form-control">
					<option value="PLAIN">PLAIN</option>
					<option value="LOGIN">LOGIN</option>
					<option value="GSSAPI">GSSAPI</option>
				</select>

				<legend></legend>
				<div class="checkbox">
					<label>
						<input v-model="config.smtp.secure" type="checkbox" value="">
						<strong>Force Secure Connection</strong> <small>Connection will only use TLS</small>
					</label>
				</div>
				<div  class="checkbox">
					<label>
						<input v-bind:disabled="config.smtp.secure" v-model="config.smtp.ignoreTLS" type="checkbox" value="">
						<strong>Ignore TLS</strong> <small>TLS will not be used (either to connect, or as a STARTTLS connection upgrade command).</small>
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input v-bind:disabled="config.smtp.secure" v-model="config.smtp.requireTLS" type="checkbox" value="">
						<strong>Require TLS</strong> <small>Forces the use of STARTTLS</small>
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input v-model="config.smtp.tls.rejectUnauthorized" type="checkbox" value="">
						<strong>Require Valid Certificate</strong> <small>Requires the smtp server to have a valid certificate.</small>
					</label>
				</div>

				<legend></legend>
				<div class="form-group">
					<label for="">From Address</label>
					<input v-model="config.mailData.from" type="text" class="form-control" id="" placeholder="Input field">
				</div>
				<div class="form-group">
					<label for="">Subject</label>
					<input v-model="config.mailData.subject" type="text" class="form-control" id="" placeholder="Input field">
				</div>



				<button type="submit" class="btn btn-primary">Save</button>
				<a v-on:click.prevent="verify_config" class="btn btn-default">Verify Config</a>
			</form>
			<br>
	</div>
</template>

<script>
import Vue from "vue"

	export default {

		data(){
			return {
				title:"Email Configuration",
				config:{},
				authentication:false
			}
		},
		methods:{
			get_config(){
				this.$http.get("/config").then((res) => {
					if(res.data.smtp.auth){
						this.authentication = true;
					}
					this.config = res.data;
				})
			},
			save_config(){
				this.$http.put("/config", this.config).then((res) => {
					if(res.data.status){
						alert(res.data.message);
						this.get_config();
					}
				})
			},
			verify_config(){
				this.save_config();
				this.$http.post("http://localhost:3000/services/verifyemailconfig").then(response => {
					if(response.data.success){
						alert("Email SMTP configuration is successfull");
					}
					if(response.data.error){
						alert("Email configuration is invalid");
					}
				})
			}
		},
		ready(){
			this.get_config();
			this.$watch("config.smtp.secure", (value) => {
				if(value){
					this.config.smtp.ignoreTLS = false;
					this.config.smtp.requireTLS = false;
				}
			});
			this.$watch("authentication", value => {
				if(!value){
				delete	this.config.smtp.auth;
				}
			})
		}
	}
</script>
