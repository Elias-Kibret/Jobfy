import { Outlet, Link } from "react-router-dom";
import Wrapper from '../../assets/wrappers/SharedLayout'
import {Navbar,SmallNavbar,BigSidebar} from '../../components'
const ShareLayout = () => {
	return <Wrapper>
		<main className="dashboard">
			<SmallNavbar />
			<BigSidebar />
			<div>
				<Navbar />
				<div className="dashboard-page">
					<Outlet/>
				</div>	
			</div>
		</main>
		<Outlet/>
	</Wrapper>
};
export default ShareLayout;

