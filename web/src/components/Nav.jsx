import {Link} from "react-router-dom";
import {ThemeIndicator} from "../theme";
import {Icon} from "./Utils";

export function nav() {
	return (
		<header className="nav flex flex-col sm:flex-row justify-between p-4">
			<h1 className="text-2xl self-center flex">
				Plague Inc. Go
				<ThemeIndicator/>
			</h1>
			<nav className="flex flex-col sm:flex-row">
				<Link className="nav-link sm:my-0 sm:mx-1 hover:bg-purple-300" to="/">Summary</Link>
				<Link className="nav-link sm:my-0 sm:mx-1 hover:bg-purple-300" to="/graph-view">Graph view</Link>
				<Link className='nav-link sm:my-0 sm:mx-1' to='/contact'><Icon name='letter'/></Link>
			</nav>
		</header>
	);
}
