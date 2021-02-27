import * as React from "react";
import {api} from '../api';
import {ApiError, Loading, Title} from "./Utils";

function StatsDisplay({label, data}) {
	return (
		<article className="text-center py-4">
			<p className="font-bold text-3xl">{data}</p>
			<p className="font-bold text-xl">{label}</p>
		</article>
	);
}

function CasesPerDayRow({date, count}) {
	return (
		<article className="flex justify-between p-3 border-b">
			<p>{date}</p>
			<p>{count}</p>
		</article>
	);
}

export class Summary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			error: null,
		};
	}

	componentDidMount() {
		api.summary()
			.then(data => this.setState({
				loaded: true,
				error: null,
				data,
			}))
			.catch(err => {
				this.setState({
					loaded: true,
					error: err,
				})
			});
	}

	listStats() {
		return [
			['Days', this.state.data['new-cases'].length],
			['Total cases to date', this.state.data['total-cases'].total],
			[`Day with most new cases (${this.state.data['worst-day'].total})`, this.state.data['worst-day'].date],
			[`Region with most new cases (${this.state.data['worst-region'].total})`, this.state.data['worst-region']._id],
		]
			.map(v => (<StatsDisplay key={v[0]} label={v[0]} data={v[1]}/>));
	}

	listNewCases() {
		return this.state.data['new-cases']
			.map(v => (<CasesPerDayRow key={v._id} date={v.date_fmt} count={v.total}/>));
	}

	render() {
		return this.state.loaded
			? (
				this.state.error
					? <ApiError kind={this.state.error}/> : (
						(
							<section className="flex flex-col sm:flex-row">
								<aside className="sm:px-4">
									<Title msg='Summary'/>
									{this.listStats()}
								</aside>
								<main className="flex-1">
									<Title className='border-t sm:border-0' msg='New cases per day'/>

									<section className="card border-b border-t sm:border-l sm:border-r">
										{this.listNewCases()}
									</section>
								</main>
							</section>
						)
					)
			)
			:
			(<Loading/>);
	}


}
