<!-- Configuration Index -->
<template>
  <div class="content-header">
		<h3> {{title}} </h3>
	</div>
	<div class="content">
		<div class="col-xs-12 col-sm-6">
			<form v-on:submit.prevent="save_config">

				<div class="form-group">
					<label for="">Server Port</label>
					<input v-model="config.server.port" type="text" class="form-control" id="" placeholder="Server Port">
				</div>
				<button type="submit" class="btn btn-primary">Save</button>
			</form>
			<br>
	</div>
</template>
<script>
export default {
  data(){
    return {
      title:"Configuration",
      config:{}
    }
  },ready(){
    this.get_config();
  },
  methods:{
    get_config(){
      this.$http.get("/config").then((res) => {
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
    }
  }
}
</script>
