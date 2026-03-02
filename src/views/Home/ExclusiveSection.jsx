import React from 'react'
import Link from 'next/link'
import './ExclusiveSection.css'

const ExclusiveSection = ({ articles }) => {
	if (!articles || articles.length < 3) return null

	const mainArticle = articles[0]
	const sideArticles = articles.slice(1, 3)

	return (
		<section className='exclusive-section container'>
			<div className='exclusive-container-card'>
				<div style={{ position: 'relative', height: '0' }}>
					<span
						className='block-title'
						style={{
							position: 'absolute',
							top: '-50px',
							left: '-10px',
							zIndex: 10,
							backgroundColor: '#ec3535',
							color: '#fff',
							padding: '4px 12px',
							fontStyle: 'italic',
							fontSize: '18px',
						}}
					>
						Exclusive content
					</span>
				</div>

				<div className='exclusive-grid'>
					{/* Main Large Card */}
					<div className='exclusive-main'>
						<Link
							href={`/article/${mainArticle.slug}`}
							className='image-wrapper'
						>
							<img src={mainArticle.image} alt={mainArticle.title} />
						</Link>
						<div className='hero-card-content'>
							<span
								className='badge-exclusive'
								style={{ fontSize: '11px', padding: '3px 8px' }}
							>
								EXCLUSIVE
							</span>
							<h2>
								<Link href={`/article/${mainArticle.slug}`}>
									{mainArticle.title}
								</Link>
							</h2>
							<div
								className='article-meta'
								style={{ marginBottom: '15px', color: '#fff' }}
							>
								<span className='meta-item meta-date' style={{ color: '#eee' }}>
									{mainArticle.date}
								</span>
								<span
									className='meta-separator'
									style={{ color: 'rgba(255,255,255,0.5)' }}
								>
									-
								</span>
								<span
									className='meta-item meta-views'
									style={{ color: '#eee' }}
								>
									{mainArticle.views?.toLocaleString()} views
								</span>
							</div>
							<p>{mainArticle.excerpt}</p>
						</div>
					</div>

					{/* Side Cards */}
					<div className='exclusive-side'>
						{sideArticles.map((article, idx) => (
							<div className='ex-side-card' key={`ex-side-${idx}`}>
								<Link
									href={`/article/${article.slug}`}
									className='image-wrapper'
								>
									<img src={article.image} alt={article.title} />
								</Link>
								<div>
									<div className='ex-side-meta'>
										<span
											className='cat-text'
											style={{
												color: `var(--cat-${article.category.toLowerCase()})`,
											}}
										>
											{article.category}
										</span>
									</div>
									<h4>
										<Link href={`/article/${article.slug}`}>
											<span className='badge-exclusive'>EXCLUSIVE</span>
											{article.title}
										</Link>
									</h4>
									<div className='article-meta' style={{ marginTop: '8px' }}>
										<span className='meta-item meta-date'>{article.date}</span>
										<span className='meta-separator'>-</span>
										<span className='meta-item meta-views'>
											{article.views?.toLocaleString()} views
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default ExclusiveSection
