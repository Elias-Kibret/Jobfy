import job from "../Model/JobModel.js";
import jobModel from "../Model/JobModel.js";
import { StatusCodes } from "http-status-codes";
export const createJob = async (req, res) => {
	const { company, position, status, jobType, jobLocation } = req.body;

	console.log(req.body);
	const newJob = await jobModel({
		position,
		company,
		status,
		jobLocation,
		jobType,
		createdBy: req.user,
	}).save();
	res.status(200).json(newJob);
};
export const deleteJob = async (req, res) => {
	try {
		res.status(200).json("successfull");
	} catch (error) {
		res.status(500).json(error);
	}
};
export const getAllJobs = async (req, res) => {
	const jobs = await jobModel.find({ createdBy: req.user });
	res
		.status(StatusCodes.OK)
		.json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
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
