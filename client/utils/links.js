import { IoBarCharSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpfroms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

export const links = [
	{
		id: 1,
		text: "stats",
		path: "/",
		icon: <IoBarCharSharp />,
	},
	{
		id: 2,
		text: "all jobs",
		path: "all-jobs",
		icon: <MdQueryStats />,
	},
	{
		id: 3,
		text: "add job",
		path: "add-job",
		icon: <FaWpfroms />,
	},
	{
		id: 4,
		text: "profile",
		path: "profile",
		icon: <ImProfile />,
	},
];
