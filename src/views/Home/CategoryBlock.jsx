import React from 'react'
import Link from 'next/link'
import './CategoryBlock.css'

const CategoryBlock = ({ categoryName, articles }) => {
	if (!articles || articles.length === 0) return null

	return (
		<section className='category-block'>
			<div
				className='block-header'
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<span
					className='block-title'
					style={{
						backgroundColor: 'var(--primary-color)',
					}}
				>
					{categoryName.toUpperCase()}
				</span>
				<Link
					href={`/category/${categoryName.toLowerCase()}`}
					style={{
						fontSize: '13px',
						fontWeight: '700',
						color: 'var(--text-dark)',
						textDecoration: 'none',
					}}
				>
					VIEW ALL →
				</Link>
			</div>
			<div className='category-block-grid'>
				{articles.slice(0, 3).map(article => (
					<div className='article-card' key={article.id}>
						<Link href={`/article/${article.slug}`} className='image-wrapper'>
							<img src={article.image} alt={article.title} />
						</Link>
						<div className='cb-content'>
							<h3>
								<Link href={`/article/${article.slug}`}>{article.title}</Link>
							</h3>
							<div className='article-meta'>
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
								<span>-</span>
								<span>{article.date}</span>
								<span>-</span>
								<span>{article.views?.toLocaleString()} views</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default CategoryBlock
