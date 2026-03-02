'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
	fetchArticles,
	fetchArticlesByCategory,
	submitSubscription,
} from '../../services/api'
import './Footer.css'

export default function Footer() {
	const [latestArticles, setLatestArticles] = useState([])
	const [email, setEmail] = useState('')
	const [subscribeStatus, setSubscribeStatus] = useState('idle') // 'idle', 'loading', 'success', 'error'
	const [subscribeMessage, setSubscribeMessage] = useState('')

	useEffect(() => {
		const loadFooterData = async () => {
			const data = await fetchArticles()
			setLatestArticles(data ? data.slice(0, 3) : [])
			// setPopularArticles(popular) // This line was in the instruction but 'popular' is not defined. Keeping it commented out or removing it.
		}
		loadFooterData()
	}, [])

	const handleSubscribe = async e => {
		e.preventDefault()
		if (!email) return

		setSubscribeStatus('loading')

		const response = await submitSubscription(email)

		if (response.success) {
			setSubscribeStatus('success')
			setSubscribeMessage('Thanks for subscribing!')
			setEmail('')
			// Reset status after a few seconds
			setTimeout(() => {
				setSubscribeStatus('idle')
				setSubscribeMessage('')
			}, 5000)
		} else {
			setSubscribeStatus('error')
			// Improve error message for duplicates
			if (response.error && response.error.includes('must be unique')) {
				setSubscribeMessage('This email is already subscribed.')
			} else {
				setSubscribeMessage(response.error || 'An unexpected error occurred.')
			}
		}
	}

	return (
		<footer className='footer-wrapper'>
			<div className='container'>
				{/* Top Footer line with Logo and Menu */}
				<div className='footer-top'>
					<Link href='/' className='footer-logo'>
						SmartLiving<span>HUB</span>
					</Link>
					<ul className='footer-categories'>
						<li>
							<Link href='/category/health'>Health</Link>
						</li>
						<li>
							<Link href='/category/money'>Money</Link>
						</li>
						<li>
							<Link href='/category/tech'>Tech</Link>
						</li>
						<li>
							<Link href='/category/home'>Home</Link>
						</li>
						<li>
							<Link href='/category/travel'>Travel</Link>
						</li>
					</ul>
				</div>

				{/* Main Footer 4 Columns */}
				<div className='footer-main'>
					<div className='footer-col footer-about'>
						<h4>About us</h4>
						<p>
							SmartLivingHub is your premier destination for daily insights on
							Health, Tech, Wealth, and Home living. We curate the latest trends
							to help you live smarter.
						</p>
						<div className='footer-socials'>
							<a
								href='https://www.facebook.com'
								target='_blank'
								className='social-icon'
							>
								f
							</a>
							<a
								href='https://www.instagram.com'
								target='_blank'
								className='social-icon'
							>
								in
							</a>
							<a
								href='https://www.x.com'
								target='_blank'
								className='social-icon'
							>
								X
							</a>
							<a
								href='https://www.youtube.com'
								target='_blank'
								className='social-icon'
							>
								yt
							</a>
						</div>
					</div>

					<div className='footer-col'>
						<h4>Company</h4>
						<ul className='footer-links'>
							<li>
								<Link href='/about'>About</Link>
							</li>
							<li>
								<Link href='/contact'>Contact us</Link>
							</li>
							<li>
								<Link href='/privacy-policy'>Privacy Policy</Link>
							</li>
							<li>
								<Link href='/terms-of-service'>Terms of Service</Link>
							</li>
						</ul>
					</div>

					<div className='footer-col'>
						<h4>The latest</h4>
						<div className='footer-latest-list'>
							{latestArticles.map((article, idx) => (
								<div className='footer-latest-item' key={`f-lat-${idx}`}>
									<h5>
										<Link href={`/article/${article.slug}`}>
											{article.title}
										</Link>
									</h5>
									<div className='footer-latest-meta'>
										<span className='cat-text' style={{ marginRight: '8px' }}>
											{article.category}
										</span>
										{article.date} - {article.views?.toLocaleString()} views
									</div>
								</div>
							))}
						</div>
					</div>

					<div className='footer-col footer-subscribe'>
						<h4>Subscribe</h4>
						{subscribeStatus === 'success' ? (
							<div className='subscribe-success-message'>
								<p
									style={{
										color: '#27ae60',
										margin: '15px 0',
										fontSize: '16px',
										fontWeight: 'bold',
									}}
								>
									{subscribeMessage}
								</p>
							</div>
						) : (
							<form onSubmit={handleSubscribe}>
								{subscribeStatus === 'error' && (
									<p
										style={{
											color: '#c0392b',
											fontSize: '13px',
											marginBottom: '10px',
										}}
									>
										{subscribeMessage}
									</p>
								)}
								<input
									type='email'
									placeholder='Email address'
									required
									value={email}
									onChange={e => setEmail(e.target.value)}
									disabled={subscribeStatus === 'loading'}
								/>
								<button type='submit' disabled={subscribeStatus === 'loading'}>
									{subscribeStatus === 'loading' ? 'WAIT...' : 'I WANT IN →'}
								</button>
								<label className='privacy-checkbox'>
									<input
										type='checkbox'
										required
										disabled={subscribeStatus === 'loading'}
									/>
									<span>
										I&apos;ve read and accept the{' '}
										<Link href='/privacy-policy'>Privacy Policy</Link>.
									</span>
								</label>
							</form>
						)}
					</div>
				</div>

				{/* Bottom Copyright */}
				<div className='footer-bottom'>
					© 2026 SmartLivingHub. All Rights Reserved.
				</div>
			</div>
		</footer>
	)
}
