import React from 'react'
import Link from 'next/link'
import './CategorySection.css'

const CategorySection = ({ categoryName, articles }) => {
	if (!articles || articles.length === 0) return null

	// We want exactly 4 main articles, one per column. No sub-lists.
	const cols = [
		{ main: articles[0] },
		{ main: articles[1] },
		{ main: articles[2] },
		{ main: articles[3] },
	]

	return (
		<section className='cat-section-wrapper'>
			<div className='cat-split-bg'></div>
			<div className='cat-section-4col container'>
				<div className='cat-header-row'>
					<h2 className='cat-header-title'>{categoryName}</h2>
					<Link
						href={`/category/${categoryName.toLowerCase()}`}
						className='cat-header-view-all'
					>
						VIEW ALL →
					</Link>
				</div>

				<div className='cat-grid-4col'>
					{cols.map((col, cIdx) => {
						if (!col.main) return null
						return (
							<div className='cat-grid-column' key={`cat-${cIdx}`}>
								<div className='cat-grid-card'>
									<Link
										href={`/article/${col.main.slug}`}
										className='image-wrapper'
									>
										<img src={col.main.image} alt={col.main.title} />
									</Link>
									<h3>
										<Link href={`/article/${col.main.slug}`}>
											{col.main.title}
										</Link>
									</h3>
									<div
										className='article-meta'
										style={{ marginTop: '0', marginBottom: '10px' }}
									>
										<Link
											href={`/author/${col.main.authorSlug}`}
											className='author-info'
										>
											<img
												src={col.main.authorAvatar}
												alt={col.main.author}
												className='author-avatar'
											/>
											<span>{col.main.author}</span>
										</Link>
										<span className='meta-separator'>-</span>
										<span className='meta-item meta-date'>{col.main.date}</span>
										<span className='meta-separator'>-</span>
										<span className='meta-item meta-views'>
											{col.main.views?.toLocaleString()} views
										</span>
									</div>
								</div>

								{col.list && col.list.length > 0 && (
									<div className='cat-list-small'>
										{col.list.map((sm, sIdx) => {
											if (!sm) return null
											return (
												<div className='cat-list-item' key={`sm-${sIdx}`}>
													<div style={{ flex: 1 }}>
														<h4>
															<Link href={`/article/${sm.slug}`}>
																{sm.title}
															</Link>
														</h4>
														<div
															className='article-meta'
															style={{ marginTop: '4px' }}
														>
															<span className='meta-item meta-date'>
																{sm.date}
															</span>
															<span className='meta-separator'>-</span>
															<span className='meta-item meta-views'>
																{sm.views?.toLocaleString()} views
															</span>
														</div>
													</div>
													{/* Optional tiny square image for sub-articles */}
												</div>
											)
										})}
									</div>
								)}
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default CategorySection
