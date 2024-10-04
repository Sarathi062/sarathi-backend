import mongoose from "mongoose";

const CreateSessionSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	start: {
		type: Date, // Changed from String to Date for ISO format
		required: true,
	},
	end: {
		type: Date, // Changed from String to Date for ISO format
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	mentorID: {
		type: String,
		// required: true // Uncomment if necessary
	},
	type: {
		type: String,
		required: true,
	},
	menteesID: {
		type: [String],
		// required: true // Uncomment if necessary
	},
});

const CreatedSession = mongoose.model("CreatedSession", CreateSessionSchema);

export default CreatedSession;
