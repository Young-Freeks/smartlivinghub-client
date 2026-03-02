'use client'
import React from 'react'
import Link from 'next/link'
import Sidebar from '../../components/Sidebar/Sidebar'
import './ArticlePage.css'
import {
	FaFacebookF,
	FaTwitter,
	FaPinterestP,
	FaWhatsapp,
	FaVk,
	FaEnvelope,
	FaAngleLeft,
	FaAngleRight,
} from 'react-icons/fa'

const ArticlePage = ({
	article,
	relatedArticles = [],
	allArticles = [],
	slug,
}) => {
	if (!article) return <div className='container'>Article not found.</div>

	// Helper to render Strapi rich text blocks safely
	const renderContent = contentBlocks => {
		if (!contentBlocks || !Array.isArray(contentBlocks)) return null

		return contentBlocks.map((block, index) => {
			if (block.type === 'paragraph') {
				return (
					<p key={index}>
						{block.children.map((child, childIndex) => {
							if (child.type === 'text') return child.text
							if (child.type === 'link')
								return (
									<a href={child.url} key={childIndex}>
										{child.children[0]?.text}
									</a>
								)
							return null
						})}
					</p>
				)
			}
			if (block.type === 'heading') {
				const HeadingTag = `h${block.level}`
				return (
					<HeadingTag key={index}>
						{block.children.map(child => child.text).join('')}
					</HeadingTag>
				)
			}
			if (block.type === 'quote') {
				return (
					<blockquote key={index}>
						{block.children.map(child => child.text).join('')}
					</blockquote>
				)
			}
			if (block.type === 'list') {
				const ListTag = block.format === 'ordered' ? 'ol' : 'ul'
				return (
					<ListTag key={index}>
						{block.children.map((listItem, liIndex) => (
							<li key={liIndex}>
								{listItem.children.map(child => child.text).join('')}
							</li>
						))}
					</ListTag>
				)
			}
			return null
		})
	}

	// Calculate Prev/Next articles
	const currentIndex = allArticles.findIndex(a => a.id === article?.id)
	const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null
	const nextArticle =
		currentIndex >= 0 && currentIndex < allArticles.length - 1
			? allArticles[currentIndex + 1]
			: null

	// Helper for interleaving images safely between paragraphs
	const paragraphsIndices = []
	if (article?.content) {
		article.content.forEach((block, idx) => {
			if (block.type === 'paragraph') paragraphsIndices.push(idx)
		})
	}

	let split1 = 0
	let split2 = 0
	if (paragraphsIndices.length >= 2) {
		// Put images after 1st third of paragraphs and 2nd third of paragraphs
		const p1Third = Math.floor(paragraphsIndices.length / 3)
		const p2Third = Math.floor((paragraphsIndices.length * 2) / 3)

		split1 = paragraphsIndices[Math.max(0, p1Third)] + 1
		split2 = paragraphsIndices[Math.max(0, p2Third)] + 1
	} else if (paragraphsIndices.length === 1) {
		split1 = paragraphsIndices[0] + 1
		split2 = article?.content ? article.content.length : 0
	} else {
		// Fallback
		const contentLength = article?.content ? article.content.length : 0
		split1 = Math.ceil(contentLength / 3)
		split2 = Math.ceil((contentLength * 2) / 3)
	}

	const firstPart = article?.content ? article.content.slice(0, split1) : []
	const secondPart = article?.content
		? article.content.slice(split1, split2)
		: []
	const thirdPart = article?.content ? article.content.slice(split2) : []

	return (
		<div className='article-page-wrapper'>
			{/* Combined Hero Section: Image Background + Header Content */}
			<section
				className='article-hero-section'
				style={{
					backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%), url(${article.featuredImage})`,
				}}
			>
				<div className='article-hero-content container'>
					<div
						className={`article-category-label`}
						style={{ backgroundColor: '#ec3535' }}
					>
						<Link href={`/category/${article.category.toLowerCase()}`}>
							{article.category}
						</Link>
					</div>

					<h1 className='article-title'>{article.title}</h1>

					<div className='article-meta-row'>
						<div className='article-author-info'>
							<Link
								href={`/author/${article.authorSlug}`}
								className='article-author-link'
								style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
							>
								<img
									src={article.authorAvatar}
									alt={article.author}
									className='author-avatar-small'
								/>
								<span className='article-author-name'>
									By <strong>{article.author}</strong>
								</span>
							</Link>
							<span className='meta-separator'>-</span>
							<span className='article-date'>{article.date}</span>
							<span className='meta-separator'>-</span>
							<span className='article-views'>
								{article.views?.toLocaleString()} views
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* Main Layout: Post Content + Sidebar */}
			<div className='article-main-container container'>
				<article className='article-content'>
					<div className='article-text-body'>
						{article.content ? (
							<>
								{renderContent(firstPart)}
								{article.contentImage1 && (
									<figure className='article-inline-image'>
										<img src={article.contentImage1} alt='Content Image 1' />
									</figure>
								)}
								{renderContent(secondPart)}
								{article.contentImage2 && (
									<figure className='article-inline-image'>
										<img src={article.contentImage2} alt='Content Image 2' />
									</figure>
								)}
								{renderContent(thirdPart)}
							</>
						) : (
							<>
								<p className='dropcap'>{article.excerpt}</p>
								{article.contentImage1 && (
									<figure className='article-inline-image'>
										<img src={article.contentImage1} alt='Content Image 1' />
									</figure>
								)}
								<p>
									This article was brought to you by SmartLivingHUB. The full
									content structure is loading properly from the backend.
								</p>
								{article.contentImage2 && (
									<figure className='article-inline-image'>
										<img src={article.contentImage2} alt='Content Image 2' />
									</figure>
								)}
								<p>
									Enjoy exploring more of our exclusive insights and expert
									viewpoints across the platform!
								</p>
							</>
						)}

						{/* Tags */}
						{article.tags && article.tags.length > 0 && (
							<div className='article-tags'>
								<span className='tag-label'>TAGS</span>
								{article.tags.map((tag, idx) => (
									<a href='#' className='tag-item' key={idx}>
										{tag}
									</a>
								))}
							</div>
						)}

						{/* Prev / Next Article */}
						<div className='article-nav'>
							{prevArticle ? (
								<Link
									href={`/article/${prevArticle.slug}`}
									className='article-nav-link prev'
								>
									<span className='nav-label'>
										<FaAngleLeft /> PREVIOUS ARTICLE
									</span>
									<span className='nav-title'>{prevArticle.title}</span>
								</Link>
							) : (
								<div
									className='article-nav-link prev'
									style={{ visibility: 'hidden' }}
								></div>
							)}

							{nextArticle ? (
								<Link
									href={`/article/${nextArticle.slug}`}
									className='article-nav-link next'
								>
									<span className='nav-label'>
										NEXT ARTICLE <FaAngleRight />
									</span>
									<span className='nav-title'>{nextArticle.title}</span>
								</Link>
							) : (
								<div
									className='article-nav-link next'
									style={{ visibility: 'hidden' }}
								></div>
							)}
						</div>

						{/* Related Articles */}
						<div className='article-related'>
							<h3 className='related-title'>RELATED ARTICLES</h3>
							<div className='related-grid'>
								{relatedArticles.map((item, idx) => (
									<div className='related-item' key={idx}>
										<Link
											href={`/article/${item.slug}`}
											className='related-img image-wrapper'
										>
											<img src={item.image} alt={item.title} />
										</Link>
										<h4 className='related-item-title'>
											<Link href={`/article/${item.slug}`}>{item.title}</Link>
										</h4>
										<div
											className='article-meta'
											style={{ margin: 0, marginTop: '8px', flexWrap: 'wrap' }}
										>
											<span
												className='meta-item meta-author'
												style={{ color: 'var(--text-dark)', fontWeight: 600 }}
											>
												{item.author}
											</span>
											<span className='meta-separator'>-</span>
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
				</article>

				<aside className='article-sidebar'>
					<Sidebar />
				</aside>
			</div>
		</div>
	)
}

export default ArticlePage
