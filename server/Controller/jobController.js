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
	const { status, search, jobType, sort } = req.query;
	const queryObject = {
		createdBy: req.user,
	};
	if (status !== undefined && status !== "all") {
		queryObject.status = status;
	}
	if (jobType !== undefined && jobType !== "all") {
		queryObject.jobType = jobType;
	}
	if (search) {
		queryObject.position = { $regex: search, $options: "i" };
	}
	let sortParams = "";
	if (sort !== undefined && sort === "latest") {
		sortParams = "-createdAt";
	}
	if (sort !== undefined && sort === "oldest") {
		sortParams = "createdAt";
	}
	if (sort !== undefined && sort === "a-z") {
		sortParams = "position";
	}
	if (sort !== undefined && sort === "z-a") {
		sortParams = "-position";
	}
	console.log(queryObject);
	let result = jobModel.find(queryObject).sort(sortParams);

	console.log(result);

	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;
	result = result.skip(skip).limit(limit);
	const jobs = await result;

	const totalJobs = await jobModel.countDocuments(queryObject);
	const numOfPages = Math.ceil(totalJobs / limit);
	res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
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
