import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {setBaseURL} from './api';
import {apply_theme} from "./theme";

setBaseURL(process.env.REACT_APP_API_URL);

const root = document.getElementById('root');
ReactDOM.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>,
	root,
);

apply_theme();
