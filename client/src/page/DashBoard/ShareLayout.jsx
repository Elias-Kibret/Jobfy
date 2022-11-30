import { Outlet, Link } from "react-router-dom";
import Wraper from '../../assets/wrappers/SharedLayout'
const ShareLayout = () => {
	return <div>
		<nav>
			<Link to="all-jobs">AllJobs</Link>
			<Link to="add-job">All Jobs</Link>
		</nav>
		<Outlet/>
	</div>
};
export default ShareLayout;
