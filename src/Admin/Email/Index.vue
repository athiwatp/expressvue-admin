<template>
	<div class="content-header">
		<h3> {{title}} </h3>
	</div>
	<div class="content">
		<div class="col-xs-12 col-sm-6">
			<form>
			
				<div class="form-group">
					<label for="">SMTP Server</label>
					<input v-model="config.smtp_server" type="text" class="form-control" id="" placeholder="SMTP Server">
				</div>
				<div class="form-group">
					<label for="">Port</label>
					<input v-model="config.port" type="number" class="form-control" id="" placeholder="Port">
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
					<input v-model="config.username" type="text" class="form-control" id="" placeholder="Username">
				</div>
				<div class="form-group">
					<label for="">Pasword</label>
					<input v-model="config.password" type="password" class="form-control" id="" placeholder="Password">
				</div>
				<select name="" id="input" class="form-control">
					<option value="PLAIN">PLAIN</option>
					<option value="LOGIN">LOGIN</option>
					<option value="GSSAPI">GSSAPI</option>
				</select>

				<legend></legend>
				<div class="checkbox">
					<label>
						<input type="checkbox" value="">
						Force Secure Connection
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input type="checkbox" value="">
						Ignore TLS
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input type="checkbox" value="">
						Require TLS
					</label>
				</div>

				<legend></legend>
				<div class="form-group">
					<label for="">From Address</label>
					<input type="text" class="form-control" id="" placeholder="Input field">
				</div>
				<div class="form-group">
					<label for="">Subject</label>
					<input type="text" class="form-control" id="" placeholder="Input field">
				</div>
			
				
			
				<button type="submit" class="btn btn-primary">Save</button>
			</form>
	</div>
</template>

<script>
import Vue from "vue"
var config = Vue.resource("/config{/id}");
	export default {

		data(){
			return {
				title:"Email Configuration"
			}
		}
	}
</script>