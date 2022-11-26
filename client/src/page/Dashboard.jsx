import { useEffect } from "react";
const Dashboard = () => {
	const fetchData = async () => {
		try {
			const response = await fetch('http://localhost:4000/')
		console.log(response)
			const data=await response.json()
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		fetchData()
	},[])
	return <div>Dashboard</div>;
};
export default Dashboard;
