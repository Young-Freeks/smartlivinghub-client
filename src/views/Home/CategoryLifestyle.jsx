import React from 'react'
import Link from 'next/link'
import './CategoryLifestyle.css'

const CategoryLifestyle = ({ categoryName, articles }) => {
	if (!articles || articles.length < 5) return null

	// The user requested a uniform grid of identical articles (no large featured article)
	const gridArticles = articles.slice(0, 8)
	return (
		<section className='cat-lifestyle-wrapper'>
			<div className='cat-split-bg'></div>
			<div className='cat-lifestyle-section container'>
				<div
					className='lifestyle-header'
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'flex-end',
						marginBottom: '30px',
					}}
				>
					<div>
						<span className='lifestyle-watermark'>
							{categoryName.toUpperCase()}
						</span>
						<h2 className='lifestyle-title' style={{ marginBottom: 0 }}>
							<Link
								href={`/category/${categoryName.toLowerCase()}`}
								style={{ color: 'inherit', textDecoration: 'none' }}
							>
								{categoryName}
							</Link>
						</h2>
					</div>
					<Link
						href={`/category/${categoryName.toLowerCase()}`}
						style={{
							fontSize: '13px',
							fontWeight: '700',
							color: 'var(--text-dark)',
							textDecoration: 'none',
							paddingBottom: '10px',
							position: 'relative',
							zIndex: 2,
						}}
					>
						VIEW ALL →
					</Link>
				</div>

				<div className='lifestyle-layout'>
					{/* Symmetric 4x2 Grid */}
					<div className='lifestyle-main-grid-8'>
						{gridArticles.map((article, idx) => (
							<div className='ls-small-card' key={`ls-${idx}`}>
								<Link
									href={`/article/${article.slug}`}
									className='image-wrapper'
								>
									<img src={article.image} alt={article.title} />
								</Link>
								<h4>
									<Link href={`/article/${article.slug}`}>{article.title}</Link>
								</h4>
								<div className='article-meta' style={{ marginTop: '8px' }}>
									<Link
										href={`/author/${article.authorSlug}`}
										className='author-info'
									>
										<img
											src={article.authorAvatar}
											alt={article.author}
											className='author-avatar'
										/>
										<span>{article.author}</span>
									</Link>
									<span className='meta-separator'>-</span>
									<span className='meta-item meta-date'>{article.date}</span>
									<span className='meta-separator'>-</span>
									<span className='meta-item meta-views'>
										{article.views?.toLocaleString()} views
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default CategoryLifestyle
