import React from 'react'
import './About.css'

export const metadata = {
	title: 'About Us',
	description:
		'Welcome to Smart Living Hub Portal, your ultimate source for modern insights on Health, Money, Tech, Home, and Travel.',
	openGraph: {
		title: 'About Us | Smart Living Hub Portal',
		description:
			'Learn more about our mission and the topics we cover to empower your modern lifestyle.',
		url: 'https://smartlivinghub.info/about',
		type: 'website',
	},
}

export default function AboutPage() {
	return (
		<main className='about-page'>
			{/* Hero Section */}
			<section className='about-hero'>
				<div className='container'>
					<div className='about-hero-content'>
						<span className='about-badge'>Who We Are</span>
						<h1 className='about-title'>Empowering Your Modern Lifestyle.</h1>
						<p className='about-subtitle'>
							At Smart Living Hub Portal, we believe that living smarter means
							finding the perfect balance. We are your trusted compass in an
							ever-evolving world, providing actionable insights and inspiring
							stories across the facets of life that matter most.
						</p>
					</div>
				</div>
			</section>

			{/* Core Topics Section */}
			<section className='about-topics container'>
				<div className='topics-header'>
					<h2>What We Cover</h2>
					<div className='topics-divider'></div>
					<p>
						Deep dives, expert advice, and the latest trends tailored
						exclusively for you.
					</p>
				</div>
				<div className='topics-grid'>
					<div className='topic-card'>
						<div className='topic-icon'>♥</div>
						<h3>Health</h3>
						<p>
							From breaking medical news to daily wellness routines, we bring
							you insights to keep your mind and body at their absolute best.
						</p>
					</div>
					<div className='topic-card'>
						<div className='topic-icon'>$</div>
						<h3>Money</h3>
						<p>
							Navigate the complex world of personal finance, investing, and
							market trends to secure your financial future.
						</p>
					</div>
					<div className='topic-card'>
						<div className='topic-icon'>⚡</div>
						<h3>Tech</h3>
						<p>
							Stay ahead of the curve with our coverage of the latest gadgets,
							software updates, and digital innovations shaping tomorrow.
						</p>
					</div>
					<div className='topic-card'>
						<div className='topic-icon'>⌂</div>
						<h3>Home</h3>
						<p>
							Discover design inspiration, smart home automation tips, and DIY
							guides to turn your living space into a modern sanctuary.
						</p>
					</div>
					<div className='topic-card'>
						<div className='topic-icon'>✈</div>
						<h3>Travel</h3>
						<p>
							Explore hidden gems, luxury resorts, and practical guides that
							make your next adventure unforgettable.
						</p>
					</div>
				</div>
			</section>

			{/* Mission Section */}
			<section className='about-mission'>
				<div className='container'>
					<div className='mission-inner'>
						<div className='mission-text'>
							<h2>Our Mission</h2>
							<p>
								Our mission is simple: to curate and deliver high-quality,
								reliable, and engaging reporting that empowers our readers to
								make informed decisions. Whether you are looking to optimize
								your health routine, upgrade your home tech, or plan your next
								major getaway, Smart Living Hub Portal is here to ensure you
								never miss a beat.
							</p>
							<p>
								We are driven by a passion for quality journalism, cutting-edge
								design, and an unwavering commitment to our community. Welcome
								to the hub of smart living.
							</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}
