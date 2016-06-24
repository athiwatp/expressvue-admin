

module.exports = function (io) {
	if(io){
		io.on("connect", function (socket) {
			 console.log('connected');
			 socket.on("count", function (data) {
			 	 socket.broadcast.emit("count", data) ;
			 })
		})
	}
	
}