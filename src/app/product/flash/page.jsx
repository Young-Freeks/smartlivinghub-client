import Image from 'next/image'
import {
	FaArrowRight,
	FaShieldAlt,
	FaTruck,
	FaHeadset,
	FaCheckCircle,
	FaUsb,
	FaPlay,
	FaCheck,
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
} from 'react-icons/fa'
import './flash.css'

export const metadata = {
	title: 'Flash — Find & Protect ALL Your Memories In ONE Click',
	description:
		'Automatically finds, sorts, and saves up to 60,000 photos and videos across all your devices with just ONE click. Over 1.5 million people use this device.',
	robots: { index: false, follow: true },
	openGraph: {
		title: 'Flash — Find & Protect ALL Your Memories In ONE Click',
		description:
			'Automatically finds, sorts, and saves up to 60,000 photos and videos across all your devices with just ONE click.',
		type: 'website',
	},
	alternates: {
		canonical: 'https://smartlivinghub.info/product/flash',
	},
}

const PRODUCT = {
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

const STEPS = [
	{
		num: '01',
		title: 'Plug It In',
		desc: 'Insert Flash into any USB port on your computer or phone. No software install, no setup.',
		icon: <FaUsb />,
	},
	{
		num: '02',
		title: "Hit 'Go'",
		desc: 'Press one button. Flash instantly scans every folder for photos and videos — even ones you forgot you had.',
		icon: <FaPlay />,
	},
	{
		num: '03',
		title: "You're Done!",
		desc: 'In minutes, thousands of memories are sorted, de-duplicated, and safely backed up.',
		icon: <FaCheck />,
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
							Automatically finds, sorts, and saves up to{' '}
							<strong>60,000 photos and videos</strong> across all your devices with
							just <strong>ONE click</strong>.
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
								src='https://placehold.co/720x720/ec3535/ffffff/png?text=Flash'
								alt='Flash device — find and protect all your memories in one click'
								width={720}
								height={720}
								priority
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
				<div className='container'>
					<div className='flash-section-header'>
						<span className='flash-tag flash-tag-warning'>
							<FaExclamationTriangle /> Memories at risk
						</span>
						<h2 className='flash-section-title'>
							Your photos &amp; videos are scattered — and one crash away from gone
							forever.
						</h2>
						<p className='flash-section-lede'>
							Cloud accounts fill up. Phones break. Computers crash. Backups feel
							complicated, expensive, and scary. Most people never get around to it
							— until it&apos;s too late.
						</p>
					</div>

					<div className='flash-problem-grid'>
						<div className='flash-problem-card'>
							<div className='flash-problem-stat'>65%</div>
							<p>
								of people have lost photos &amp; videos to deletion, hardware failure,
								or software issues.
							</p>
						</div>
						<div className='flash-problem-card'>
							<div className='flash-problem-stat'>
								<FaLock />
							</div>
							<p>
								Cloud subscriptions cost more every month — and your memories stay
								locked behind a password and a paywall.
							</p>
						</div>
						<div className='flash-problem-card'>
							<div className='flash-problem-stat'>
								<FaClock />
							</div>
							<p>
								Manual backups take hours. Sorting through duplicates takes even
								longer. Most people give up halfway through.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Solution */}
			<section className='flash-section flash-solution'>
				<div className='container flash-solution-inner'>
					<div className='flash-solution-media'>
						<Image
							src='https://placehold.co/640x520/111111/ffffff/png?text=One+Click+Backup'
							alt='Flash one-click backup illustration'
							width={640}
							height={520}
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
							Flash does in <strong>minutes</strong> what would take you
							<strong> hours</strong> — automatically.
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
									<strong>Removes duplicates automatically.</strong> No more 12 copies
									of the same photo eating your space.
								</div>
							</li>
							<li>
								<FaCheckCircle />
								<div>
									<strong>Works offline.</strong> Your memories stay yours — stored
									securely, away from hackers and monthly cloud fees.
								</div>
							</li>
							<li>
								<FaCheckCircle />
								<div>
									<strong>Holds up to 120,000 photos &amp; videos.</strong> Plenty of
									room for a lifetime of memories.
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

			{/* Compatibility */}
			<section className='flash-section flash-compat'>
				<div className='container'>
					<div className='flash-section-header flash-section-header-center'>
						<span className='flash-tag'>Works with everything</span>
						<h2 className='flash-section-title'>
							One device. Every phone, every computer, every file type.
						</h2>
						<p className='flash-section-lede'>
							No tech skills needed. Flash automatically detects your device and
							supports <strong>100+ file types</strong> — photos, videos, RAW, and
							more.
						</p>
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
							<div key={step.num} className='flash-step-card'>
								<div className='flash-step-num'>{step.num}</div>
								<div className='flash-step-icon'>{step.icon}</div>
								<h3 className='flash-step-title'>{step.title}</h3>
								<p className='flash-step-desc'>{step.desc}</p>
							</div>
						))}
					</div>

					<div className='flash-steps-cta'>
						<a href={PRODUCT.checkoutHref} className='flash-btn-primary flash-btn-lg'>
							<span>Get Flash — {formatPrice(PRODUCT.price)}</span>
							<FaArrowRight />
						</a>
					</div>
				</div>
			</section>

			{/* Founder */}
			<section className='flash-section flash-founder'>
				<div className='container flash-founder-inner'>
					<div className='flash-founder-media'>
						<Image
							src='https://placehold.co/520x520/f9f9f9/111111/png?text=Founder'
							alt='Mark Oman — Flash founder'
							width={520}
							height={520}
							className='flash-founder-image'
						/>
					</div>
					<div className='flash-founder-content'>
						<span className='flash-tag'>A note from the founder</span>
						<h2 className='flash-section-title'>
							&ldquo;I built this so no one would ever lose their memories
							again.&rdquo;
						</h2>
						<p className='flash-founder-text'>
							Hi, I&apos;m <strong>Mark Oman</strong>, former VP &amp; GM at
							Hewlett-Packard. Years ago, I watched too many friends lose entire
							family albums to a broken phone or a failed hard drive. I knew there
							had to be a simpler way — something so easy that anyone could use it.
						</p>
						<p className='flash-founder-text'>
							That&apos;s why we built Flash from our small office in Haxtun,
							Colorado. Today, more than <strong>1.5 million people</strong> in over{' '}
							<strong>100 countries</strong> trust it to protect what matters most.
						</p>
						<div className='flash-founder-sign'>— Mark Oman, Founder</div>
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
							Try Flash for 30 days. If you don&apos;t love it, send it back for a
							full refund — no questions asked.
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
			<div className='flash-sticky-cta' role='complementary' aria-label='Buy Flash'>
				<div className='container flash-sticky-inner'>
					<div className='flash-sticky-product'>
						<div className='flash-sticky-thumb'>
							<Image
								src='https://placehold.co/96x96/ec3535/ffffff/png?text=F'
								alt='Flash'
								width={96}
								height={96}
							/>
						</div>
						<div className='flash-sticky-info'>
							<div className='flash-sticky-name'>Flash — One-Click Backup</div>
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
