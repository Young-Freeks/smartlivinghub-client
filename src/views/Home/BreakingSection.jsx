import React from 'react'
import Link from 'next/link'
import './BreakingSection.css'

const BreakingSection = ({ articles }) => {
	if (!articles || articles.length < 8) return null

	const topFour = articles.slice(0, 4)
	const bottomFour = articles.slice(4, 8)
	return (
		<section className='breaking-section-wrapper'>
			<div className='breaking-bg'></div>
			<div className='breaking-section container'>
				<div
					className='block-header'
					style={{ borderBottomColor: 'var(--primary-color)' }}
				>
					<span
						className='block-title'
						style={{ backgroundColor: 'var(--primary-color)', color: '#fff' }}
					>
						BREAKING
					</span>
				</div>
				<div className='breaking-container-card'>
					<div className='breaking-grid'>
						{topFour.map((article, idx) => (
							<div className='breaking-card' key={`break-top-${idx}`}>
								<Link href={`/article/${article.slug}`} className='image-wrapper'>
									<img src={article.image} alt={article.title} />
								</Link>
								<div className='hero-card-content'>
									<span
										className='cat-label'
										style={{
											marginBottom: '8px',
										}}
									>
										{article.category}
									</span>
									<h3>
										<Link href={`/article/${article.slug}`}>{article.title}</Link>
									</h3>
									<div className='article-meta' style={{ marginTop: '10px' }}>
										<Link
											href={`/author/${article.authorSlug}`}
											className='author-info'
											style={{ color: '#fff' }}
										>
											<img
												src={article.authorAvatar}
												alt={article.author}
												className='author-avatar'
											/>
											<span>{article.author}</span>
										</Link>
										<span
											className='meta-separator'
											style={{ color: 'rgba(255,255,255,0.4)' }}
										>
											-
										</span>
										<span
											className='meta-item meta-date'
											style={{ color: '#ddd' }}
										>
											{article.date}
										</span>
										<span
											className='meta-separator'
											style={{ color: 'rgba(255,255,255,0.4)' }}
										>
											-
										</span>
										<span
											className='meta-item meta-views'
											style={{ color: '#ddd' }}
										>
											{article.views?.toLocaleString()} views
										</span>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className='breaking-list'>
						{bottomFour.map((article, idx) => (
							<div className='breaking-list-item' key={`break-bot-${idx}`}>
								<div style={{ flex: 1 }}>
									<h5>
										<Link href={`/article/${article.slug}`}>
											{idx === 1 || idx === 3 ? (
												<span
													className='badge-exclusive'
													style={{ marginRight: '6px', fontSize: '9px' }}
												>
													EXCLUSIVE
												</span>
											) : null}
											{article.title}
										</Link>
									</h5>
									<span className='cat-label' style={{ marginBottom: '8px' }}>
										{article.category}
									</span>
									<div className='article-meta' style={{ marginTop: '4px' }}>
										<span className='meta-item meta-date'>{article.date}</span>
										<span className='meta-separator'>-</span>
										<span className='meta-item meta-views'>
											{article.views?.toLocaleString()} views
										</span>
									</div>
								</div>
								<Link
									href={`/article/${article.slug}`}
									className='image-wrapper'
									style={{ width: '60px', height: '60px', flexShrink: 0 }}
								>
									<img
										src={article.image}
										alt={article.title}
										style={{
											width: '100%',
											height: '100%',
											objectFit: 'cover',
										}}
									/>
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default BreakingSection
