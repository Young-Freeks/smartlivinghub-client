import { fetchArticles } from '@/services/api'

export default async function sitemap() {
	const baseUrl = 'https://smartlivinghub.info'

	// Get all articles
	const articles = await fetchArticles()

	// Base static routes
	const routes = [
		'',
		'/about',
		'/contact',
		'/privacy-policy',
		'/terms-of-service',
	].map(route => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date().toISOString(),
		changeFrequency: 'weekly',
		priority: route === '' ? 1.0 : 0.8,
	}))

	// Article routes
	const articleRoutes = articles.map(article => ({
		url: `${baseUrl}/article/${article.slug}`,
		lastModified: new Date(article.date).toISOString(),
		changeFrequency: 'never',
		priority: 0.9,
	}))

	// Extract unique categories and authors from articles
	const categories = [
		...new Set(articles.map(a => a.category?.toLowerCase() || 'tech')),
	]
	const authors = [...new Set(articles.map(a => a.authorSlug))]

	// Category routes
	const categoryRoutes = categories.map(category => ({
		url: `${baseUrl}/category/${category.replace(/\s+/g, '-')}`,
		lastModified: new Date().toISOString(),
		changeFrequency: 'daily',
		priority: 0.7,
	}))

	// Author routes
	const authorRoutes = authors.map(authorSlug => ({
		url: `${baseUrl}/author/${authorSlug}`,
		lastModified: new Date().toISOString(),
		changeFrequency: 'weekly',
		priority: 0.6,
	}))

	return [...routes, ...articleRoutes, ...categoryRoutes, ...authorRoutes]
}
