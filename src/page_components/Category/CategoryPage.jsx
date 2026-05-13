'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Sidebar from '../../components/Sidebar/Sidebar'
import './CategoryPage.css'

const CategoryPage = ({
	categoryArticles = [],
	totalPages = 1,
	currentPage = 1,
	slug,
}) => {
	const router = useRouter()

	// Determine category display name
	const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1)

	// Get 4 featured articles for the top grid only on page 1
	const featuredArticles =
		currentPage === 1
			? categoryArticles.slice(0, Math.min(4, categoryArticles.length))
			: []

	// Get remaining articles for the main feed
	const currentFeedArticles =
		currentPage === 1
			? categoryArticles.slice(Math.min(4, categoryArticles.length))
			: categoryArticles

	const paginate = pageNumber => {
		router.push(`/category/${slug}?page=${pageNumber}`, { scroll: false })
		// Scroll to top of the feed, not top of the whole page
		window.scrollTo({ top: 400, behavior: 'smooth' })
	}

	// Smart pagination: show at most 5 pages with ellipsis
	const getPageNumbers = () => {
		if (totalPages <= 7) {
			return Array.from({ length: totalPages }, (_, i) => i + 1)
		}
		const pages = []
		const delta = 2
		const left = Math.max(2, currentPage - delta)
		const right = Math.min(totalPages - 1, currentPage + delta)

		pages.push(1)
		if (left > 2) pages.push('...')
		for (let i = left; i <= right; i++) pages.push(i)
		if (right < totalPages - 1) pages.push('...')
		pages.push(totalPages)
		return pages
	}

	return (
		<div className='category-page'>
			{/* 1. Category Header Banner */}
			<section className='category-header-banner'>
				<div className='container'>
					<h1 className='category-title-main'>{categoryName}</h1>
				</div>
			</section>

			{/* 2. Top Featured Grid (4 Columns) */}
			{featuredArticles.length > 0 && (
				<section className='category-featured-grid container'>
					{featuredArticles.map(article => (
						<article key={article.id} className='cat-featured-card'>
							<Link href={`/article/${article.slug}`} className='image-wrapper'>
								<img src={article.image} alt={article.title} />
								<div className='cat-featured-overlay'>
									<span
										className='category-label'
										style={{
											backgroundColor: 'var(--primary-color)',
										}}
									>
										{article.category}
									</span>
									<h3 className='cat-featured-title'>{article.title}</h3>
								</div>
							</Link>
						</article>
					))}
				</section>
			)}

			{/* 3. Main Feed + Sidebar Layout */}
			<section className='category-main-content container'>
				<div className='category-feed-column'>
					{currentFeedArticles.length > 0 ? (
						<div className='category-feed-list'>
							{currentFeedArticles.map(article => (
								<article key={article.id} className='cat-list-item'>
									<Link
										href={`/article/${article.slug}`}
										className='cat-list-image-wrap image-wrapper'
										style={{ width: '100%', height: '230px', display: 'block' }}
									>
										<img
											src={article.image}
											alt={article.title}
											style={{
												width: '100%',
												height: '100%',
												objectFit: 'cover',
												display: 'block',
											}}
										/>
									</Link>
									<div className='cat-list-content'>
										<h2 className='cat-list-title'>
											<Link href={`/article/${article.slug}`}>
												{article.title}
											</Link>
										</h2>
										<div className='cat-list-meta'>
											<Link
												href={`/author/${article.authorSlug}`}
												className='cat-list-author'
												style={{ textDecoration: 'none' }}
											>
												<img
													src={article.authorAvatar}
													alt='author'
													className='author-avatar-small'
												/>
												<span>{article.author}</span>
											</Link>
											<span className='meta-separator'>-</span>
											<span className='cat-list-date'>{article.date}</span>
											<span className='cat-list-date'>
												- {article.views?.toLocaleString()} views
											</span>
										</div>
										<p className='cat-list-excerpt'>
											{article.excerpt ||
												"Find people with high expectations and a low tolerance for excuses. They'll have higher expectations for you than you have for yourself. Don't flatter..."}
										</p>
									</div>
								</article>
							))}
						</div>
					) : (
						<p className='no-articles-msg'>
							No more articles found in this category.
						</p>
					)}

					{/* Pagination from Strapi */}
					{totalPages > 1 && (
						<div className='category-pagination'>
							<button
								className='page-numbers prev'
								onClick={() => paginate(currentPage - 1)}
								disabled={currentPage === 1}
								style={{ display: currentPage === 1 ? 'none' : 'inline-block' }}
							>
								← Prev
							</button>

							{getPageNumbers().map((page, i) =>
								page === '...' ? (
									<span key={`ellipsis-${i}`} className='page-numbers page-ellipsis'>
										&hellip;
									</span>
								) : (
									<button
										key={page}
										className={`page-numbers ${currentPage === page ? 'current' : ''}`}
										onClick={() => paginate(page)}
									>
										{page}
									</button>
								)
							)}

							<button
								className='page-numbers next'
								onClick={() => paginate(currentPage + 1)}
								disabled={currentPage === totalPages}
								style={{
									display: currentPage === totalPages ? 'none' : 'inline-block',
								}}
							>
								Next →
							</button>
						</div>
					)}
				</div>

				{/* Sidebar */}
				<aside className='sidebar-column'>
					<Sidebar />
				</aside>
			</section>
		</div>
	)
}

export default CategoryPage
