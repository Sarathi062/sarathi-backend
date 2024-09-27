import config from "./utils/config.js";
import mongoose from "mongoose";

// console.log("Connecting to", config.MONGODB_URI);

console.log("Connecting to", config.MONGODB_URI);


const ConnectDB = async () => {
	try {
		await mongoose.connect(config.MONGODB_URI);
		console.log("Connected to the Database");
	} catch (error) {
		console.error("Error connecting to the Database:", error);
		process.exit(1);
	}
};

// Export function using ES module syntax
export default ConnectDB;
