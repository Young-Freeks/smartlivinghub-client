import React from 'react'
import Link from 'next/link'
import './DontMiss.css'

const DontMiss = ({ articles }) => {
	if (!articles || articles.length < 5) return null

	const mainArticle = articles[0]
	const listArticles = articles.slice(1, 5)

	return (
		<section className='dont-miss-section'>
			<div className='block-header'>
				<span className='block-title'>DON'T MISS</span>
			</div>

			<div className='dont-miss-grid'>
				{/* Left Side: Large Article */}
				<div className='dont-miss-main'>
					<div className='article-card dm-large-card'>
						<Link
							href={`/article/${mainArticle.slug}`}
							className='image-wrapper'
						>
							<span
								className={`cat-label cat-${mainArticle.category.toLowerCase()}`}
							>
								{mainArticle.category}
							</span>
							<img src={mainArticle.image} alt={mainArticle.title} />
						</Link>
						<div className='dm-content'>
							<h3>
								<Link href={`/article/${mainArticle.slug}`}>
									{mainArticle.title}
								</Link>
							</h3>
							<div className='article-meta'>
								<Link
									href={`/author/${mainArticle.authorSlug}`}
									className='author-info'
								>
									<img
										src={mainArticle.authorAvatar}
										alt={mainArticle.author}
										className='author-avatar'
									/>
									<span>{mainArticle.author}</span>
								</Link>
								<span className='meta-separator'>-</span>
								<span className='meta-item meta-date'>{mainArticle.date}</span>
								<span className='meta-separator'>-</span>
								<span className='meta-item meta-views'>
									{mainArticle.views?.toLocaleString()} views
								</span>
							</div>
							<p className='dm-excerpt'>{mainArticle.excerpt}</p>
						</div>
					</div>
				</div>

				{/* Right Side: List Articles */}
				<div className='dont-miss-list'>
					{listArticles.map(article => (
						<div className='article-card dm-small-card' key={article.id}>
							<Link href={`/article/${article.slug}`} className='image-wrapper'>
								<img src={article.image} alt={article.title} />
							</Link>
							<div className='dm-info'>
								<Link
									href={`/category/${article.category.toLowerCase()}`}
									className='cat-label-text'
									style={{
										color: `var(--cat-${article.category.toLowerCase()})`,
										fontSize: '10px',
										textTransform: 'uppercase',
										fontWeight: '700',
										marginBottom: '4px',
										display: 'block',
									}}
								>
									{article.category}
								</Link>
								<h4>
									<Link href={`/article/${article.slug}`}>{article.title}</Link>
								</h4>
								<div className='article-meta' style={{ marginTop: '6px' }}>
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
		</section>
	)
}

export default DontMiss
