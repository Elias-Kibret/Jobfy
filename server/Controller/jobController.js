import job from "../Model/JobModel.js";
import jobModel from "../Model/JobModel.js";
import { BadREquestError, NotFoundError } from "../Errors/index.js";
import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../Errors/custom-API-Error.js";
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
	const { id: JobId } = req.params;
	const job = await jobModel.findOne({ _id: JobId });
	if (!job) {
		throw new CustomAPIError(`No jb with id :${jobId}`);
	}
	await job.remove();
};
export const getAllJobs = async (req, res) => {
	const jobs = await jobModel.find({ createdBy: req.user });
	res
		.status(StatusCodes.OK)
		.json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};
export const updateJob = async (req, res) => {
	const { id: jobId } = req.params;
	const { company, position } = req.body;
	if (!company || !position) {
		throw new BadREquestError("Please Provide All values");
	}
	const job = await jobModel.findOne({ _id: jobId });
	if (!job) {
		throw new NotFoundError(`No job with id ${jobId}`);
	}
	const updatedJob = await jobModel.findOneAndUpdate({ _id: jobId }, req.body, {
		new: true,
	});
	console.log(updatedJob);
	res.status(StatusCodes.OK).json(updatedJob);
};
export const showStats = async (req, res) => {
	try {
		res.status(200).json("successfull");
	} catch (error) {
		res.status(500).json(error);
	}
};
