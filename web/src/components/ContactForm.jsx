import {useForm} from '@formcarry/react';

export function ContactForm() {
	const {state, submit} = useForm({
		id: process.env.REACT_APP_CONTACT_FORM,
	});

	return state.submitted
		? (
			<section className="pt-4">
				<h1 className='text-center text-3xl'>Thanks!</h1>
				<p className='text-center'>We received your message and will get back to you shortly.</p>
			</section>
		)
		: (
			<section className='pt-4'>
				<h1 className='text-center text-3xl'>Contact us</h1>

				<form onSubmit={submit} className='m-5'>
					<fieldset className='flex flex-col pb-4'>
						<label htmlFor="email" className='font-bold text-xl'>Your e-mail:</label>
						<input type="email" name='email' id="email" className='nav-link'/>
						<p className='italic text-sm'>Optional: provide one if you want us to get back to you.</p>
					</fieldset>
					<fieldset className='flex flex-col pb-4'>
						<label htmlFor="message" className='font-bold text-xl'>Your message:</label>
						<textarea id="message" name='message' rows='10' className='nav-link' required/>
					</fieldset>
					<fieldset className='flex pb-4 justify-center'>
						<button className='nav-link action hover:bg-purple-300' type="submit">Send your message!</button>
					</fieldset>
				</form>
			</section>
		);
}
