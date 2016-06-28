<script>

export default {
  loggedIn:false,
  user:{},
  ready(){
    this.$watch("loggedIn", value => {
      console.log(value)
    })
  }
}

</script>
