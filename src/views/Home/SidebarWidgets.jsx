import React from 'react'
import Link from 'next/link'
import './SidebarWidgets.css'

export const StayConnectedWidget = () => (
	<div className='widget social-widget'>
		<div className='block-header'>
			<span className='block-title'>STAY CONNECTED</span>
		</div>
		<div className='social-grid'>
			<a href='#' className='social-item facebook'>
				<span className='count'>24,5K</span>
				<span className='label'>Fans</span>
			</a>
			<a href='#' className='social-item twitter'>
				<span className='count'>18,2K</span>
				<span className='label'>Followers</span>
			</a>
			<a href='#' className='social-item youtube'>
				<span className='count'>54,1K</span>
				<span className='label'>Subscribers</span>
			</a>
		</div>
	</div>
)

export const AdWidget = () => (
	<div className='widget ad-widget'>
		<div className='ad-placeholder'>- Advertisement -</div>
	</div>
)

export const RecentPostsWidget = ({ articles, title = 'RECENT POSTS' }) => (
	<div className='widget'>
		<div className='block-header'>
			<span className='block-title'>{title}</span>
		</div>
		<div className='recent-posts-list'>
			{articles.slice(0, 4).map(article => (
				<div className='recent-post-item' key={article.id}>
					<Link href={`/article/${article.slug}`} className='image-wrapper'>
						<img src={article.image} alt={article.title} />
					</Link>
					<div className='recent-info'>
						<h5>
							<Link href={`/article/${article.slug}`}>{article.title}</Link>
						</h5>
						<div className='article-meta'>
							<span>{article.date}</span>
							<span>-</span>
							<span>{article.views?.toLocaleString()} views</span>
						</div>
					</div>
				</div>
			))}
		</div>
	</div>
)
