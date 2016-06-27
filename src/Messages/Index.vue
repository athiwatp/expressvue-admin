<template lang="jade">
.content-header
  p No Messages Selected
</template>

<script>
import UserService from "../UserService.vue"
	export default {
		data(){
			return {
				UserService,
				title:"Message Header"
			}
		}
	}
</script>
