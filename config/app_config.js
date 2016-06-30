module.exports = {
	database:{
		type:"disk", // Options are disk, mongodb, mysql,sqlserver
		connection_string:"mongodb://localhost/test" // database connection string
	},
	jwt:{
		secret:"secret", // The secret used to create JSON Web Tokens
		header_key:"access_token" // Request header key for tokens to validate
	},
// This is the admin user that will be generated if the Factory Generator is called
	admin_user:{
		fname:"Website",
		lname:"Administrator",
		username:"admin",
		role:"admin",
		email:"admin@default.com",
		password:"password"
	}
}
