// import { language } from 'googleapis/build/src/apis/language';
import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
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

	jobTitle: {
		type: String,
		// required: true
	},
	company: {
		type: String,
		// required: true
	},
	location: {
		type: String,
		// required: true
	},
	linkedin: {
		type: String,
		// required: true
	},
	skills: {
		type: Array,
		// required: true
	},
	experience: {
		type: Array,
		// required: true
	},
	language: {
		type: String,
	},
	description: {
		type: String,
	},
});

mentorSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const User = mongoose.model("User", mentorSchema);

export default User;
