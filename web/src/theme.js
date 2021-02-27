import * as React from "react";
import {Icon} from "./components/Utils";

export function is_current_theme_dark() {
	if (localStorage && 'theme' in localStorage) {
		return localStorage.theme === 'dark';
	}
	return (
		(document.documentElement.classList.contains('dark'))
		|| (window.matchMedia('(prefers-color-scheme: dark)').matches)
	);
}

export function apply_theme() {
	if (is_current_theme_dark()) {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}
}

export function toggle_theme() {
	if (is_current_theme_dark()) {
		localStorage.theme = 'light';
	} else {
		localStorage.theme = 'dark';
	}
	apply_theme();
}

export class ThemeIndicator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			is_dark: is_current_theme_dark(),
		};
	}

	toggle_theme() {
		toggle_theme();
		this.setState({is_dark: is_current_theme_dark()});
	}

	render() {
		return (
			<button className='ml-2' title='Toggle dark theme' onClick={this.toggle_theme.bind(this)}>
				<Icon name={this.state.is_dark ? 'moon' : 'sun'}/>
			</button>
		);
	}
}
