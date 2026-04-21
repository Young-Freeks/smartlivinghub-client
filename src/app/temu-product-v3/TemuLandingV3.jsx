'use client'

import { useEffect, useRef, useState } from 'react'
import {
	FaStar,
	FaCheck,
	FaArrowRight,
	FaClock,
	FaPlus,
	FaMinus,
	FaShieldAlt,
	FaTruck,
	FaUndo,
	FaHeadset,
	FaQuoteLeft,
	FaTimes,
	FaExternalLinkAlt,
} from 'react-icons/fa'
import { fetchTemuProduct } from '../../services/api'
import styles from './temu-v3.module.css'

// ---------- Utils ----------
const formatPrice = v => (v == null ? '' : `$${Number(v).toFixed(2)}`)
const pad = n => String(n).padStart(2, '0')

const useReveal = (threshold = 0.12) => {
	const ref = useRef(null)
	const [shown, setShown] = useState(false)
	useEffect(() => {
		if (!ref.current || shown) return
		const node = ref.current
		const obs = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setShown(true)
						obs.disconnect()
					}
				})
			},
			{ threshold },
		)
		obs.observe(node)
		return () => obs.disconnect()
	}, [threshold, shown])
	return [ref, shown]
}

const useCountdown = (initial = { hours: 2, minutes: 47, seconds: 13 }) => {
	const [t, setT] = useState(initial)
	useEffect(() => {
		const id = setInterval(() => {
			setT(p => {
				let { hours, minutes, seconds } = p
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
	return t
}

// ---------- Static copy ----------
const PAIN_POINTS = [
	'Переплата у 2–3 рази у локальних магазинах',
	'Сумнівні продавці та ризик натрапити на підробку',
	'Довге очікування без жодних гарантій',
	'Жодних зрозумілих умов повернення',
]

const STEPS = [
	{
		n: '01',
		title: 'Натисни «Купити на Temu»',
		text: 'Ми направимо тебе на офіційну сторінку товару з уже застосованою знижкою.',
	},
	{
		n: '02',
		title: 'Оформи замовлення',
		text: 'Додай товар до кошика і сплати зручним способом. Платформа україномовна.',
	},
	{
		n: '03',
		title: 'Отримай з доставкою',
		text: 'Трек-номер прийде миттєво. Доставка займає від 7 до 14 днів.',
	},
]

const TESTIMONIALS = [
	{
		name: 'Ірина К.',
		city: 'Львів',
		stars: 5,
		text: 'Замовлення прийшло за 10 днів. Якість справді відповідає опису — я приємно здивована. Буду замовляти ще.',
	},
	{
		name: 'Дмитро Б.',
		city: 'Київ',
		stars: 5,
		text: 'Це вже третій товар, який я замовляю на Temu через цей сайт. Ціни чесні, все приходить у термін і без пошкоджень.',
	},
	{
		name: 'Максим Л.',
		city: 'Одеса',
		stars: 5,
		text: 'Спочатку сумнівався через таку низьку ціну. А отримавши — зрозумів, що якість краща, ніж в деяких магазинах у центрі.',
	},
]

const COMP_WITHOUT = [
	'Переплата в 2–3 рази в роздрібних магазинах',
	'Ризик підробки від невідомого продавця',
	'Непрозорі умови та мовний бар’єр',
	'Жодного чіткого захисту покупця',
]
const COMP_WITH = [
	'Чесна ціна напряму від виробника',
	'Перевірений продавець із сертифікатами',
	'Прозорий процес і підтримка українською',
	'30 днів на повернення без зайвих запитань',
]

const FAQ = [
	{
		q: 'Це оригінальний товар?',
		a: 'Так. Ми співпрацюємо тільки з перевіреними продавцями на Temu, які мають сертифікати якості та високі оцінки покупців. Підробок не буде.',
	},
	{
		q: 'Скільки триває доставка?',
		a: 'Стандартна доставка — від 7 до 14 днів залежно від регіону. Трек-номер надходить одразу після відправлення, і ти можеш відстежувати посилку в реальному часі.',
	},
	{
		q: 'Чи можна повернути товар?',
		a: 'Звичайно. Temu надає 30 днів на повернення — без додаткових запитань і з повним зворотом коштів. Просто заповни форму в особистому кабінеті.',
	},
	{
		q: 'Чому ціна така вигідна?',
		a: 'Temu співпрацює з виробниками напряму — без посередників і роздрібних націнок. Тобі не доводиться переплачувати за ланцюжок перепродажів.',
	},
	{
		q: 'Чи безпечно оплачувати онлайн?',
		a: 'Повністю. Платформа використовує сертифіковані платіжні системи з шифруванням даних. Гроші залишаються під захистом до моменту, поки ти підтвердиш отримання товару.',
	},
	{
		q: 'А якщо виникне проблема із замовленням?',
		a: 'Підтримка Temu працює 24/7. У разі будь-якої ситуації — пошкодження, затримки або невідповідності — ти можеш звернутися у чат і отримати рішення.',
	},
]

const GUARANTEES = [
	{ icon: <FaUndo />, label: 'Повернення 30 днів' },
	{ icon: <FaShieldAlt />, label: 'Захист покупця' },
	{ icon: <FaTruck />, label: 'Офіційна доставка' },
	{ icon: <FaHeadset />, label: 'Підтримка 24/7' },
]

// ---------- Sub-components ----------

const Stars = ({ n = 5 }) => (
	<span className={styles.stars}>
		{Array.from({ length: n }).map((_, i) => (
			<FaStar key={i} />
		))}
	</span>
)

const PriceBlock = ({ product, variant = 'default' }) => (
	<div className={`${styles.priceBlock} ${styles['priceBlock_' + variant]}`}>
		<span className={styles.priceOld}>{formatPrice(product.oldPrice)}</span>
		<span className={styles.priceNew}>{formatPrice(product.price)}</span>
		<span className={styles.priceBadge}>−{product.discount}%</span>
	</div>
)

const UrgencyLine = ({ product }) => {
	const { hours, minutes, seconds } = useCountdown()
	if (product.timer) {
		return (
			<div className={styles.urgencyLine}>
				<FaClock className={styles.urgencyIcon} />
				<span>
					Акція завершується через{' '}
					<b className={styles.urgencyTime}>
						{pad(hours)}:{pad(minutes)}:{pad(seconds)}
					</b>
				</span>
			</div>
		)
	}
	return (
		<div className={styles.urgencyLine}>
			<FaClock className={styles.urgencyIcon} />
			<span>
				<b>Обмежена кількість</b> — залишилось мало одиниць на складі
			</span>
		</div>
	)
}

const PrimaryCta = ({ product, size = 'md', innerRef, label }) => (
	<a
		ref={innerRef}
		href={product.link}
		target='_blank'
		rel='noopener noreferrer sponsored'
		className={`${styles.primaryCta} ${styles['primaryCta_' + size]}`}
	>
		<span className={styles.primaryCtaText}>
			{label || 'Купити на Temu'}
		</span>
		<span className={styles.primaryCtaArrow}>
			<FaArrowRight />
		</span>
	</a>
)

// ---------- Sections ----------

const Hero = ({ product, heroCtaRef }) => {
	const shortTitle = (product.title || '').split('|')[0].trim()
	return (
		<section className={styles.hero}>
			<div className={styles.heroInner}>
				<div className={styles.heroMedia}>
					<div className={styles.heroImageWrap}>
						<img
							src={product.imageLarge || product.image}
							alt={product.alt}
							className={styles.heroImage}
							loading='eager'
							decoding='async'
						/>
					</div>
				</div>

				<div className={styles.heroContent}>
					<div className={styles.brandStrip}>
						<span className={styles.brandStripDot} />
						<span>Підбірка редакції</span>
						<span className={styles.brandStripSep}>·</span>
						<span>Партнерська пропозиція Temu</span>
					</div>

					<h1 className={styles.heroTitle}>{shortTitle}</h1>

					<p className={styles.heroSub}>{product.description}</p>

					<div className={styles.heroRating}>
						<Stars />
						<b>{product.rating}</b>
						<span className={styles.reviewsLabel}>
							{product.reviews?.toLocaleString('uk-UA')} відгуків
						</span>
					</div>

					<PriceBlock product={product} variant='hero' />

					<UrgencyLine product={product} />

					<PrimaryCta product={product} size='lg' innerRef={heroCtaRef} />

					<div className={styles.heroTrust}>
						<span>
							<FaShieldAlt /> Безпечна оплата
						</span>
						<span className={styles.heroTrustSep}>·</span>
						<span>
							<FaUndo /> 30 днів повернення
						</span>
					</div>
				</div>
			</div>
		</section>
	)
}

const Divider = () => <div className={styles.divider} aria-hidden='true' />

const ProblemSection = () => {
	const [ref, shown] = useReveal()
	return (
		<section ref={ref} className={`${styles.section} ${styles.sectionLight}`}>
			<div className={`${styles.container} ${shown ? styles.shown : styles.reveal}`}>
				<div className={styles.eyebrow}>Ситуація, яка тобі знайома</div>
				<h2 className={styles.sectionTitle}>
					Знайти якісний товар без переплат — складніше, ніж здається
				</h2>
				<p className={styles.sectionLead}>
					Ціни в роздрібних магазинах завищені. Якість — лотерея. Ти витрачаєш
					години на пошуки, порівнюєш десятки варіантів і все одно сумніваєшся
					у виборі.
				</p>
			</div>
		</section>
	)
}

const AgitationSection = () => {
	const [ref, shown] = useReveal()
	return (
		<section ref={ref} className={`${styles.section} ${styles.sectionCream}`}>
			<div className={`${styles.container} ${shown ? styles.shown : styles.reveal}`}>
				<div className={styles.eyebrow}>Чому так відбувається</div>
				<h2 className={styles.sectionTitle}>
					А поки ти вагаєшся — вигідна пропозиція зникає
				</h2>
				<p className={styles.sectionLead}>
					Виробники поставляють товар напряму на Temu за чесною ціною. Але такі
					пропозиції швидко розбирають — і товар знову повертається у роздріб
					із подвійною націнкою.
				</p>

				<ul className={styles.painList}>
					{PAIN_POINTS.map((p, i) => (
						<li key={i} className={styles.painItem}>
							<span className={styles.painMark}>
								<FaTimes />
							</span>
							<span>{p}</span>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}

const SolutionSection = ({ product }) => {
	const [ref, shown] = useReveal()
	return (
		<section ref={ref} className={`${styles.section} ${styles.sectionLight}`}>
			<div className={`${styles.container} ${shown ? styles.shown : styles.reveal}`}>
				<div className={styles.solutionGrid}>
					<div>
						<div className={styles.eyebrow}>Рішення</div>
						<h2 className={styles.sectionTitle}>
							Сертифікований товар напряму з&nbsp;Temu — за&nbsp;справжньою
							ціною
						</h2>
						<p className={styles.sectionLead}>
							Ми відібрали цю пропозицію вручну. Офіційний продавець,
							перевірена якість і знижка, якої ти не знайдеш у роздрібі.
						</p>
						<div className={styles.solutionMeta}>
							<div className={styles.solutionMetaItem}>
								<span className={styles.solutionMetaNum}>
									−{product.discount}%
								</span>
								<span className={styles.solutionMetaLabel}>
									знижка від роздрібу
								</span>
							</div>
							<div className={styles.solutionMetaDivider} />
							<div className={styles.solutionMetaItem}>
								<span className={styles.solutionMetaNum}>{product.rating}★</span>
								<span className={styles.solutionMetaLabel}>
									{product.reviews?.toLocaleString('uk-UA')} відгуків
								</span>
							</div>
							<div className={styles.solutionMetaDivider} />
							<div className={styles.solutionMetaItem}>
								<span className={styles.solutionMetaNum}>30 днів</span>
								<span className={styles.solutionMetaLabel}>на повернення</span>
							</div>
						</div>
					</div>
					<div className={styles.solutionImageWrap}>
						<img
							src={product.imageLarge || product.image}
							alt={product.alt}
							className={styles.solutionImage}
						/>
						<div className={styles.solutionImageTag}>
							<span className={styles.solutionTagLabel}>Temu</span>
							<span className={styles.solutionTagText}>
								Перевірений продавець
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

const BenefitsSection = ({ product }) => {
	const [ref, shown] = useReveal()
	return (
		<section ref={ref} className={`${styles.section} ${styles.sectionCream}`}>
			<div className={`${styles.container} ${shown ? styles.shown : styles.reveal}`}>
				<div className={styles.eyebrow}>Що ти отримаєш</div>
				<h2 className={styles.sectionTitle}>
					{product.benefitsTitle || 'Переваги, які помітні з першого дня'}
				</h2>

				<div className={styles.benefitsGrid}>
					{product.benefits.map((b, i) => (
						<div key={i} className={styles.benefitCard}>
							<div className={styles.benefitNumber}>0{i + 1}</div>
							<div className={styles.benefitCheck}>
								<FaCheck />
							</div>
							<p className={styles.benefitText}>{b}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

const HowItWorksSection = () => {
	const [ref, shown] = useReveal()
	return (
		<section ref={ref} className={`${styles.section} ${styles.sectionLight}`}>
			<div className={`${styles.container} ${shown ? styles.shown : styles.reveal}`}>
				<div className={styles.eyebrow}>Як оформити замовлення</div>
				<h2 className={styles.sectionTitle}>Просто. Швидко. Безпечно.</h2>

				<div className={styles.stepsGrid}>
					{STEPS.map((s, i) => (
						<div key={i} className={styles.stepCard}>
							<span className={styles.stepNum}>{s.n}</span>
							<h3 className={styles.stepTitle}>{s.title}</h3>
							<p className={styles.stepText}>{s.text}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

const SocialProofSection = ({ product }) => {
	const [ref, shown] = useReveal()
	return (
		<section ref={ref} className={`${styles.section} ${styles.sectionCream}`}>
			<div className={`${styles.container} ${shown ? styles.shown : styles.reveal}`}>
				<div className={styles.eyebrow}>Відгуки покупців</div>
				<h2 className={styles.sectionTitle}>Люди, які вже отримали товар</h2>

				<div className={styles.ratingSummary}>
					<div className={styles.ratingBig}>{product.rating}</div>
					<div>
						<Stars />
						<div className={styles.ratingBigLabel}>
							на основі {product.reviews?.toLocaleString('uk-UA')} реальних
							відгуків
						</div>
					</div>
				</div>

				<div className={styles.testimonialsGrid}>
					{TESTIMONIALS.map((t, i) => (
						<figure key={i} className={styles.testimonialCard}>
							<FaQuoteLeft className={styles.testimonialQuote} />
							<Stars n={t.stars} />
							<blockquote className={styles.testimonialText}>{t.text}</blockquote>
							<figcaption className={styles.testimonialMeta}>
								<b>{t.name}</b>
								<span className={styles.testimonialCity}>{t.city}</span>
							</figcaption>
						</figure>
					))}
				</div>
			</div>
		</section>
	)
}

const ComparisonSection = () => {
	const [ref, shown] = useReveal()
	return (
		<section ref={ref} className={`${styles.section} ${styles.sectionLight}`}>
			<div className={`${styles.container} ${shown ? styles.shown : styles.reveal}`}>
				<div className={styles.eyebrow}>Порівняння</div>
				<h2 className={styles.sectionTitle}>Чому цей варіант вигідніший</h2>

				<div className={styles.compareGrid}>
					<div className={`${styles.compareCard} ${styles.compareCardBad}`}>
						<div className={styles.compareHeader}>Без цієї пропозиції</div>
						<ul className={styles.compareList}>
							{COMP_WITHOUT.map((t, i) => (
								<li key={i}>
									<span className={styles.compareMarkBad}>
										<FaTimes />
									</span>
									<span>{t}</span>
								</li>
							))}
						</ul>
					</div>
					<div className={`${styles.compareCard} ${styles.compareCardGood}`}>
						<div className={styles.compareHeader}>З нашою пропозицією</div>
						<ul className={styles.compareList}>
							{COMP_WITH.map((t, i) => (
								<li key={i}>
									<span className={styles.compareMarkGood}>
										<FaCheck />
									</span>
									<span>{t}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}

const FaqSection = () => {
	const [ref, shown] = useReveal()
	const [open, setOpen] = useState(0)
	return (
		<section ref={ref} className={`${styles.section} ${styles.sectionCream}`}>
			<div className={`${styles.container} ${shown ? styles.shown : styles.reveal}`}>
				<div className={styles.eyebrow}>Питання та відповіді</div>
				<h2 className={styles.sectionTitle}>
					Що варто знати перед замовленням
				</h2>

				<div className={styles.faqList}>
					{FAQ.map((f, i) => {
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

const GuaranteeSection = () => {
	const [ref, shown] = useReveal()
	return (
		<section ref={ref} className={`${styles.section} ${styles.sectionLight}`}>
			<div className={`${styles.container} ${shown ? styles.shown : styles.reveal}`}>
				<div className={styles.guaranteeCard}>
					<div className={styles.eyebrow}>Твій захист</div>
					<h2 className={styles.sectionTitle}>
						Ризик тільки у&nbsp;тому, що&nbsp;ти не&nbsp;спробуєш
					</h2>
					<p className={styles.sectionLead}>
						Якщо товар не підійде з будь-якої причини — Temu повертає 100%
						вартості протягом 30 днів. Без зайвих запитань і без хитрощів.
					</p>

					<div className={styles.guaranteesRow}>
						{GUARANTEES.map((g, i) => (
							<div key={i} className={styles.guaranteeItem}>
								<span className={styles.guaranteeIcon}>{g.icon}</span>
								<span>{g.label}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

const FinalCtaSection = ({ product }) => {
	const [ref, shown] = useReveal()
	const { hours, minutes, seconds } = useCountdown()
	return (
		<section ref={ref} className={`${styles.section} ${styles.finalSection}`}>
			<div className={`${styles.container} ${shown ? styles.shown : styles.reveal}`}>
				<div className={styles.eyebrow}>Не зволікай</div>
				<h2 className={styles.sectionTitle}>Цей товар розбирають швидко</h2>
				<p className={styles.sectionLead}>
					Знижка −{product.discount}% діє обмежений час. Коли акція завершиться,
					ціна повернеться до {formatPrice(product.oldPrice)}.
				</p>

				<div className={styles.finalTimer}>
					<FaClock />
					<span>Залишилось:</span>
					<b>
						{pad(hours)}:{pad(minutes)}:{pad(seconds)}
					</b>
				</div>

				<div className={styles.finalPriceBlock}>
					<span className={styles.finalOld}>{formatPrice(product.oldPrice)}</span>
					<span className={styles.finalNew}>{formatPrice(product.price)}</span>
					<span className={styles.finalBadge}>−{product.discount}%</span>
				</div>

				<PrimaryCta product={product} size='xl' />

				<div className={styles.finalMicro}>
					<FaExternalLinkAlt /> Натискаючи кнопку, ти переходиш на офіційний
					сайт Temu
				</div>
			</div>
		</section>
	)
}

const StickyCta = ({ product, show }) => {
	const { hours, minutes, seconds } = useCountdown()
	return (
		<div
			className={`${styles.stickyCta} ${show ? styles.stickyCtaVisible : ''}`}
			aria-hidden={!show}
		>
			<div className={styles.stickyInner}>
				<div className={styles.stickyLeft}>
					<div className={styles.stickyPrices}>
						<span className={styles.stickyOld}>
							{formatPrice(product.oldPrice)}
						</span>
						<span className={styles.stickyNew}>
							{formatPrice(product.price)}
						</span>
					</div>
					<div className={styles.stickyUrgency}>
						<FaClock />
						{product.timer
							? `Акція: ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
							: 'Обмежена кількість'}
					</div>
				</div>
				<a
					href={product.link}
					target='_blank'
					rel='noopener noreferrer sponsored'
					className={styles.stickyBtn}
				>
					<span>Купити на Temu</span>
					<FaArrowRight />
				</a>
			</div>
		</div>
	)
}

// ---------- Main ----------

export default function TemuLandingV3() {
	const [product, setProduct] = useState(null)
	const [loading, setLoading] = useState(true)
	const heroCtaRef = useRef(null)
	const [heroCtaVisible, setHeroCtaVisible] = useState(true)

	useEffect(() => {
		let alive = true
		fetchTemuProduct()
			.then(data => {
				if (!alive) return
				setProduct(data)
				setLoading(false)
			})
			.catch(() => {
				if (alive) setLoading(false)
			})
		return () => {
			alive = false
		}
	}, [])

	useEffect(() => {
		if (!heroCtaRef.current) return
		const obs = new IntersectionObserver(
			entries => {
				entries.forEach(entry => setHeroCtaVisible(entry.isIntersecting))
			},
			{ threshold: 0, rootMargin: '0px 0px -40px 0px' },
		)
		obs.observe(heroCtaRef.current)
		return () => obs.disconnect()
	}, [product])

	if (loading || !product) {
		return (
			<div className={styles.loaderWrap}>
				<div className={styles.loader} />
				<div className={styles.loaderText}>
					Готуємо пропозицію…
				</div>
			</div>
		)
	}

	return (
		<div className={styles.page}>
			<Hero product={product} heroCtaRef={heroCtaRef} />
			<Divider />
			<ProblemSection />
			<AgitationSection />
			<SolutionSection product={product} />
			<BenefitsSection product={product} />
			<HowItWorksSection />
			<SocialProofSection product={product} />
			<ComparisonSection />
			<FaqSection />
			<GuaranteeSection />
			<FinalCtaSection product={product} />
			<StickyCta product={product} show={!heroCtaVisible} />
		</div>
	)
}
