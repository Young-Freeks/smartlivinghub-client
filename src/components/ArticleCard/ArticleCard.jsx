import Link from 'next/link'
import './ArticleCard.css'

const ArticleCard = ({ article, compact = false }) => {
	if (!article) return null

	return (
		<article className={`article-card ${compact ? 'compact' : 'standard'}`}>
			<Link
				href={`/${article.category.toLowerCase()}/${article.id}`}
				className='card-image-link'
			>
				<div
					className='card-image'
					style={{ backgroundImage: `url(${article.image})` }}
				></div>
			</Link>
			<div className='card-content'>
				<Link
					href={`/${article.category.toLowerCase()}`}
					className={`category-tag tag-${article.category.toLowerCase()}`}
				>
					{article.category}
				</Link>
				<h3 className='card-title'>
					<Link href={`/${article.category.toLowerCase()}/${article.id}`}>
						{article.title}
					</Link>
				</h3>
				<div className='article-meta'>
					<Link href={`/author/${article.authorSlug}`} className='author-info'>
						<span>{article.author}</span>
					</Link>
					<span className='meta-separator'>-</span>
					<span className='meta-item meta-date'>{article.date}</span>
					<span className='meta-separator'>-</span>
					<span className='meta-item meta-views'>
						{article.views?.toLocaleString()} views
					</span>
				</div>
				{!compact && (
					<div className='card-excerpt'>
						{article.content.substring(0, 100)}...
					</div>
				)}
			</div>
		</article>
	)
}

export default ArticleCard
