import job from "../Model/JobModel.js";
import jobModel from "../Model/JobModel.js";
import { BadREquestError, NotFoundError } from "../Errors/index.js";
import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../Errors/custom-API-Error.js";
import checkPermissions from "../utils/checkPermission.js";
import mongoose from "mongoose";
import moment from "moment";
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
	checkPermissions(req.user, job.createdBy);
	await job.remove();
	res.status(StatusCodes.OK).json("Delete");
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
	checkPermissions(req.user, job.createdBy);
	const updatedJob = await jobModel.findOneAndUpdate({ _id: jobId }, req.body, {
		new: true,
	});
	console.log(updatedJob);
	res.status(StatusCodes.OK).json(updatedJob);
};
export const showStats = async (req, res) => {
	let stats = await jobModel.aggregate([
		{ $match: { createdBy: mongoose.Types.ObjectId(req.user) } },
		{ $group: { _id: "$status", count: { $sum: 1 } } },
	]);

	stats = stats.reduce((acc, cur) => {
		const { _id: title, count } = cur;
		acc[title] = count;
		return acc;
	}, {});

	const defaultStats = {
		pending: stats.pending || 0,
		interview: stats.interview || 0,
		declined: stats.declined || 0,
	};
	let monthlyApplications = await jobModel.aggregate([
		{
			$match: { createdBy: mongoose.Types.ObjectId(req.user) },
		},
		{
			$group: {
				_id: {
					year: {
						$year: "$createdAt",
					},
					month: {
						$month: "$createdAt",
					},
				},
				count: { $sum: 1 },
			},
		},
		{ $sort: { "_id.year": -1, "_id.month": -1 } },
		{ $limit: 6 },
	]);
	monthlyApplications = monthlyApplications
		.map((item) => {
			const {
				_id: { year, month },
				count,
			} = item;
			const date = moment()
				.month(month - 1)
				.year(year)
				.format("MMM Y");
			return { date, count };
		})
		.reverse();
	res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
