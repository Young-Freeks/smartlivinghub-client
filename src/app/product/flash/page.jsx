import Image from 'next/image'
import {
	FaArrowRight,
	FaShieldAlt,
	FaTruck,
	FaHeadset,
	FaCheckCircle,
	FaWindows,
	FaApple,
	FaAndroid,
	FaTabletAlt,
	FaFolderOpen,
	FaFileAlt,
	FaExclamationTriangle,
	FaLock,
	FaClock,
	FaRegHeart,
	FaStar,
} from 'react-icons/fa'

import heroLifestyle from '../../../assets/Banner_192125 (3024x4032).jpg'
import problemCloudFull from '../../../assets/Banner_192126 (3804x2103).jpg'
import compatIllustration from '../../../assets/Banner_192127 (2536x1402).jpg'
import productFamily from '../../../assets/Banner_192128 (2400x2400).jpg'
import variant128 from '../../../assets/Banner_192129 (1620x1620).png'
import variant32 from '../../../assets/Banner_192130 (1620x1620).png'
import variant512 from '../../../assets/Banner_192131 (1620x1620).png'
import productTopDown from '../../../assets/Banner_192133 (1920x2560).png'
import step1Image from '../../../assets/Banner_192148 (3840x3840).png'
import step2Image from '../../../assets/Banner_192146 (3840x3840).png'
import step3Image from '../../../assets/Banner_192147 (3840x3840).png'
import review1 from '../../../assets/Banner_192135 (712x540).png'
import review2 from '../../../assets/Banner_192136 (716x606).png'
import review3 from '../../../assets/Banner_192137 (712x644).png'
import review4 from '../../../assets/Banner_192138 (722x534).png'
import review5 from '../../../assets/Banner_192140 (714x522).png'
import review6 from '../../../assets/Banner_192141 (708x566).png'
import review7 from '../../../assets/Banner_192142 (710x500).png'
import review8 from '../../../assets/Banner_192143 (716x730).png'

import './flash.css'

export const metadata = {
	title: 'ThePhotoStick Omni — Find & Protect ALL Your Memories In ONE Click',
	description:
		'Automatically finds, sorts, and saves up to 60,000 photos and videos across all your devices with just ONE click. Over 1.5 million people use this device.',
	robots: { index: false, follow: true },
	openGraph: {
		title: 'ThePhotoStick Omni — Find & Protect ALL Your Memories In ONE Click',
		description:
			'Automatically finds, sorts, and saves up to 60,000 photos and videos across all your devices with just ONE click.',
		type: 'website',
	},
	alternates: {
		canonical: 'https://smartlivinghub.info/product/flash',
	},
}

const PRODUCT = {
	name: 'ThePhotoStick Omni',
	price: 54,
	oldPrice: 99,
	currency: '$',
	cta: 'ORDER NOW',
	checkoutHref: '#order',
}

const COMPATIBILITY = [
	{ icon: <FaWindows />, title: 'Windows & Mac', desc: 'Works on every modern PC and Apple computer.' },
	{ icon: <FaApple />, title: 'iPhone & iPad', desc: 'Backs up your iOS photos and videos in seconds.' },
	{ icon: <FaAndroid />, title: 'Android phones', desc: 'Compatible with Galaxy and all Android devices.' },
	{ icon: <FaTabletAlt />, title: 'Tablets', desc: 'iPad, Galaxy Tab — backups made effortless.' },
	{ icon: <FaFileAlt />, title: '100+ file types', desc: 'Supports every common photo and video format.' },
	{ icon: <FaFolderOpen />, title: 'Auto-organize', desc: 'Sorts files into folders and removes duplicates.' },
]

const VARIANTS = [
	{ image: variant32, label: '32 GB', sub: 'Up to 15,000 photos' },
	{ image: variant128, label: '128 GB', sub: 'Up to 60,000 photos' },
	{ image: variant512, label: '512 GB', sub: 'Up to 240,000 photos' },
]

const STEPS = [
	{
		image: step1Image,
		alt: 'Step 1 — Download the free ThePhotoStick Omni app',
	},
	{
		image: step2Image,
		alt: 'Step 2 — Plug in the adapter to your phone',
	},
	{
		image: step3Image,
		alt: 'Step 3 — Safely transfer files to your computer',
	},
]

const TRUST_BADGES = [
	{
		icon: <FaShieldAlt />,
		title: '100% Satisfaction Guarantee',
		desc: '30-day money back guarantee — risk-free, hassle-free.',
	},
	{
		icon: <FaTruck />,
		title: 'Fast Shipping',
		desc: 'Quick delivery to over 100 countries worldwide.',
	},
	{
		icon: <FaHeadset />,
		title: 'World-Class Support',
		desc: 'Real humans, fast and friendly help whenever you need it.',
	},
]

const REVIEWS = [review1, review2, review3, review4, review5, review6, review7, review8]

const formatPrice = value => `${PRODUCT.currency}${value}`

export default function FlashLandingPage() {
	return (
		<div className='flash-page'>
			{/* Hero */}
			<section className='flash-hero'>
				<div className='container flash-hero-inner'>
					<div className='flash-hero-content'>
						<span className='flash-eyebrow'>
							<FaRegHeart /> Over 1.5 Million People Use This Device
						</span>
						<h1 className='flash-hero-title'>
							Find &amp; Protect <span className='flash-accent'>ALL</span> Your
							Memories In <span className='flash-accent'>ONE</span> Click!
						</h1>
						<p className='flash-hero-sub'>
							{PRODUCT.name} automatically finds, sorts, and saves up to{' '}
							<strong>60,000 photos and videos</strong> across all your devices
							with just <strong>ONE click</strong>.
						</p>

						<ul className='flash-hero-bullets'>
							<li>
								<FaCheckCircle /> Works on Mac, Windows, iPhone &amp; Android
							</li>
							<li>
								<FaCheckCircle /> No software to install — just plug in &amp; go
							</li>
							<li>
								<FaCheckCircle /> Removes duplicates &amp; sorts automatically
							</li>
						</ul>

						<div className='flash-hero-cta-row'>
							<a href={PRODUCT.checkoutHref} className='flash-btn-primary flash-btn-lg'>
								<span>{PRODUCT.cta}</span>
								<FaArrowRight />
							</a>
							<div className='flash-hero-price'>
								<span className='flash-price-old'>{formatPrice(PRODUCT.oldPrice)}</span>
								<span className='flash-price-new'>{formatPrice(PRODUCT.price)}</span>
							</div>
						</div>

						<div className='flash-hero-trust'>
							<FaShieldAlt /> 30-Day Money Back Guarantee
							<span className='flash-dot'>•</span>
							<FaTruck /> Fast Shipping
						</div>
					</div>

					<div className='flash-hero-media'>
						<div className='flash-hero-image-ring' />
						<div className='flash-hero-image-wrap'>
							<Image
								src={heroLifestyle}
								alt='Woman backing up phone photos with ThePhotoStick Omni'
								placeholder='blur'
								priority
								sizes='(max-width: 1024px) 90vw, 520px'
								className='flash-hero-image'
							/>
						</div>
						<div className='flash-hero-badge'>
							<strong>1.5M+</strong>
							<span>Happy users</span>
						</div>
					</div>
				</div>
			</section>

			{/* Problem */}
			<section className='flash-section flash-problem'>
				<div className='container flash-problem-inner'>
					<div className='flash-problem-media'>
						<Image
							src={problemCloudFull}
							alt='Phone showing a Cloud Storage Is Full alert'
							placeholder='blur'
							sizes='(max-width: 1024px) 90vw, 520px'
							className='flash-problem-image'
						/>
					</div>

					<div>
						<div className='flash-section-header'>
							<span className='flash-tag flash-tag-warning'>
								<FaExclamationTriangle /> Memories at risk
							</span>
							<h2 className='flash-section-title'>
								Your photos &amp; videos are scattered — and one crash away from
								gone forever.
							</h2>
							<p className='flash-section-lede'>
								Cloud accounts fill up. Phones break. Computers crash. Backups
								feel complicated, expensive, and scary. Most people never get
								around to it — until it&apos;s too late.
							</p>
						</div>

						<div className='flash-problem-grid'>
							<div className='flash-problem-card'>
								<div className='flash-problem-stat'>65%</div>
								<p>
									of people have lost photos &amp; videos to deletion, hardware
									failure, or software issues.
								</p>
							</div>
							<div className='flash-problem-card'>
								<div className='flash-problem-stat'>
									<FaLock />
								</div>
								<p>
									Cloud subscriptions cost more every month — and your memories
									stay locked behind a password and a paywall.
								</p>
							</div>
							<div className='flash-problem-card'>
								<div className='flash-problem-stat'>
									<FaClock />
								</div>
								<p>
									Manual backups take hours. Sorting through duplicates takes
									even longer. Most people give up halfway through.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Solution */}
			<section className='flash-section flash-solution'>
				<div className='container flash-solution-inner'>
					<div className='flash-solution-media'>
						<Image
							src={productFamily}
							alt='ThePhotoStick Omni product family'
							placeholder='blur'
							sizes='(max-width: 1024px) 90vw, 540px'
							className='flash-solution-image'
						/>
					</div>
					<div className='flash-solution-content'>
						<span className='flash-tag flash-tag-success'>
							<FaCheckCircle /> The Solution
						</span>
						<h2 className='flash-section-title'>
							Photo &amp; Video Backup Made Easy
						</h2>
						<p className='flash-section-lede'>
							{PRODUCT.name} does in <strong>minutes</strong> what would take
							you <strong>hours</strong> — automatically.
						</p>
						<ul className='flash-solution-list'>
							<li>
								<FaCheckCircle />
								<div>
									<strong>Saves you hours.</strong> Sorts thousands of photos and
									videos in minutes — no manual searching required.
								</div>
							</li>
							<li>
								<FaCheckCircle />
								<div>
									<strong>Removes duplicates automatically.</strong> No more 12
									copies of the same photo eating your space.
								</div>
							</li>
							<li>
								<FaCheckCircle />
								<div>
									<strong>Works offline.</strong> Your memories stay yours —
									stored securely, away from hackers and monthly cloud fees.
								</div>
							</li>
							<li>
								<FaCheckCircle />
								<div>
									<strong>Holds up to 240,000 photos &amp; videos.</strong>{' '}
									Plenty of room for a lifetime of memories.
								</div>
							</li>
						</ul>
						<a href={PRODUCT.checkoutHref} className='flash-btn-primary'>
							<span>{PRODUCT.cta}</span>
							<FaArrowRight />
						</a>
					</div>
				</div>
			</section>

			{/* Variants */}
			<section className='flash-section flash-variants'>
				<div className='container'>
					<div className='flash-section-header flash-section-header-center'>
						<span className='flash-tag'>Pick your size</span>
						<h2 className='flash-section-title'>
							Three capacities. One simple promise.
						</h2>
						<p className='flash-section-lede'>
							Whether you&apos;re backing up one phone or a lifetime of family
							memories, there&apos;s a {PRODUCT.name} for you.
						</p>
					</div>

					<div className='flash-variants-grid'>
						{VARIANTS.map(v => (
							<div key={v.label} className='flash-variant-card'>
								<div className='flash-variant-image-wrap'>
									<Image
										src={v.image}
										alt={`ThePhotoStick Omni ${v.label}`}
										placeholder='blur'
										sizes='(max-width: 640px) 90vw, 320px'
										className='flash-variant-image'
									/>
								</div>
								<h3 className='flash-variant-label'>{v.label}</h3>
								<p className='flash-variant-sub'>{v.sub}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Compatibility */}
			<section className='flash-section flash-compat'>
				<div className='container'>
					<div className='flash-section-header flash-section-header-center'>
						<span className='flash-tag'>Works with everything</span>
						<h2 className='flash-section-title'>
							One device. Every phone, every computer, every file type.
						</h2>
						<p className='flash-section-lede'>
							No tech skills needed. {PRODUCT.name} automatically detects your
							device and supports <strong>100+ file types</strong> — photos,
							videos, RAW, and more.
						</p>
					</div>

					<div className='flash-compat-banner'>
						<Image
							src={compatIllustration}
							alt='ThePhotoStick Omni working on phone and laptop across iOS, Android, Mac and Windows'
							placeholder='blur'
							sizes='(max-width: 1024px) 90vw, 960px'
							className='flash-compat-banner-image'
						/>
					</div>

					<div className='flash-compat-grid'>
						{COMPATIBILITY.map(item => (
							<div key={item.title} className='flash-compat-card'>
								<div className='flash-compat-icon'>{item.icon}</div>
								<h3 className='flash-compat-title'>{item.title}</h3>
								<p className='flash-compat-desc'>{item.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* How it works */}
			<section className='flash-section flash-steps'>
				<div className='container'>
					<div className='flash-section-header flash-section-header-center'>
						<span className='flash-tag'>How it works</span>
						<h2 className='flash-section-title'>3 Easy Steps</h2>
						<p className='flash-section-lede'>
							No software installs. No subscriptions. No tech support calls.
						</p>
					</div>

					<div className='flash-steps-grid'>
						{STEPS.map(step => (
							<div key={step.alt} className='flash-step-card'>
								<Image
									src={step.image}
									alt={step.alt}
									placeholder='blur'
									sizes='(max-width: 1024px) 90vw, 360px'
									className='flash-step-image'
								/>
							</div>
						))}
					</div>

					<div className='flash-steps-cta'>
						<a href={PRODUCT.checkoutHref} className='flash-btn-primary flash-btn-lg'>
							<span>Get {PRODUCT.name} — {formatPrice(PRODUCT.price)}</span>
							<FaArrowRight />
						</a>
					</div>
				</div>
			</section>

			{/* Reviews */}
			<section className='flash-section flash-reviews'>
				<div className='container'>
					<div className='flash-section-header flash-section-header-center'>
						<span className='flash-tag'>
							<FaStar /> 5-star reviews
						</span>
						<h2 className='flash-section-title'>
							Loved by 1.5 million people worldwide
						</h2>
						<p className='flash-section-lede'>
							Real reviews from verified buyers — straight from our store.
						</p>
					</div>

					<div className='flash-reviews-grid'>
						{REVIEWS.map((src, i) => (
							<div key={i} className='flash-review-card'>
								<Image
									src={src}
									alt={`Verified 5-star review #${i + 1} for ${PRODUCT.name}`}
									placeholder='blur'
									sizes='(max-width: 640px) 90vw, 360px'
									className='flash-review-image'
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Story */}
			<section className='flash-section flash-story'>
				<div className='container flash-story-inner'>
					<div className='flash-story-media'>
						<Image
							src={productTopDown}
							alt='ThePhotoStick Omni device with universal adapter'
							placeholder='blur'
							sizes='(max-width: 1024px) 90vw, 460px'
							className='flash-story-image'
						/>
					</div>
					<div className='flash-story-content'>
						<span className='flash-tag'>Why we built it</span>
						<h2 className='flash-section-title'>
							&ldquo;So no one would ever lose their memories again.&rdquo;
						</h2>
						<p className='flash-story-text'>
							We watched too many friends lose entire family albums to a broken
							phone or a failed hard drive. We knew there had to be a simpler
							way — something so easy that anyone could use it.
						</p>
						<p className='flash-story-text'>
							That&apos;s why we built {PRODUCT.name}. Today, more than{' '}
							<strong>1.5 million people</strong> in over{' '}
							<strong>100 countries</strong> trust it to protect what matters
							most.
						</p>
						<div className='flash-story-sign'>— The ThePhotoStick Omni Team</div>
					</div>
				</div>
			</section>

			{/* Trust & Guarantee */}
			<section className='flash-section flash-trust'>
				<div className='container'>
					<div className='flash-section-header flash-section-header-center'>
						<span className='flash-tag'>Risk-free</span>
						<h2 className='flash-section-title'>You&apos;re fully protected.</h2>
						<p className='flash-section-lede'>
							Try {PRODUCT.name} for 30 days. If you don&apos;t love it, send it
							back for a full refund — no questions asked.
						</p>
					</div>

					<div className='flash-trust-grid'>
						{TRUST_BADGES.map(badge => (
							<div key={badge.title} className='flash-trust-card'>
								<div className='flash-trust-icon'>{badge.icon}</div>
								<h3 className='flash-trust-title'>{badge.title}</h3>
								<p className='flash-trust-desc'>{badge.desc}</p>
							</div>
						))}
					</div>

					<div id='order' className='flash-final-cta'>
						<div className='flash-final-cta-inner'>
							<div className='flash-final-cta-text'>
								<h3>Protect your memories today.</h3>
								<p>
									Join 1.5 million people who never worry about losing a photo
									again.
								</p>
							</div>
							<div className='flash-final-cta-action'>
								<div className='flash-hero-price'>
									<span className='flash-price-old'>
										{formatPrice(PRODUCT.oldPrice)}
									</span>
									<span className='flash-price-new'>
										{formatPrice(PRODUCT.price)}
									</span>
								</div>
								<a href={PRODUCT.checkoutHref} className='flash-btn-primary flash-btn-lg'>
									<span>{PRODUCT.cta}</span>
									<FaArrowRight />
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Sticky CTA */}
			<div className='flash-sticky-cta' role='complementary' aria-label={`Buy ${PRODUCT.name}`}>
				<div className='container flash-sticky-inner'>
					<div className='flash-sticky-product'>
						<div className='flash-sticky-thumb'>
							<Image
								src={variant512}
								alt={PRODUCT.name}
								placeholder='blur'
								sizes='56px'
							/>
						</div>
						<div className='flash-sticky-info'>
							<div className='flash-sticky-name'>{PRODUCT.name} — One-Click Backup</div>
							<div className='flash-sticky-price'>
								<span className='flash-price-old'>
									{formatPrice(PRODUCT.oldPrice)}
								</span>
								<span className='flash-price-new'>
									{formatPrice(PRODUCT.price)}
								</span>
							</div>
						</div>
					</div>
					<a href={PRODUCT.checkoutHref} className='flash-btn-primary flash-btn-sticky'>
						<span>Buy Now</span>
						<FaArrowRight />
					</a>
				</div>
			</div>
		</div>
	)
}
