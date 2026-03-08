'use client'

import React, { useState, useEffect } from 'react'
import {
	FaCheckCircle,
	FaStar,
	FaAmazon,
	FaClock,
	FaShieldAlt,
	FaTruck,
	FaArrowRight,
	FaFire,
} from 'react-icons/fa'
import styles from './product.module.css'

export default function ProductLandingPage() {
	const [timeLeft, setTimeLeft] = useState({
		hours: 2,
		minutes: 24,
		seconds: 59,
	})

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

	const product = {
		name: 'Smart Coffee Mug Pro',
		originalPrice: '$129.99',
		discountPrice: '$79.99',
		rating: 4.9,
		reviews: 1284,
		image:
			'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=1000',
		benefits: [
			'Keeps drinks perfectly hot for hours',
			'App-controlled temperature',
			'Auto-sleep & wake up feature',
			'Premium scratch-resistant ceramic',
		],
	}

	return (
		<div className={styles.pageContainer}>
			{/* High Urgency Sticky Top Banner */}
			<div className={styles.stickyBanner}>
				<div className={styles.bannerTitle}>
					<FaFire className={styles.fireIcon} />
					<span>Flash Sale: 40% OFF</span>
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

			<div className={styles.mainContainer}>
				{/* Review Badge First (Mobile Friendly) */}
				<div className={styles.reviewBadgeTop}>
					<span className={styles.stars}>
						{[...Array(5)].map((_, i) => (
							<FaStar key={i} />
						))}
					</span>
					{product.rating} ({product.reviews} verified reviews)
				</div>

				{/* Hero Image Section - Moved Above The Fold */}
				<div className={styles.heroImageWrap}>
					<div className={styles.imageGlow}></div>

					<div className={styles.saveBadge}>
						<span className={styles.saveBadgeSmall}>Save</span>
						<span>$50</span>
					</div>

					<div className={styles.imageContainer}>
						<img
							src={product.image}
							alt={product.name}
							className={styles.productImage}
						/>

						{/* Trust Badges Overlay */}
						<div className={styles.trustBadgesOverlay}>
							<div className={styles.trustBadge}>
								<FaShieldAlt className={styles.trustIconGreen} />
								1-Year Warranty
							</div>
							<div
								className={`${styles.trustBadge} ${styles.trustBadgeHiddenMobile}`}
							>
								<FaTruck className={styles.trustIconBlue} />
								Fast Free Delivery
							</div>
						</div>
					</div>
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
						<span className={styles.savingsText}>You save $50.00!</span>
					</div>
				</div>

				{/* Headline Area - Moved below image */}
				<div className={styles.headerArea}>
					<h1 className={styles.mainTitle}>
						Stop Drinking Cold Coffee.
						<br />
						<span className={styles.gradientText}>Experience Perfection.</span>
					</h1>

					<p className={styles.subtitle}>
						The world's finest smart mug is now on a limited-time sale. Get
						yours before we run out of stock!
					</p>
				</div>

				{/* Benefits List */}
				<div className={styles.benefitsBox}>
					<div className={styles.benefitsLabel}>Why Choose Us</div>

					<h3 className={styles.benefitsTitle}>Join 10,000+ Happy Customers</h3>

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

					<a
						href='https://amazon.com/dp/dummy?utm_source=fb&utm_medium=banner&utm_campaign=flash'
						className={styles.stickyBtnWrap}
					>
						<div className={styles.amazonBtnBorder}></div>
						<div className={styles.amazonBtnShimmerContainer}>
							<div className={styles.amazonBtnShimmer}></div>
						</div>

						<div className={styles.stickyBtnInner}>
							<FaAmazon className={styles.amazonIcon} />
							<div className={styles.stickyBtnText}>BUY ON AMAZON</div>
							<FaArrowRight className={styles.arrowRight} />
						</div>
					</a>
				</div>
			</div>
		</div>
	)
}
