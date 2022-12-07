import jobModel from "../Model/JobModel.js";
export const createJob = async (req, res) => {
	const { company, position, status, jobType, jobLocation } = req.body;
	console.log(req.user);
	// const newJob = await jobModel({
	// 	position,
	// 	company,
	// 	status,
	// 	jobLocation,
	// 	jobType,
	// }).save();
	// res.status(200).json(newJob);
};
export const deleteJob = async (req, res) => {
	try {
		res.status(200).json("successfull");
	} catch (error) {
		res.status(500).json(error);
	}
};
export const getAllJobs = async (req, res) => {
	try {
		res.status(200).json("successfull");
	} catch (error) {
		res.status(500).json(error);
	}
};
export const updateJob = async (req, res) => {
	try {
		res.status(200).json("successfull");
	} catch (error) {
		res.status(500).json(error);
	}
};
export const showStats = async (req, res) => {
	try {
		res.status(200).json("successfull");
	} catch (error) {
		res.status(500).json(error);
	}
};
