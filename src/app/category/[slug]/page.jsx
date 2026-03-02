import CategoryPage from '@/page_components/Category/CategoryPage'
import { fetchArticlesByCategory } from '@/services/api'

// Enable Next.js ISR caching
export const revalidate = 60

export async function generateMetadata({ params }) {
	const p = await params
	const slug = p.slug

	// We only need the slug for the basic category SEO
	const capitalizedSlug =
		slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ')

	return {
		title: `${capitalizedSlug} News & Articles`,
		description: `Read the latest articles and breaking news about ${capitalizedSlug} on Smart Living Hub Portal.`,
		openGraph: {
			title: `${capitalizedSlug} News & Articles`,
			description: `Read the latest articles and breaking news about ${capitalizedSlug} on Smart Living Hub Portal.`,
			url: `https://smartlivinghub.info/category/${slug}`,
			type: 'website',
		},
	}
}

export default async function Page({ params, searchParams }) {
	// Await the destructured slug and page from URL parameters
	const p = await params
	const s = await searchParams
	const slug = p.slug
	const currentPage = parseInt(s.page) || 1

	// Fetch data asynchronously on the server
	const data = await fetchArticlesByCategory(slug, currentPage)

	const categoryArticles = data.articles || []
	const totalPages = data.meta?.pageCount || 1

	// Pass pre-fetched server data down to the Client View Component
	return (
		<CategoryPage
			categoryArticles={categoryArticles}
			totalPages={totalPages}
			currentPage={currentPage}
			slug={slug}
		/>
	)
}
