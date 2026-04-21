'use client'

import { useEffect, useState } from 'react'
import {
	FaStar,
	FaBolt,
	FaShieldAlt,
	FaTruck,
	FaUndo,
	FaArrowRight,
	FaExternalLinkAlt,
} from 'react-icons/fa'
import { fetchTemuProduct } from '../../services/api'
import styles from './temu-v2.module.css'

const formatPrice = v => (v == null ? '' : `$${Number(v).toFixed(2)}`)

const RIBBON_UNIT = 'TEMU · ХІТ · ЕКСКЛЮЗИВНО · TEMU · ЗНИЖКА · ХІТ · TEMU · '

export default function TemuLandingV2() {
	const [product, setProduct] = useState(null)
	const [loading, setLoading] = useState(true)
	const [ready, setReady] = useState(false)

	useEffect(() => {
		document.body.classList.add('temu-v2-fullscreen')
		document.documentElement.classList.add('temu-v2-fullscreen')
		return () => {
			document.body.classList.remove('temu-v2-fullscreen')
			document.documentElement.classList.remove('temu-v2-fullscreen')
		}
	}, [])

	useEffect(() => {
		let alive = true
		fetchTemuProduct()
			.then(data => {
				if (!alive) return
				setProduct(data)
				setLoading(false)
				requestAnimationFrame(() => {
					if (alive) setReady(true)
				})
			})
			.catch(() => {
				if (alive) setLoading(false)
			})
		return () => {
			alive = false
		}
	}, [])

	if (loading || !product) {
		return (
			<div className={styles.root}>
				<div className={styles.bgGrid} />
				<div className={styles.loaderWrap}>
					<div className={styles.loaderRing} />
					<div className={styles.loaderText}>Готуємо пропозицію Temu…</div>
				</div>
			</div>
		)
	}

	const shortTitle = (product.title || '').split('|')[0].trim()
	const savings = product.savings || 0

	return (
		<div className={`${styles.root} ${ready ? styles.ready : ''}`}>
			{/* Backgrounds */}
			<div className={styles.bgGrid} aria-hidden='true' />
			<div className={styles.bgGlow1} aria-hidden='true' />
			<div className={styles.bgGlow2} aria-hidden='true' />
			<div className={styles.bgGlow3} aria-hidden='true' />

			{/* Top ribbon marquee */}
			<div className={styles.ribbon}>
				<div className={styles.ribbonTrack}>
					{Array.from({ length: 6 }).map((_, i) => (
						<span key={i} className={styles.ribbonItem}>
							<span className={styles.ribbonBolt}>
								<FaBolt />
							</span>
							<b className={styles.ribbonBrand}>TEMU</b>
							<span className={styles.ribbonDot}>·</span>
							<span>ХІТ ПРОДАЖІВ</span>
							<span className={styles.ribbonDot}>·</span>
							<b className={styles.ribbonHighlight}>−{product.discount}%</b>
							<span className={styles.ribbonDot}>·</span>
							<span>ЕКСКЛЮЗИВНО</span>
							<span className={styles.ribbonDot}>·</span>
						</span>
					))}
				</div>
			</div>

			{/* Main content */}
			<div className={styles.main}>
				<div className={styles.stage}>
					{/* LEFT — Image panel */}
					<div className={styles.imagePanel}>
						<div className={styles.portalWrap}>
							<div className={styles.portalRing} />
							<div className={styles.portalGlow} />
							<div className={styles.portalFrame}>
								<img
									src={product.imageLarge || product.image}
									alt={product.alt}
									className={styles.productImg}
									loading='eager'
									decoding='async'
								/>
								<div className={styles.imageShine} />
								<div className={styles.imageScan} />
							</div>

							{/* Floating chips around image */}
							<div className={styles.floatBadge1}>
								<FaBolt /> <span>ХІТ</span>
							</div>
							<div className={styles.floatBadge2}>
								<FaStar />
								<span>
									<b>{product.rating}</b>
								</span>
							</div>
							<div className={styles.floatBadge3}>
								<span>SAVE</span>
								<b>{formatPrice(savings)}</b>
							</div>
						</div>
					</div>

					{/* RIGHT — Info panel */}
					<div className={styles.infoPanel}>
						<div className={styles.temuBadge}>
							<span className={styles.temuLogo}>
								<span>t</span>
								<span>e</span>
								<span>m</span>
								<span>u</span>
							</span>
							<span className={styles.temuBadgeText}>
								Ексклюзивна пропозиція
							</span>
						</div>

						<div className={styles.discountRow}>
							<div className={styles.discountBig}>
								<span className={styles.discountMinus}>−</span>
								<span className={styles.discountNum}>{product.discount}</span>
								<span className={styles.discountPct}>%</span>
							</div>
							<div className={styles.discountLabel}>
								<span className={styles.discountLabelTop}>ЗНИЖКА</span>
								<span className={styles.discountLabelBot}>діє зараз</span>
							</div>
						</div>

						<h1 className={styles.title}>{shortTitle}</h1>

						<p className={styles.desc}>{product.description}</p>

						<div className={styles.rating}>
							<span className={styles.stars}>
								{Array.from({ length: 5 }).map((_, i) => (
									<FaStar key={i} />
								))}
							</span>
							<b className={styles.ratingNum}>{product.rating}</b>
							<span className={styles.ratingDivider}>·</span>
							<span className={styles.reviewsLabel}>
								{product.reviews?.toLocaleString('uk-UA')} відгуків
							</span>
						</div>

						<div className={styles.priceRow}>
							<div className={styles.priceGroup}>
								<span className={styles.oldPrice}>
									{formatPrice(product.oldPrice)}
								</span>
								<span className={styles.newPrice}>
									{formatPrice(product.price)}
								</span>
							</div>
							{savings > 0 && (
								<div className={styles.saveChip}>
									Економія {formatPrice(savings)}
								</div>
							)}
						</div>

						<a
							href={product.link}
							target='_blank'
							rel='noopener noreferrer sponsored'
							className={styles.cta}
						>
							<span className={styles.ctaPulseRing} />
							<span className={styles.ctaPulseRing2} />
							<span className={styles.ctaShine} />
							<span className={styles.ctaBody}>
								<span className={styles.ctaText}>
									Купити на{' '}
									<span className={styles.ctaBrand}>Temu</span>
								</span>
								<span className={styles.ctaArrow}>
									<FaArrowRight />
								</span>
							</span>
							<span className={styles.ctaHint}>
								<FaExternalLinkAlt /> Перехід на Temu
							</span>
						</a>

						<div className={styles.trustRow}>
							<span className={styles.trustItem}>
								<FaTruck />
								<span>Швидка доставка</span>
							</span>
							<span className={styles.trustItem}>
								<FaUndo />
								<span>30 днів повернення</span>
							</span>
							<span className={styles.trustItem}>
								<FaShieldAlt />
								<span>Безпечна оплата</span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
