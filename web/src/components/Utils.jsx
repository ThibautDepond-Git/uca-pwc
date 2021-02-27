export function Loading() {
	return (
		<h1 className="text-center text-3xl p-4">Loading...</h1>
	);
}

export function Title({className, msg}) {
	const cln = `font-bold text-2xl text-center py-4 ${className}`;
	return (<h1 className={cln}>{msg}</h1>);
}

export function Icon({name}) {
	const icons = {
		sun: (<svg className='w-6 h-6' fill="none" stroke="currentColor" viewBox="0 0 24 24"
				   xmlns="http://www.w3.org/2000/svg">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
				  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
		</svg>),
		moon: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
				  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
		</svg>),
		letter: (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					  xmlns="http://www.w3.org/2000/svg">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
				  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
		</svg>),
		unknown: (<svg className='w-6 h-6' fill="none" stroke="currentColor" viewBox="0 0 24 24"
					   xmlns="http://www.w3.org/2000/svg">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
		</svg>),
	}
	return icons[name] || icons['unknown'];
}

export function ApiError({kind}) {
	switch (kind) {
		case 'network':
			return (
				<section className='pt-4 text-center'>
					<h1 className='text-2xl'>A network error occurred.</h1>
					<p>Are you logged onto Internet? Or, maybe the API server is down.</p>
					<p>Please try again later.</p>
				</section>
			);
		case '500':
			return (
				<section className='pt-4 text-center'>
					<h1 className='text-2xl'>The server crashed.</h1>
					<p>The server crashed and returned a 500 error.</p>
					<p>Please try again later.</p>
				</section>
			);
		default:
			return (
				<section className='pt-4 text-center'>
					<h1 className='text-2xl'>Unknown API error</h1>
					<p>The API request failed with an unknown error.</p>
					<p>Please try again later.</p>
					<hr/>
					<p>Error code: <code className='font-mono'>{kind}</code></p>
				</section>
			);
	}
}
