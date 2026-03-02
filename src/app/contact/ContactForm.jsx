'use client'

import React, { useState } from 'react'
import { submitContactMessage } from '../../services/api'
import './Contact.css'

export default function ContactForm() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		request: '',
	})
	const [status, setStatus] = useState('idle') // idle, loading, success, error
	const [errorMessage, setErrorMessage] = useState('')

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setStatus('loading')

		const response = await submitContactMessage(formData)

		if (response.success) {
			setStatus('success')
			setFormData({ name: '', email: '', request: '' }) // Reset form
		} else {
			setStatus('error')
			setErrorMessage(
				response.error || 'Failed to send message. Please try again.',
			)
		}
	}

	if (status === 'success') {
		return (
			<div className='contact-success'>
				<h3>Thank you for reaching out!</h3>
				<p>
					Your message has been successfully sent. We&apos;ll be in touch
					shortly.
				</p>
				<button
					onClick={() => setStatus('idle')}
					className='contact-submit-btn'
				>
					Send Another Message
				</button>
			</div>
		)
	}

	return (
		<form className='contact-form' onSubmit={handleSubmit}>
			{status === 'error' && (
				<div className='contact-error'>{errorMessage}</div>
			)}

			<div className='form-group'>
				<label htmlFor='name'>Name</label>
				<input
					type='text'
					id='name'
					name='name'
					value={formData.name}
					onChange={handleChange}
					required
					placeholder='Your full name'
					disabled={status === 'loading'}
				/>
			</div>

			<div className='form-group'>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					id='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					required
					placeholder='your.email@example.com'
					disabled={status === 'loading'}
				/>
			</div>

			<div className='form-group'>
				<label htmlFor='request'>Your request</label>
				<textarea
					id='request'
					name='request'
					value={formData.request}
					onChange={handleChange}
					required
					placeholder='How can we help you?'
					rows={6}
					disabled={status === 'loading'}
				></textarea>
			</div>

			<button
				type='submit'
				className={`contact-submit-btn ${status === 'loading' ? 'loading' : ''}`}
				disabled={status === 'loading'}
			>
				{status === 'loading' ? 'Sending...' : 'Submit Message'}
			</button>
		</form>
	)
}
