import React from 'react'
import Link from 'next/link'
import './HomeTopGrid.css'

const HomeTopGrid = ({ articles }) => {
	if (!articles || articles.length < 10) return null

	const freshStories = articles.slice(0, 5)
	const mainFeature = articles[5]
	const sideFeatures = articles.slice(6, 8)
	const popularList = articles.slice(8, 13)

	return (
		<section className='container home-top-grid'>
			{/* Left Column: Fresh Stories */}
			<div className='fresh-stories'>
				<h2 className='fresh-stories-title'>Fresh stories</h2>
				<span className='fresh-stories-subtitle'>
					TODAY: BROWSE OUR EDITOR'S HAND PICKED ARTICLES!
				</span>

				<div className='fresh-list'>
					{freshStories.map((item, idx) => (
						<div className='fresh-item' key={`fresh-${idx}`}>
							<h4>
								<Link href={`/article/${item.slug}`}>
									{idx === 2 ? (
										<span
											className='badge-exclusive'
											style={{ marginRight: '6px', fontSize: '9px' }}
										>
											EXCLUSIVE
										</span>
									) : null}
									{item.title}
								</Link>
							</h4>
							<div className='fresh-meta'>
								<span
									className='cat-text'
									style={{
										marginBottom: '5px',
										color: `var(--cat-${item.category.toLowerCase()})`,
										background: 'none',
										padding: 0,
										margin: 0,
										fontSize: '11px',
										fontWeight: 600,
									}}
								>
									{item.category}
								</span>
								<div className='article-meta' style={{ margin: 0 }}>
									<span className='meta-item meta-date'>{item.date}</span>
									<span className='meta-separator'>-</span>
									<span className='meta-item meta-views'>
										{item.views?.toLocaleString()} views
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Column 2: Main Featured Image */}
			<div className='main-featured'>
				<Link href={`/article/${mainFeature.slug}`} className='image-wrapper'>
					<img src={mainFeature.image} alt={mainFeature.title} />
				</Link>
				<div className='main-overlay'>
					<span
						className='cat-label'
						style={{ background: 'var(--primary-color)' }}
					>
						{mainFeature.category}
					</span>
					<h2 style={{ marginBottom: '10px' }}>
						<Link
							href={`/article/${mainFeature.slug}`}
							style={{ color: 'inherit', textDecoration: 'none' }}
						>
							{mainFeature.title}
						</Link>
					</h2>
					<div
						className='article-meta'
						style={{ marginBottom: '15px', color: '#fff' }}
					>
						<Link
							href={`/author/${mainFeature.authorSlug}`}
							className='author-info'
							style={{ color: '#fff' }}
						>
							<span>{mainFeature.author}</span>
						</Link>
						<span
							className='meta-separator'
							style={{ color: 'rgba(255,255,255,0.5)' }}
						>
							-
						</span>
						<span className='meta-item meta-date' style={{ color: '#eee' }}>
							{mainFeature.date}
						</span>
						<span
							className='meta-separator'
							style={{ color: 'rgba(255,255,255,0.5)' }}
						>
							-
						</span>
						<span className='meta-item meta-views' style={{ color: '#eee' }}>
							{mainFeature.views?.toLocaleString()} views
						</span>
					</div>
					<p>{mainFeature.excerpt}</p>
				</div>
			</div>

			{/* Column 3: Two stacked picture articles */}
			<div className='side-featured-col'>
				{sideFeatures.map((item, idx) => (
					<div className='side-featured-card' key={`side-${idx}`}>
						<Link href={`/article/${item.slug}`} className='image-wrapper'>
							<img src={item.image} alt={item.title} />
							<span className='cat-label'>{item.category}</span>
						</Link>
						<h3 style={{ marginBottom: '5px' }}>
							<Link href={`/article/${item.slug}`}>{item.title}</Link>
						</h3>
						<div className='article-meta' style={{ margin: 0 }}>
							<span className='meta-item meta-date'>{item.date}</span>
							<span className='meta-separator'>-</span>
							<span className='meta-item meta-views'>
								{item.views?.toLocaleString()} views
							</span>
						</div>
					</div>
				))}
			</div>

			{/* Column 4: Popular (List Card only) */}
			<div className='popular-col'>
				<h2 className='popular-header'>Popular</h2>
				<div className='popular-list-card'>
					<div className='fresh-list'>
						{popularList.map((item, idx) => (
							<div className='popular-list-item' key={`pop-${idx}`}>
								<div className='fresh-meta' style={{ marginBottom: '5px' }}>
									<span
										className='cat-text'
										style={{
											color: `var(--cat-${item.category.toLowerCase()})`,
										}}
									>
										{item.category}
									</span>
								</div>
								<h4>
									<Link href={`/article/${item.slug}`}>
										{idx === 0 || idx === 3 ? (
											<span
												className='badge-exclusive'
												style={{ marginRight: '6px' }}
											>
												EXCLUSIVE
											</span>
										) : null}
										{item.title}
									</Link>
								</h4>
								<div className='article-meta' style={{ margin: 0 }}>
									<span className='meta-item meta-date'>{item.date}</span>
									<span className='meta-separator'>-</span>
									<span className='meta-item meta-views'>
										{item.views?.toLocaleString()} views
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

export default HomeTopGrid
