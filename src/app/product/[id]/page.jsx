'use client'

import React, { useState, useEffect, use } from 'react'
import {
	FaCheckCircle,
	FaStar,
	FaClock,
	FaShieldAlt,
	FaTruck,
	FaFire,
	FaArrowRight,
} from 'react-icons/fa'
import { notFound } from 'next/navigation'
import { fetchProductById } from '../../../services/api'
import styles from './product.module.css'

const AmazonAppIcon = ({ className }) => (
	<div
		className={className}
		style={{
			width: '24px',
			height: '24px',
			backgroundColor: 'white',
			borderRadius: '6px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			marginRight: '6px',
			paddingTop: '2px', // visually center the amazon a
		}}
	>
		<svg
			viewBox='2 0 252 260'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			style={{ width: '16px', height: '16px' }}
		>
			<g fill='none' fillRule='evenodd'>
				<path
					d='m221.503 210.324c-105.235 50.083-170.545 8.18-212.352-17.271-2.587-1.604-6.984.375-3.169 4.757 13.928 16.888 59.573 57.593 119.153 57.593 59.621 0 95.09-32.532 99.527-38.207 4.407-5.627 1.294-8.731-3.16-6.872zm29.555-16.322c-2.826-3.68-17.184-4.366-26.22-3.256-9.05 1.078-22.634 6.609-21.453 9.93.606 1.244 1.843.686 8.06.127 6.234-.622 23.698-2.826 27.337 1.931 3.656 4.79-5.57 27.608-7.255 31.288-1.628 3.68.622 4.629 3.68 2.178 3.016-2.45 8.476-8.795 12.14-17.774 3.639-9.028 5.858-21.622 3.71-24.424z'
					fill='#f90'
					fillRule='nonzero'
				/>
				<path
					d='m150.744 108.13c0 13.141.332 24.1-6.31 35.77-5.361 9.489-13.853 15.324-23.341 15.324-12.952 0-20.495-9.868-20.495-24.432 0-28.75 25.76-33.968 50.146-33.968zm34.015 82.216c-2.23 1.992-5.456 2.135-7.97.806-11.196-9.298-13.189-13.615-19.356-22.487-18.502 18.882-31.596 24.527-55.601 24.527-28.37 0-50.478-17.506-50.478-52.565 0-27.373 14.85-46.018 35.96-55.126 18.313-8.066 43.884-9.489 63.43-11.718v-4.365c0-8.018.616-17.506-4.08-24.432-4.128-6.215-12.003-8.777-18.93-8.777-12.856 0-24.337 6.594-27.136 20.257-.57 3.037-2.799 6.026-5.835 6.168l-32.735-3.51c-2.751-.618-5.787-2.847-5.028-7.07 7.543-39.66 43.36-51.616 75.43-51.616 16.415 0 37.858 4.365 50.81 16.795 16.415 15.323 14.849 35.77 14.849 58.02v52.565c0 15.798 6.547 22.724 12.714 31.264 2.182 3.036 2.657 6.69-.095 8.966-6.879 5.74-19.119 16.415-25.855 22.393l-.095-.095'
					fill='#000'
				/>
			</g>
		</svg>
	</div>
)

export default function ProductLandingPage({ params }) {
	const { id } = use(params)
	const [product, setProduct] = useState(null)
	const [loading, setLoading] = useState(true)
	const [timeLeft, setTimeLeft] = useState({
		hours: 2,
		minutes: 24,
		seconds: 59,
	})

	useEffect(() => {
		const loadProduct = async () => {
			try {
				setLoading(true)
				const data = await fetchProductById(id)
				if (data) {
					setProduct(data)
				}
			} catch (error) {
				console.error('Failed to load product', error)
			} finally {
				setLoading(false)
			}
		}
		loadProduct()
	}, [id])

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(prev => {
				let { hours, minutes, seconds } = prev
				if (seconds > 0) {
					seconds--
				} else {
					seconds = 59
					if (minutes > 0) {
						minutes--
					} else {
						minutes = 59
						if (hours > 0) {
							hours--
						}
					}
				}
				return { hours, minutes, seconds }
			})
		}, 1000)
		return () => clearInterval(timer)
	}, [])

	if (loading) {
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500'></div>
			</div>
		)
	}

	if (!product) {
		notFound()
	}

	// Calculate savings (guaranteed to be decimals if needed, or integers)
	const savings = (product.rawOriginalPrice - product.rawDiscountPrice).toFixed(
		2,
	)
	const displaySavings = savings.endsWith('.00')
		? savings.slice(0, -3)
		: savings

	return (
		<div className={styles.pageContainer}>
			{/* High Urgency Sticky Top Banner */}
			{product.timer && (
				<div className={styles.stickyBanner}>
					<div className={styles.bannerTitle}>
						<FaFire className={styles.fireIcon} />
						<span>Flash Sale: {product.discount}% OFF</span>
					</div>
					<div className={styles.timerBox}>
						<FaClock className={styles.spinIcon} />
						<span>
							ENDS IN {String(timeLeft.hours).padStart(2, '0')}:
							{String(timeLeft.minutes).padStart(2, '0')}:
							{String(timeLeft.seconds).padStart(2, '0')}
						</span>
					</div>
				</div>
			)}

			<div className={styles.mainContainer}>
				{/* Hero Image Section - Moved to Absolute Top */}
				<div className={styles.heroImageWrap}>
					<div className={styles.imageGlow}></div>

					<div className={styles.saveBadge}>
						<span className={styles.saveBadgeSmall}>Save</span>
						<span>${displaySavings}</span>
					</div>

					<div className={styles.imageContainer}>
						<img
							src={product.image}
							alt={product.name}
							className={styles.productImage}
						/>
					</div>
				</div>

				{/* Review Badge - Moved below image */}
				<div className={styles.reviewBadgeTop}>
					<span className={styles.stars}>
						{[...Array(5)].map((_, i) => (
							<FaStar key={i} />
						))}
					</span>
					{product.rating} ({product.reviews} verified reviews)
				</div>

				{/* At-a-Glance Pricing */}
				<div className={styles.priceContainer}>
					<div className={styles.almostSoldOut}>Almost Sold Out</div>

					<div className={styles.discountPrice}>{product.discountPrice}</div>

					<div className={styles.savingsRow}>
						<span className={styles.originalPrice}>
							{product.originalPrice}
						</span>
						<span className={styles.separator}>|</span>
						<span className={styles.savingsText}>
							You save ${displaySavings}!
						</span>
					</div>
				</div>

				{/* Headline Area - Moved below image */}
				<div className={styles.headerArea}>
					<h1 className={`${styles.mainTitle} ${styles.gradientText}`}>
						{product.name}
					</h1>

					<p className={styles.subtitle}>
						An exclusive offer for our customers. Get yours before we run out of
						stock!
					</p>
				</div>

				{/* Benefits List */}
				<div className={styles.benefitsBox}>
					<div className={styles.benefitsLabel}>Why Choose Us</div>

					<h3 className={styles.benefitsTitle}>
						{product.benefitsTitle || 'Join 10,000+ Happy Customers'}
					</h3>

					<div className={styles.benefitsGrid}>
						{product.benefits.map((benefit, idx) => (
							<div key={idx} className={styles.benefitItem}>
								<div className={styles.benefitIconWrap}>
									<FaCheckCircle className={styles.benefitIcon} />
								</div>
								<span className={styles.benefitText}>{benefit}</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Fixed Sticky CTA Bottom Bar */}
			<div className={styles.stickyBottomBar}>
				<div className={styles.stickyBarInner}>
					<div className={styles.stickyPriceColumn}>
						<span className={styles.stickyDiscount}>
							{product.discountPrice}
						</span>
						<span className={styles.stickyOriginal}>
							{product.originalPrice}
						</span>
					</div>

					<a href={product.link} className={styles.stickyBtnWrap}>
						<div className={styles.stickyBtnInner}>
							<AmazonAppIcon className={styles.amazonIcon} />
							<div className={styles.stickyBtnText}>BUY ON AMAZON</div>
							<FaArrowRight className={styles.arrowRight} />
						</div>
					</a>
				</div>
			</div>
		</div>
	)
}
