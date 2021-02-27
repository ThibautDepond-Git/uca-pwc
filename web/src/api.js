import format from "date-fns/format";

let baseURL;

async function fetch_method(method) {
	try {
		const res = await fetch(`${baseURL}/${method}`);
		if (200 !== res.status) {
			throw res.status;
		}
		return await res.json();
	} catch (e) {
		throw (typeof e !== 'number') ? 'network' : e;
	}
}

export function setBaseURL(url) {
	baseURL = url;
}

function _d(d) {
	return new Date(Date.parse(d));
}

function _f(d) {
	return format(d, 'dd / MM / yyyy');
}

const api_cache = {
	'summary': null,
};

export const api = {
	'summary': async (force_refresh = false) => {
		if (force_refresh || null === api_cache['summary']) {
			const data = await fetch_method('summary');
			data['worst-day'].date = _f(_d(data['worst-day']._id));
			data['new-cases'] = data['new-cases'].map(v => {
				return {...v, date: _d(v._id), date_fmt: _f(_d(v._id))};
			});
			data.period = data.period.map(d => _f(_d(d)));
			api_cache.summary = data;
		}

		return api_cache.summary;
	},
};
