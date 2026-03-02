import React from 'react'
import ContactForm from './ContactForm'
import './Contact.css'

export const metadata = {
	title: 'Contact Us',
	description:
		'Get in touch with the Smart Living Hub Portal team. We would love to hear your feedback, questions, or partnership inquiries.',
	openGraph: {
		title: 'Contact Us | Smart Living Hub Portal',
		description: 'Get in touch with the Smart Living Hub Portal team.',
		url: 'https://smartlivinghub.info/contact',
		type: 'website',
	},
}

export default function ContactPage() {
	return (
		<main
			className='contact-page'
			style={{ backgroundColor: 'var(--bg-main)' }}
		>
			<div className='container'>
				<div className='contact-content'>
					<h1 className='contact-title'>Contact Us</h1>
					<p className='contact-intro'>
						Have a question, feedback, or a partnership inquiry? We’d love to
						hear from you. Fill out the form below and our team will get back to
						you as soon as possible.
					</p>

					<ContactForm />
				</div>
			</div>
		</main>
	)
}
