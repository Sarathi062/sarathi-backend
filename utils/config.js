// config.js
import dotenv from "dotenv";
dotenv.config(); 

// console.log("Environment Variables:", process.env.MONGODB_URI);

const config = {
	PORT: process.env.PORT || 3001,
	MONGODB_URI: process.env.MONGODB_URI,
	SECRET_KEY: process.env.SECRET_KEY,
	pass: process.env.pass,
	CLIENT_ID: process.env.CLIENT_ID,
	CLIENT_SECRET: process.env.CLIENT_SECRET,
};

export default config;
