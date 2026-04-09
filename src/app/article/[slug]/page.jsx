import ArticlePage from '@/page_components/Article/ArticlePage'
import { fetchArticleBySlug, fetchArticles } from '@/services/api'

// Enable Next.js ISR caching
export const revalidate = 60

export async function generateMetadata({ params }) {
	const p = await params
	const slug = p.slug
	const article = await fetchArticleBySlug(slug)

	if (!article) {
		return {
			title: 'Article Not Found',
		}
	}

	return {
		title: article.title,
		description: article.excerpt,
		alternates: {
			canonical: `/article/${slug}`,
		},
		openGraph: {
			title: article.title,
			description: article.excerpt,
			url: `https://smartlivinghub.info/article/${slug}`,
			images: [
				{
					url: article.image || article.featuredImage,
					width: 1200,
					height: 630,
					alt: article.title,
				},
			],
			type: 'article',
			publishedTime: article.date,
			authors: [article.author],
		},
		twitter: {
			card: 'summary_large_image',
			title: article.title,
			description: article.excerpt,
			images: [article.image || article.featuredImage],
		},
	}
}

export default async function Page({ params }) {
	const p = await params
	const slug = p.slug

	// Fetch article and general articles list from the Server
	const [fetchedArticle, allArticlesData] = await Promise.all([
		fetchArticleBySlug(slug),
		fetchArticles(),
	])

	const article = fetchedArticle
	const allArticles = allArticlesData || []
	let relatedArticles = []

	if (fetchedArticle) {
		const related = allArticles
			.filter(
				a =>
					a.category === fetchedArticle.category && a.id !== fetchedArticle.id,
			)
			.slice(0, 3)

		relatedArticles =
			related.length > 0
				? related
				: allArticles.filter(a => a.id !== fetchedArticle.id).slice(0, 3)
	}

	// Prepare JSON-LD schema
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'NewsArticle',
		headline: article?.title,
		image: [article?.featuredImage || article?.image],
		datePublished: article?.date ? new Date(article.date).toISOString() : new Date().toISOString(),
		dateModified: article?.date ? new Date(article.date).toISOString() : new Date().toISOString(),
		author: [
			{
				'@type': 'Person',
				name: article?.author || 'Smart Living Hub Team',
				url: `https://smartlivinghub.info/author/${article?.authorSlug || ''}`,
			},
		],
	}

	// Pass pre-fetched server data down to the Client View Component
	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<ArticlePage
				article={article}
				relatedArticles={relatedArticles}
				allArticles={allArticles}
				slug={slug}
			/>
		</>
	)
}
