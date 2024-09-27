import mongoose from "mongoose";

const menteeSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},

	educationStatus: {
		type: String,
		// required: true
	},
	interests: {
		type: Array,
		// required: true
	},
	goals: {
		type: Array,
		// required: true
	},
});

// add this method to schema to remove _id, __v, and password when returning user
menteeSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const MenteeUser = mongoose.model("MenteeUser", menteeSchema);

export default MenteeUser;