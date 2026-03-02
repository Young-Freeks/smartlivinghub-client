'use client'
import './Hero.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { fetchArticles } from '../../services/api'

const Hero = () => {
	const router = useRouter()
	const [featuredArticles, setFeaturedArticles] = useState([])

	useEffect(() => {
		const loadData = async () => {
			const data = await fetchArticles()
			// Get top 5 featured articles
			setFeaturedArticles((data || []).filter(a => a.isFeatured).slice(0, 5))
		}
		loadData()
	}, [])

	if (featuredArticles.length === 0) return null

	const mainArticle = featuredArticles[0]
	const sideArticles = featuredArticles.slice(1)

	const renderCard = (article, isMain = false) => (
		<Link
			href={`/article/${article.slug}`}
			key={article.id}
			className={`hero-card ${isMain ? 'hero-card-main' : 'hero-card-side'}`}
		>
			<div
				className='hero-card-bg'
				style={{ backgroundImage: `url(${article.image})` }}
			></div>
			<div className='hero-card-overlay'></div>
			<div className='hero-card-content'>
				<span className={`cat-label cat-${article.category.toLowerCase()}`}>
					{article.category}
				</span>
				<h2 className='hero-card-title'>{article.title}</h2>
				<div className='hero-card-meta'>
					<span
						className='cat-list-author'
						onClick={e => {
							e.preventDefault()
							e.stopPropagation()
							router.push(`/author/${article.authorSlug}`)
						}}
						style={{ cursor: 'pointer', color: '#fff' }}
					>
						<span>{article.author}</span>
					</span>
					<span className='hero-date'>- {article.date}</span>
					<span className='hero-date'>
						- {article.views?.toLocaleString()} views
					</span>
				</div>
			</div>
		</Link>
	)

	return (
		<section className='hero-section'>
			<div className='hero-container'>
				<div className='hero-grid'>
					<div className='hero-left'>{renderCard(mainArticle, true)}</div>
					<div className='hero-right'>
						{sideArticles.map(article => renderCard(article, false))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero
