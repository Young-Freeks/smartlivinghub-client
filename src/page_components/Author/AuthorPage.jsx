'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Sidebar from '../../components/Sidebar/Sidebar'
import '../Category/CategoryPage.css'
import './AuthorPage.css'

const AuthorPage = ({
	authorData,
	authorArticles = [],
	recentArticles = [],
	totalPages = 1,
	currentPage = 1,
	slug,
}) => {
	const router = useRouter()

	const author = {
		name: authorData?.name || decodeURIComponent(slug.replace(/-/g, ' ')),
		avatar:
			authorData?.avatar ||
			(authorArticles.length > 0 && authorArticles[0].authorAvatar) ||
			`https://ui-avatars.com/api/?name=${encodeURIComponent(slug)}&background=random&color=fff&size=500`,
		postsCount: authorArticles.length > 0 ? authorArticles.length : 0,
		description:
			authorData?.bio ||
			'Newspaper is your news, entertainment, music fashion website. We provide you with the latest breaking news and videos straight from the entertainment industry.',
		socials: [
			{ platform: 'f', link: '#' },
			{ platform: 'in', link: '#' },
			{ platform: 'X', link: '#' },
			{ platform: 'yt', link: '#' },
		],
	}

	const mainArticles =
		authorArticles.length > 0 ? authorArticles : recentArticles.slice(0, 10)

	let exclusiveArticles = mainArticles.filter(a => a.isExclusive).slice(0, 3)
	if (exclusiveArticles.length === 0) {
		exclusiveArticles = mainArticles.slice(0, 3)
	}

	const handlePageChange = newPage => {
		if (newPage >= 1 && newPage <= totalPages) {
			router.push(`/author/${slug}?page=${newPage}`, { scroll: false })
		}
	}

	return (
		<div className='author-page'>
			{/* Author Header Area Layout from Demo */}
			<section className='author-header-banner'>
				<div className='container'>
					<div className='author-header-grid'>
						{/* Left: Huge Avatar */}
						<div className='author-avatar-col'>
							<img
								src={author.avatar}
								alt={author.name}
								className='author-main-avatar'
							/>
						</div>

						{/* Right: Author Info & Exclusive Articles */}
						<div className='author-info-col'>
							<div className='author-title-row'>
								<h1 className='author-name'>{author.name}</h1>
								<span className='author-post-count'>
									{author.postsCount} POSTS
								</span>
							</div>

							<p className='author-description'>{author.description}</p>

							<h4 className='author-exclusive-title'>Exclusive articles:</h4>
							<div className='author-exclusive-row'>
								{exclusiveArticles.map((article, idx) => (
									<article key={`ex-${idx}`} className='author-ex-card'>
										<div className='author-ex-content'>
											<span className='author-ex-badge'>EXCLUSIVE</span>
											<h5 className='author-ex-headline'>
												<Link href={`/article/${article.slug}`}>
													{article.title}
												</Link>
											</h5>
											<span className='author-ex-cat'>
												{article.category.toUpperCase()}
											</span>
										</div>
										<Link
											href={`/article/${article.slug}`}
											className='author-ex-img-wrap image-wrapper'
										>
											<img src={article.image} alt={article.title} />
										</Link>
									</article>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Main Article Feed and Sidebar (Similar to Category Page) */}
			<section className='author-main-wrapper container'>
				<div className='author-feed-column'>
					<div className='category-feed-list'>
						{authorArticles.map(article => (
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

					{/* Pagination from Strapi */}
					{totalPages > 1 && (
						<div className='category-pagination'>
							<button
								className='page-numbers prev'
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
								style={{ display: currentPage === 1 ? 'none' : 'inline-block' }}
							>
								← Prev
							</button>

							{Array.from({ length: totalPages }).map((_, i) => (
								<button
									key={i + 1}
									className={`page-numbers ${currentPage === i + 1 ? 'current' : ''}`}
									onClick={() => handlePageChange(i + 1)}
								>
									{i + 1}
								</button>
							))}

							<button
								className='page-numbers next'
								onClick={() => handlePageChange(currentPage + 1)}
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

				<aside className='sidebar-column'>
					<Sidebar />
				</aside>
			</section>
		</div>
	)
}

export default AuthorPage
