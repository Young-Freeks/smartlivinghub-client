'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchArticles } from '../../services/api'
import './Sidebar.css'

const Sidebar = () => {
	const [popularArticle, setPopularArticle] = useState(null)
	const [recentArticles, setRecentArticles] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadData = async () => {
			const data = await fetchArticles()
			if (data && data.length > 0) {
				// Pick article with highest views or just the first one if views are equal
				const sortedByViews = [...data].sort((a, b) => b.views - a.views)
				setPopularArticle(sortedByViews[0])
				// Pick 4 recent articles (assuming API returns them reasonably sorted, or we just take the first 4)
				setRecentArticles(data.slice(0, 4))
			}
			setLoading(false)
		}
		loadData()
	}, [])

	if (loading) return <div className='sidebar-wrapper'>Loading...</div>

	return (
		<div className='sidebar-wrapper'>
			{/* Widget 1: Popular Post */}
			{popularArticle && (
				<div className='sidebar-widget popular-widget'>
					<h3 className='widget-title'>Popular</h3>
					<article className='popular-post-card'>
						<Link
							href={`/article/${popularArticle.slug}`}
							className='image-wrapper'
						>
							<img src={popularArticle.image} alt={popularArticle.title} />
							<div className='popular-post-content'>
								<span
									className='category-label'
									style={{
										backgroundColor:
											popularArticle.categoryColor || 'var(--primary-color)',
									}}
								>
									{popularArticle.category}
								</span>
								<h4 className='popular-post-title'>{popularArticle.title}</h4>
							</div>
						</Link>
					</article>
				</div>
			)}

			{/* Widget 2: Recent Posts List */}
			{recentArticles.length > 0 && (
				<div className='sidebar-widget recent-widget'>
					<h3 className='widget-title'>Recent Posts</h3>
					<div className='sidebar-recent-list'>
						{recentArticles.map(article => (
							<article key={article.id} className='sidebar-recent-item'>
								<div className='recent-item-meta'>
									<Link
										href={`/author/${article.authorSlug}`}
										style={{ color: 'inherit', textDecoration: 'none' }}
									>
										{article.author}
									</Link>
									<span>-</span>
									<span>{article.date}</span>
									<span>-</span>
									<span>{article.views?.toLocaleString()} views</span>
								</div>
								<h5 className='recent-item-title'>
									<Link href={`/article/${article.slug}`}>{article.title}</Link>
								</h5>
							</article>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default Sidebar
