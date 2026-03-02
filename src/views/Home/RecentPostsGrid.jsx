import React from 'react'
import Link from 'next/link'
import './RecentPostsGrid.css'

const RecentPostsGrid = ({ articles }) => {
	if (!articles || articles.length < 10) return null

	const col1Tall = articles[0]
	const col1Small = articles.slice(1, 4)

	const col2Tall = articles[4]
	const col2Small = articles.slice(5, 8)

	const col3Overlay = articles[8]
	const col3List = articles.slice(9, 13) // Simple text list on the right

	return (
		<section className='recent-posts-section container'>
			<div className='latest-header'>
				<span className='latest-watermark'>LATEST</span>
				<h2 className='latest-title'>Recent posts</h2>
			</div>

			<div className='recent-grid'>
				{/* Column 1 */}
				<div>
					<div className='mixed-article-card mixed-tall'>
						<Link href={`/article/${col1Tall.slug}`} className='image-wrapper'>
							<img src={col1Tall.image} alt={col1Tall.title} />
						</Link>
						<div style={{ marginTop: '15px', marginBottom: '10px' }}>
							<span className='cat-label'>{col1Tall.category}</span>
						</div>
						<h3 style={{ fontSize: '26px', marginBottom: '10px' }}>
							<Link href={`/article/${col1Tall.slug}`}>{col1Tall.title}</Link>
						</h3>
						<div
							className='mixed-meta'
							style={{
								marginBottom: '15px',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Link
								href={`/author/${col1Tall.authorSlug}`}
								className='cat-list-author'
								style={{ textDecoration: 'none' }}
							>
								<img
									src={col1Tall.authorAvatar}
									alt={col1Tall.author}
									className='author-avatar-small'
								/>
								<span>{col1Tall.author}</span>
							</Link>
							<span style={{ marginLeft: '10px' }}>- {col1Tall.date}</span>
						</div>
					</div>
					{col1Small.map((article, idx) => (
						<div className='mixed-small' key={`c1s-${idx}`}>
							<Link href={`/article/${article.slug}`} className='image-wrapper'>
								<img src={article.image} alt={article.title} />
							</Link>
							<div>
								<h4>
									<Link href={`/article/${article.slug}`}>{article.title}</Link>
								</h4>
								<div
									className='mixed-meta'
									style={{ display: 'flex', alignItems: 'center' }}
								>
									<Link
										href={`/category/${article.category.toLowerCase()}`}
										className='cat-text'
										style={{ marginRight: '15px' }}
									>
										{article.category}
									</Link>
									<Link
										href={`/author/${article.authorSlug}`}
										className='cat-list-author'
										style={{ textDecoration: 'none' }}
									>
										<img
											src={article.authorAvatar}
											alt={article.author}
											className='author-avatar-small'
										/>
										<span>{article.author}</span>
									</Link>
									<span style={{ marginLeft: '10px' }}>- {article.date}</span>
									<span style={{ marginLeft: '10px' }}>
										- {article.views?.toLocaleString()} views
									</span>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Column 2 */}
				<div>
					<div className='mixed-article-card mixed-tall'>
						<Link href={`/article/${col2Tall.slug}`} className='image-wrapper'>
							<img src={col2Tall.image} alt={col2Tall.title} />
						</Link>
						<div style={{ marginTop: '15px', marginBottom: '10px' }}>
							<span className='cat-label'>{col2Tall.category}</span>
						</div>
						<h3 style={{ fontSize: '26px', marginBottom: '10px' }}>
							<Link href={`/article/${col2Tall.slug}`}>{col2Tall.title}</Link>
						</h3>
						<div
							className='mixed-meta'
							style={{
								marginBottom: '15px',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Link
								href={`/author/${col2Tall.authorSlug}`}
								className='cat-list-author'
								style={{ textDecoration: 'none' }}
							>
								<img
									src={col2Tall.authorAvatar}
									alt={col2Tall.author}
									className='author-avatar-small'
								/>
								<span>{col2Tall.author}</span>
							</Link>
							<span style={{ marginLeft: '10px' }}>- {col2Tall.date}</span>
						</div>
						<p
							style={{
								fontSize: '14px',
								color: 'var(--text-muted)',
								lineHeight: '1.5',
								marginBottom: '20px',
							}}
						>
							Find people with high expectations and a low tolerance for
							excuses. They'll have higher expectations for you than you have
							for yourself. Don't flatter...
						</p>
					</div>
					{col2Small.map((article, idx) => (
						<div className='mixed-small' key={`c2s-${idx}`}>
							<Link href={`/article/${article.slug}`} className='image-wrapper'>
								<img src={article.image} alt={article.title} />
							</Link>
							<div>
								<h4>
									<Link href={`/article/${article.slug}`}>
										{idx === 0 ? (
											<span className='badge-exclusive'>EXCLUSIVE</span>
										) : null}
										{article.title}
									</Link>
								</h4>
								<div
									className='mixed-meta'
									style={{ display: 'flex', alignItems: 'center' }}
								>
									<Link
										href={`/author/${article.authorSlug}`}
										className='cat-list-author'
										style={{ textDecoration: 'none' }}
									>
										<img
											src={article.authorAvatar}
											alt={article.author}
											className='author-avatar-small'
										/>
										<span>{article.author}</span>
									</Link>
									<span style={{ marginLeft: '10px' }}>- {article.date}</span>
									<span style={{ marginLeft: '10px' }}>
										- {article.views?.toLocaleString()} views
									</span>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Column 3: The Dark Overlay Card + List */}
				<div>
					<div className='dark-overlay-card' style={{ marginBottom: '20px' }}>
						<Link
							href={`/article/${col3Overlay.slug}`}
							className='image-wrapper'
						>
							<img src={col3Overlay.image} alt={col3Overlay.title} />
						</Link>
						<span className='cat-label-top'>{col3Overlay.category}</span>
						<div className='doc-content'>
							<h3>
								<Link href={`/article/${col3Overlay.slug}`}>
									{col3Overlay.title}
								</Link>
							</h3>
							<div
								className='mixed-meta'
								style={{ display: 'flex', alignItems: 'center' }}
							>
								<Link
									href={`/author/${col3Overlay.authorSlug}`}
									className='cat-list-author'
									style={{ textDecoration: 'none', color: '#ddd' }}
								>
									<span>{col3Overlay.author}</span>
								</Link>
								<span style={{ marginLeft: '10px' }}>- {col3Overlay.date}</span>
							</div>
						</div>
					</div>

					<div className='fresh-list' style={{ gap: '15px' }}>
						{col3List.map((article, idx) => (
							<div
								key={`c3l-${idx}`}
								style={{
									paddingBottom: '15px',
									borderBottom: '1px solid var(--border-color)',
								}}
							>
								<h5
									style={{
										fontSize: '15px',
										lineHeight: '1.4',
										marginBottom: '5px',
									}}
								>
									<Link href={`/article/${article.slug}`}>{article.title}</Link>
								</h5>
								<div
									className='mixed-meta'
									style={{ display: 'flex', alignItems: 'center' }}
								>
									<Link
										href={`/category/${article.category.toLowerCase()}`}
										className='cat-text'
										style={{ marginRight: '15px' }}
									>
										{article.category}
									</Link>

									<Link
										href={`/author/${article.authorSlug}`}
										className='cat-list-author'
										style={{ textDecoration: 'none', marginRight: '10px' }}
									>
										<img
											src={article.authorAvatar}
											alt={article.author}
											className='author-avatar-small'
										/>
										<span>{article.author}</span>
									</Link>

									<span>- {article.date}</span>
									<span style={{ marginLeft: '10px' }}>
										- {article.views?.toLocaleString()} views
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

export default RecentPostsGrid
