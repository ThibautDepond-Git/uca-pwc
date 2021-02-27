import {GlobalCasesCount} from './GlobalCasesCount';
import {Summary} from './Summary';
import {nav as Nav} from './Nav';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ContactForm} from "./ContactForm";

function App() {
	return (
		<div>
			<Router>
				<Nav/>

				<Switch>
					<Route exact path="/">
						<Summary/>
					</Route>
					<Route path="/graph-view">
						<GlobalCasesCount/>
					</Route>
					<Route name='/contact'>
						<ContactForm/>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
