import jwt from "jsonwebtoken";
import User from "../models/mentor.js";
import MenteeUser from "../models/mentee.js";
import SessionRequest from "../models/SessionForm-Model.js";
import CreatedSession from "../models/CreateSession-Model.js";
const SECRET_KEY = "yashraj";

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token)
		return res.status(401).json({ error: "Access denied, token missing!" });

	jwt.verify(token, SECRET_KEY, (err, user) => {
		if (err) return res.status(403).json({ error: "Invalid token" });
		req.user = user;
		next();
	});
};

// Fetch profile controller
const getProfileMentee = async (req, res) => {
	try {
		const user = await MenteeUser.findById(req.user.id);
		res.status(200).json({ profile: user });
	} catch (error) {
		res.status(500).json({ error: "Error fetching profile" });
	}
};
const getProfileMentor = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		res.status(200).json({ profile: user });
	} catch (error) {
		res.status(500).json({ error: "Error fetching profile" });
	}
};

const getDashboardMentee = async (req, res) => {
	try {
		const user = await MenteeUser.findById(req.user.id);
		res.status(200).json({ profile: user });
	} catch (error) {
		res.status(500).json({ error: "Error fetching profile" });
	}
};
const getDashboardMentor = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		res.status(200).json({ profile: user });
	} catch (error) {
		res.status(500).json({ error: "Error fetching profile" });
	}
};

const getEditMentor = async (req, res) => {
	try {
		const {
			email,
			password,
			firstName,
			lastName,
			jobTitle,
			company,
			location,
			linkedin,
			skills,
			experience,
			language,
			description,
		} = req.body;
		const updatedUser = await User.findByIdAndUpdate(
			req.user.id,
			{
				email,
				password,
				firstName,
				lastName,
				jobTitle,
				company,
				location,
				linkedin,
				skills,
				experience,
				language,
				description,
			},
			{ new: true }
		);
		res
			.status(200)
			.json({ message: "Profile Updated Successfully", profile: updatedUser });
	} catch (error) {
		res.status(500).json({ error: "Error occurred" });
	}
};
const createSession = async (req, res) => {
	try {
		const { title, description, date, timeFrom, timeTo, price, type } =
			req.body;

		// Validate required fields
		if (
			!title ||
			!description ||
			!date ||
			!timeFrom ||
			!timeTo ||
			!price ||
			!type
		) {
			return res.status(400).json({ error: "All fields are required" });
		}

		// Create a new session
		const newSession = new CreatedSession({
			title,
			description,
			date,
			timeFrom,
			timeTo,
			price,
			type,
			mentorID: req.user.id, // Ensure req.user.id is set properly
		});

		// Save the new session to the database
		await newSession.save();

		res
			.status(200)
			.json({ message: "Session created successfully", session: newSession });
	} catch (error) {
		console.error("Error creating session:", error); // Log the error for debugging
		res
			.status(500)
			.json({ error: "Error occurred while creating the session" });
	}
};
const getSession = async (req, res) => {
	try {
		const mentorID = req.headers.mentorid; // Extract mentorID from headers

		if (!mentorID) {
			return res.status(400).json({ error: "mentorID is required in headers" });
		}

		const sessions = await CreatedSession.find({ mentorID });
		res.status(200).json({ sessions });
	} catch (error) {
		console.error(error); // Log the error for debugging
		res.status(500).json({ error: "Error fetching sessions" });
	}
};

const getSessiondetails = async (req, res) => {
	try {
		// Assuming 'mentorID' is a field in the 'CreatedSession' schema
		const sessions = await CreatedSession.find({ mentorID: req.user.id });
		res.status(200).json({ sessions });
	} catch (error) {
		console.error("Error fetching sessions:", error);
		res.status(500).json({ error: "Error fetching sessions" });
	}
};

const getMentors = async (req, res) => {
	try {
		const mentors = await User.find({ role: "mentor" });
		res.status(200).json({ mentors });
	} catch (error) {
		res.status(500).json({ error: "Error fetching mentors" });
	}
};

const registersession = async (req, res) => {
	try {
		const { mentor, mentee, date, time, duration, agenda } = req.body;
		const newSession = { mentor, mentee, date, time, duration, agenda };
		const user = await SessionRequest.findById(req.user.id);
		user.sessions.push(newSession);
		await user.save();
		res
			.status(200)
			.json({ message: "Session added successfully", session: newSession });
	} catch (error) {
		res.status(500).json({ error: "Error occurred" });
	}
};
// Export functions using ES module syntax
export {
	authenticateToken,
	getProfileMentee,
	getProfileMentor,
	getDashboardMentee,
	getEditMentor,
	getDashboardMentor,
	registersession,
	createSession,
	getSession,
	getMentors,
	getSessiondetails,
};
