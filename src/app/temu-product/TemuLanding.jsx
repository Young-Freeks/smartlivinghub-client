'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
	FaBolt,
	FaClock,
	FaStar,
	FaCheckCircle,
	FaArrowRight,
	FaShieldAlt,
	FaTruck,
	FaUndo,
	FaFire,
	FaHeart,
	FaUsers,
	FaGem,
	FaPlus,
	FaMinus,
	FaTimes,
	FaCheck,
} from 'react-icons/fa'
import { fetchTemuProduct } from '../../services/api'
import styles from './temu.module.css'

// ---------- Helpers ----------
const formatPrice = value => {
	if (value == null) return ''
	return `$${Number(value).toFixed(2)}`
}

const useReveal = (threshold = 0.15) => {
	const ref = useRef(null)
	const [visible, setVisible] = useState(false)
	useEffect(() => {
		if (!ref.current || visible) return
		const node = ref.current
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setVisible(true)
						observer.disconnect()
					}
				})
			},
			{ threshold },
		)
		observer.observe(node)
		return () => observer.disconnect()
	}, [threshold, visible])
	return [ref, visible]
}

const useCountdown = (initial = { hours: 2, minutes: 47, seconds: 13 }) => {
	const [time, setTime] = useState(initial)
	useEffect(() => {
		const id = setInterval(() => {
			setTime(prev => {
				let { hours, minutes, seconds } = prev
				if (seconds > 0) seconds--
				else {
					seconds = 59
					if (minutes > 0) minutes--
					else {
						minutes = 59
						if (hours > 0) hours--
					}
				}
				return { hours, minutes, seconds }
			})
		}, 1000)
		return () => clearInterval(id)
	}, [])
	return time
}

const pad = n => String(n).padStart(2, '0')

// ---------- Sub-components ----------

const ScrollProgress = () => {
	const [progress, setProgress] = useState(0)
	useEffect(() => {
		const handle = () => {
			const scrollTop = window.scrollY
			const docHeight = document.body.scrollHeight - window.innerHeight
			const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
			setProgress(pct)
		}
		handle()
		window.addEventListener('scroll', handle, { passive: true })
		return () => window.removeEventListener('scroll', handle)
	}, [])
	return (
		<div className={styles.scrollProgress}>
			<div
				className={styles.scrollProgressBar}
				style={{ width: `${progress}%` }}
			/>
		</div>
	)
}

const UrgencyBar = ({ discount }) => {
	const { hours, minutes, seconds } = useCountdown()
	return (
		<div className={styles.urgencyBar}>
			<div className={styles.urgencyInner}>
				<div className={styles.urgencyLeft}>
					<FaBolt className={styles.urgencyIcon} />
					<span className={styles.urgencyLabel}>
						ВОГНЯНА ПРОПОЗИЦІЯ · <b>-{discount}%</b>
					</span>
				</div>
				<div className={styles.urgencyRight}>
					<FaClock className={styles.urgencyClock} />
					<span className={styles.urgencyText}>Закінчується через</span>
					<div className={styles.urgencyCountdown}>
						<span>{pad(hours)}</span>
						<em>:</em>
						<span>{pad(minutes)}</span>
						<em>:</em>
						<span>{pad(seconds)}</span>
					</div>
				</div>
			</div>
			<div className={styles.urgencyShimmer} />
		</div>
	)
}

const LIVE_TOASTS = [
	{ name: 'Олег', city: 'Київ', mins: 2 },
	{ name: 'Марина', city: 'Львів', mins: 4 },
	{ name: 'Андрій', city: 'Одеса', mins: 7 },
	{ name: 'Софія', city: 'Харків', mins: 9 },
	{ name: 'Тарас', city: 'Дніпро', mins: 12 },
	{ name: 'Юлія', city: 'Вінниця', mins: 15 },
	{ name: 'Ігор', city: 'Полтава', mins: 18 },
	{ name: 'Оксана', city: 'Чернівці', mins: 22 },
]

const LiveToast = () => {
	const [idx, setIdx] = useState(0)
	const [visible, setVisible] = useState(false)
	useEffect(() => {
		let hideTimer
		let showTimer
		const loop = () => {
			setVisible(true)
			hideTimer = setTimeout(() => setVisible(false), 4500)
			showTimer = setTimeout(() => {
				setIdx(i => (i + 1) % LIVE_TOASTS.length)
				loop()
			}, 8000)
		}
		const first = setTimeout(loop, 3000)
		return () => {
			clearTimeout(first)
			clearTimeout(hideTimer)
			clearTimeout(showTimer)
		}
	}, [])
	const toast = LIVE_TOASTS[idx]
	return (
		<div
			className={`${styles.liveToast} ${visible ? styles.liveToastShown : ''}`}
			aria-hidden={!visible}
		>
			<div className={styles.liveToastIcon}>
				<FaCheck />
			</div>
			<div className={styles.liveToastBody}>
				<div className={styles.liveToastTitle}>
					<b>{toast.name}</b> з міста <b>{toast.city}</b>
				</div>
				<div className={styles.liveToastMeta}>
					щойно оформив замовлення · {toast.mins} хв тому
				</div>
			</div>
			<span className={styles.liveToastPulse} />
		</div>
	)
}

const TrustRow = () => (
	<div className={styles.trustRow}>
		<div className={styles.trustItem}>
			<FaShieldAlt />
			<span>Офіційний постачальник</span>
		</div>
		<div className={styles.trustItem}>
			<FaTruck />
			<span>Швидка доставка</span>
		</div>
		<div className={styles.trustItem}>
			<FaUndo />
			<span>Повернення 30 днів</span>
		</div>
	</div>
)

const StockBar = () => {
	const [ref, visible] = useReveal(0.3)
	const percent = 17
	return (
		<section ref={ref} className={styles.stockSection}>
			<div className={styles.container}>
				<div className={`${styles.stockCard} ${visible ? styles.inView : ''}`}>
					<div className={styles.stockHeader}>
						<FaFire className={styles.stockFire} />
						<div className={styles.stockHeaderText}>
							<div className={styles.stockTitle}>
								Майже розкупили! Залишилось {percent}% на складі
							</div>
							<div className={styles.stockSub}>
								Товар швидко закінчується — не пропусти свою знижку
							</div>
						</div>
					</div>
					<div className={styles.stockBarWrap}>
						<div
							className={styles.stockBarFill}
							style={{ width: visible ? `${percent}%` : '0%' }}
						/>
						<div className={styles.stockMarker} style={{ left: `${percent}%` }}>
							<span>Ти тут</span>
						</div>
					</div>
					<div className={styles.stockLegend}>
						<span>0%</span>
						<span>100% розкуплено</span>
					</div>
				</div>
			</div>
		</section>
	)
}

const BenefitsSection = ({ benefitsTitle, benefits }) => {
	const [ref, visible] = useReveal(0.15)
	return (
		<section ref={ref} className={styles.benefitsSection}>
			<div className={styles.container}>
				<div className={styles.sectionEyebrow}>
					<FaGem /> <span>Чому саме цей товар</span>
				</div>
				<h2 className={styles.sectionTitle}>
					{benefitsTitle || 'Понад 10 000 задоволених клієнтів'}
				</h2>
				<div
					className={`${styles.benefitsGrid} ${visible ? styles.inView : ''}`}
				>
					{benefits.map((benefit, idx) => (
						<div
							key={idx}
							className={styles.benefitCard}
							style={{ '--delay': `${idx * 0.12}s` }}
						>
							<div className={styles.benefitNumber}>0{idx + 1}</div>
							<div className={styles.benefitIcon}>
								<FaCheckCircle />
							</div>
							<p className={styles.benefitText}>{benefit}</p>
							<div className={styles.benefitCorner} />
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

const REVIEWS = [
	{
		name: 'Наталія К.',
		text: 'Замовлення прийшло швидше, ніж очікувала. Якість — супер!',
		stars: 5,
	},
	{
		name: 'Володимир Т.',
		text: 'Саме те, що шукав. Ціна приємно здивувала.',
		stars: 5,
	},
	{
		name: 'Ірина М.',
		text: 'Вже друге замовлення. Рекомендую всім!',
		stars: 5,
	},
	{
		name: 'Дмитро Б.',
		text: 'Працює відмінно. Доставка без нарікань.',
		stars: 5,
	},
	{
		name: 'Анастасія Р.',
		text: 'Не пошкодувала жодної копійки. Все як обіцяли.',
		stars: 5,
	},
	{
		name: 'Максим Л.',
		text: 'Якість на висоті. Куплю ще для друзів.',
		stars: 5,
	},
]

const ReviewsMarquee = () => (
	<section className={styles.reviewsSection}>
		<div className={styles.reviewsHeader}>
			<div className={styles.sectionEyebrow}>
				<FaHeart /> <span>Реальні відгуки</span>
			</div>
			<h2 className={styles.sectionTitle}>
				Людям подобається — і вони про це пишуть
			</h2>
		</div>
		<div className={styles.marquee}>
			<div className={styles.marqueeTrack}>
				{[...REVIEWS, ...REVIEWS].map((r, i) => (
					<div key={i} className={styles.reviewCard}>
						<div className={styles.reviewStars}>
							{Array.from({ length: r.stars }).map((_, n) => (
								<FaStar key={n} />
							))}
						</div>
						<p className={styles.reviewText}>«{r.text}»</p>
						<div className={styles.reviewAuthor}>— {r.name}</div>
					</div>
				))}
			</div>
		</div>
	</section>
)

const COMPARISONS = {
	without: [
		'Переплачуєш у місцевих магазинах',
		'Низька якість без гарантії',
		'Довга доставка тижнями',
		'Жодного сервісу підтримки',
	],
	with: [
		'Ціна нижча на 40% від роздрібної',
		'Сертифікована якість та контроль',
		'Швидка міжнародна доставка',
		'Підтримка 24/7 українською',
	],
}

const ComparisonSection = () => {
	const [ref, visible] = useReveal(0.2)
	return (
		<section ref={ref} className={styles.comparisonSection}>
			<div className={styles.container}>
				<div className={styles.sectionEyebrow}>
					<FaUsers /> <span>Чому саме ми</span>
				</div>
				<h2 className={styles.sectionTitle}>З нами vs без нас</h2>
				<div
					className={`${styles.comparisonGrid} ${visible ? styles.inView : ''}`}
				>
					<div className={`${styles.compCard} ${styles.compCardBad}`}>
						<div className={styles.compHeader}>
							<FaTimes /> <span>Без нас</span>
						</div>
						<ul className={styles.compList}>
							{COMPARISONS.without.map((item, i) => (
								<li key={i}>
									<FaTimes className={styles.compBadIcon} />
									{item}
								</li>
							))}
						</ul>
					</div>
					<div className={`${styles.compCard} ${styles.compCardGood}`}>
						<div className={styles.compHeader}>
							<FaCheck /> <span>З нами</span>
						</div>
						<ul className={styles.compList}>
							{COMPARISONS.with.map((item, i) => (
								<li key={i}>
									<FaCheck className={styles.compGoodIcon} />
									{item}
								</li>
							))}
						</ul>
						<div className={styles.compCardGoodGlow} />
					</div>
				</div>
			</div>
		</section>
	)
}

const FAQS = [
	{
		q: 'Чи справді ціна зі знижкою діє тільки сьогодні?',
		a: 'Так, акційна ціна активна обмежений час і може повернутись до попередньої у будь-який момент після завершення таймера.',
	},
	{
		q: 'Скільки триває доставка?',
		a: 'Стандартна доставка займає від 7 до 14 днів залежно від регіону. Ми надішлемо трек-номер одразу після відправлення.',
	},
	{
		q: 'Як повернути товар, якщо не підійде?',
		a: 'Ти маєш 30 днів на повернення з моменту отримання. Повний зворот коштів без зайвих питань.',
	},
	{
		q: 'Це оригінальний товар?',
		a: 'Так. Ми працюємо тільки з перевіреними постачальниками та маємо усі сертифікати якості.',
	},
]

const FaqSection = () => {
	const [open, setOpen] = useState(0)
	const [ref, visible] = useReveal(0.2)
	return (
		<section ref={ref} className={styles.faqSection}>
			<div className={styles.container}>
				<div className={styles.sectionEyebrow}>
					<FaShieldAlt /> <span>Відповіді на питання</span>
				</div>
				<h2 className={styles.sectionTitle}>Тобі має бути спокійно</h2>
				<div className={`${styles.faqList} ${visible ? styles.inView : ''}`}>
					{FAQS.map((f, i) => {
						const active = open === i
						return (
							<button
								key={i}
								type='button'
								className={`${styles.faqItem} ${active ? styles.faqItemOpen : ''}`}
								onClick={() => setOpen(active ? -1 : i)}
							>
								<div className={styles.faqRow}>
									<span className={styles.faqQ}>{f.q}</span>
									<span className={styles.faqToggle}>
										{active ? <FaMinus /> : <FaPlus />}
									</span>
								</div>
								<div className={styles.faqAnswer}>
									<p>{f.a}</p>
								</div>
							</button>
						)
					})}
				</div>
			</div>
		</section>
	)
}

const FinalCta = ({ product }) => {
	const [ref, visible] = useReveal(0.2)
	return (
		<section ref={ref} className={styles.finalSection}>
			<div
				className={`${styles.finalInner} ${visible ? styles.inView : ''}`}
			>
				<div className={styles.finalBadge}>
					<FaFire /> <span>ОСТАННІЙ ШАНС</span>
				</div>
				<h2 className={styles.finalTitle}>
					Знижка <span className={styles.finalPercent}>-{product.discount}%</span>{' '}
					вже зникає
				</h2>
				<p className={styles.finalSub}>
					Натисни кнопку нижче, щоб забрати товар за найкращою ціною, поки
					таймер не збіг.
				</p>
				<div className={styles.finalPriceRow}>
					<span className={styles.finalOldPrice}>
						{formatPrice(product.oldPrice)}
					</span>
					<span className={styles.finalNewPrice}>
						{formatPrice(product.price)}
					</span>
				</div>
				<a
					href={product.link}
					target='_blank'
					rel='noopener noreferrer sponsored'
					className={styles.megaCta}
				>
					<span className={styles.megaCtaRing} />
					<span className={styles.megaCtaRing2} />
					<span className={styles.megaCtaText}>
						Забрати зі знижкою -{product.discount}%
					</span>
					<span className={styles.megaCtaArrow}>
						<FaArrowRight />
					</span>
				</a>
				<div className={styles.finalNote}>
					<FaShieldAlt /> Безпечне оформлення · Повернення 30 днів
				</div>
			</div>
		</section>
	)
}

const StickyMobileBar = ({ product }) => (
	<div className={styles.stickyBottom}>
		<div className={styles.stickyBottomInner}>
			<div className={styles.stickyPrice}>
				<span className={styles.stickyOld}>{formatPrice(product.oldPrice)}</span>
				<span className={styles.stickyNew}>{formatPrice(product.price)}</span>
			</div>
			<a
				href={product.link}
				target='_blank'
				rel='noopener noreferrer sponsored'
				className={styles.stickyBtn}
			>
				<span>Забрати -{product.discount}%</span>
				<FaArrowRight />
			</a>
		</div>
	</div>
)

// ---------- Hero ----------

const Hero = ({ product }) => {
	const tiltRef = useRef(null)

	const handleTilt = useCallback(e => {
		const node = tiltRef.current
		if (!node) return
		const rect = node.getBoundingClientRect()
		const x = (e.clientX - rect.left) / rect.width - 0.5
		const y = (e.clientY - rect.top) / rect.height - 0.5
		node.style.setProperty('--tilt-x', `${-y * 10}deg`)
		node.style.setProperty('--tilt-y', `${x * 10}deg`)
	}, [])

	const resetTilt = useCallback(() => {
		const node = tiltRef.current
		if (!node) return
		node.style.setProperty('--tilt-x', '0deg')
		node.style.setProperty('--tilt-y', '0deg')
	}, [])

	const [mainTitle, ...rest] = (product.title || '')
		.split('|')
		.map(s => s.trim())
		.filter(Boolean)
	const featureChips = rest.slice(0, 3)

	return (
		<section className={styles.hero}>
			<div className={styles.auroraBg}>
				<span className={styles.orb1} />
				<span className={styles.orb2} />
				<span className={styles.orb3} />
				<span className={styles.noise} />
			</div>

			<div className={styles.heroGrid}>
				<div className={styles.heroContent}>
					<div className={styles.heroEyebrow}>
						<span className={styles.heroEyebrowDot} />
						<FaFire className={styles.heroEyebrowFire} />
						<span>ТОП ВИБІР · ЕКСКЛЮЗИВНА ПРОПОЗИЦІЯ</span>
					</div>

					<h1 className={styles.heroTitle}>
						<span className={styles.heroTitleLine1}>{mainTitle}</span>
					</h1>

					{featureChips.length > 0 && (
						<div className={styles.heroChips}>
							{featureChips.map((chip, i) => (
								<span key={i} className={styles.heroChip}>
									<FaCheck /> {chip}
								</span>
							))}
						</div>
					)}

					<p className={styles.heroDescription}>{product.description}</p>

					<div className={styles.heroRating}>
						<span className={styles.heroStars}>
							{Array.from({ length: 5 }).map((_, i) => (
								<FaStar key={i} />
							))}
						</span>
						<b>{product.rating}</b>
						<span className={styles.heroReviewsLabel}>
							на основі {product.reviews?.toLocaleString('uk-UA')} відгуків
						</span>
					</div>

					<div className={styles.heroPriceCard}>
						<div className={styles.heroPriceLeft}>
							<div className={styles.heroPriceOld}>
								{formatPrice(product.oldPrice)}
							</div>
							<div className={styles.heroPriceNew}>
								{formatPrice(product.price)}
							</div>
							<div className={styles.heroPriceSave}>
								Ви економите {formatPrice(product.savings)}
							</div>
						</div>
						<div className={styles.heroDiscountBadge}>
							<div className={styles.heroDiscountBadgeInner}>
								<span className={styles.heroDiscountMinus}>−</span>
								<span className={styles.heroDiscountNum}>
									{product.discount}
								</span>
								<span className={styles.heroDiscountPct}>%</span>
							</div>
						</div>
					</div>

					<a
						href={product.link}
						target='_blank'
						rel='noopener noreferrer sponsored'
						className={styles.heroCta}
					>
						<span className={styles.heroCtaShine} />
						<span className={styles.heroCtaText}>
							Забрати зі знижкою -{product.discount}%
						</span>
						<span className={styles.heroCtaArrow}>
							<FaArrowRight />
						</span>
					</a>

					<TrustRow />
				</div>

				<div
					ref={tiltRef}
					className={styles.heroMediaWrap}
					onMouseMove={handleTilt}
					onMouseLeave={resetTilt}
				>
					<div className={styles.heroMediaTilt}>
						<svg
							className={styles.rotatingText}
							viewBox='0 0 300 300'
							aria-hidden='true'
						>
							<defs>
								<path
									id='textCircle'
									d='M 150, 150 m -120, 0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0'
								/>
							</defs>
							<text>
								<textPath href='#textCircle' startOffset='0'>
									· ЗАМОВ ЗАРАЗ · ТОП ЦІНА · ЗНИЖКА -{product.discount}% ·
									ХІТ ПРОДАЖІВ · ЗАМОВ ЗАРАЗ · ТОП ЦІНА ·
								</textPath>
							</text>
						</svg>

						<div className={styles.heroImageRing} />
						<div className={styles.heroImageGlow} />

						<div className={styles.heroImageCard}>
							<img
								src={product.imageLarge || product.image}
								alt={product.alt}
								className={styles.heroImage}
								loading='eager'
								decoding='async'
							/>
							<div className={styles.heroImageShine} />
						</div>

						<div className={styles.floatingBadge1}>
							<FaShieldAlt /> <span>Гарантія</span>
						</div>
						<div className={styles.floatingBadge2}>
							<FaTruck /> <span>Доставка</span>
						</div>
						<div className={styles.floatingBadge3}>
							<FaHeart /> <span>Хіт</span>
						</div>

						<div className={styles.sparkle1}>✦</div>
						<div className={styles.sparkle2}>✧</div>
						<div className={styles.sparkle3}>✦</div>
					</div>
				</div>
			</div>
		</section>
	)
}

// ---------- Main ----------

export default function TemuLanding() {
	const [product, setProduct] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	useEffect(() => {
		let cancelled = false
		const load = async () => {
			try {
				setLoading(true)
				const data = await fetchTemuProduct()
				if (cancelled) return
				if (data) setProduct(data)
				else setError(true)
			} catch (e) {
				console.error('Failed to load Temu product', e)
				if (!cancelled) setError(true)
			} finally {
				if (!cancelled) setLoading(false)
			}
		}
		load()
		return () => {
			cancelled = true
		}
	}, [])

	if (loading) {
		return (
			<div className={styles.loaderWrap}>
				<div className={styles.loader} />
				<div className={styles.loaderText}>Завантажуємо пропозицію…</div>
			</div>
		)
	}

	if (error || !product) {
		return (
			<div className={styles.errorWrap}>
				<div className={styles.errorTitle}>Упс, пропозиція недоступна</div>
				<div className={styles.errorText}>
					Схоже, товар щойно закінчився. Спробуйте оновити сторінку пізніше.
				</div>
			</div>
		)
	}

	return (
		<div className={styles.page}>
			<ScrollProgress />
			<UrgencyBar discount={product.discount} />
			<LiveToast />
			<Hero product={product} />
			<StockBar />
			<BenefitsSection
				benefitsTitle={product.benefitsTitle}
				benefits={product.benefits}
			/>
			<ReviewsMarquee />
			<ComparisonSection />
			<FaqSection />
			<FinalCta product={product} />
			<StickyMobileBar product={product} />
		</div>
	)
}
