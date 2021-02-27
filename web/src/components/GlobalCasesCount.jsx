import * as React from "react";
import {api} from '../api';
import {FlexibleWidthXYPlot as XYPlot, HorizontalGridLines, LineSeries, YAxis} from 'react-vis';
import {ApiError, Loading, Title} from "./Utils";

export class GlobalCasesCount extends React.Component {
	constructor(props) {
		super(props);

		this.state = {loaded: false, error: null};
	}

	componentDidMount() {
		api["summary"]()
			.then(data => this.setState({
				loaded: true,
				items: data['new-cases'],
				period: data['period'],
			}))
			.catch(error => {
				this.setState({
					loaded: true,
					error,
				})
			})
	}

	render() {
		return this.state.loaded
			? (
				this.state.error
					? <ApiError kind={this.state.error}/>
					: (
						(
							<section>
								<Title msg='New cases per month'/>

								<XYPlot height={300}>
									<HorizontalGridLines/>
									<LineSeries
										data={this.state.items.map(i => {
											return {x: i.date, y: i.total}
										})}
									/>
									<YAxis/>
								</XYPlot>

								<article className='p-4'>
									<Title msg='About the data'/>

									<p>The data spans from {this.state.period[0]} to {this.state.period[1]}.</p>
								</article>
							</section>
						)
					)
			)
			: (<Loading/>);
	}
}
