import AuthorPage from '@/page_components/Author/AuthorPage'
import {
	fetchArticlesByAuthor,
	fetchArticles,
	fetchAuthorDetailsBySlug,
} from '@/services/api'

// Enable Next.js ISR caching
export const revalidate = 60

export async function generateMetadata({ params }) {
	const p = await params
	const slug = p.slug

	const author = await fetchAuthorDetailsBySlug(slug)

	if (!author) {
		return {
			title: 'Author Not Found',
		}
	}

	return {
		title: `Articles by ${author.name}`,
		description:
			author.bio ||
			`Read all articles written by ${author.name} on Smart Living Hub Portal.`,
		openGraph: {
			title: `Articles by ${author.name} | Smart Living Hub Portal`,
			description:
				author.bio ||
				`Explore the latest insights and stories from ${author.name}.`,
			url: `https://smartlivinghub.info/author/${slug}`,
			images: author.avatar
				? [
						{
							url: author.avatar,
							width: 500,
							height: 500,
							alt: author.name,
						},
					]
				: [],
			type: 'profile',
		},
		twitter: {
			card: 'summary',
			title: `Articles by ${author.name}`,
			description: author.bio,
			images: author.avatar ? [author.avatar] : [],
		},
	}
}

export default async function Page({ params, searchParams }) {
	// Await the destructured slug and page from URL parameters
	const p = await params
	const s = await searchParams
	const slug = p.slug
	const currentPage = parseInt(s.page) || 1

	// Parallel data fetching on Server
	const [fetchedAuthor, articlesResult, recentData] = await Promise.all([
		fetchAuthorDetailsBySlug(slug),
		fetchArticlesByAuthor(slug, currentPage),
		fetchArticles(), // Fallback if author has no articles for sidebar/bottom
	])

	const authorData = fetchedAuthor
	const authorArticles = articlesResult.articles || []
	const totalPages = articlesResult.meta?.pageCount || 1
	const totalArticles = articlesResult.meta?.total || 0
	const recentArticles = recentData || []

	// Pass pre-fetched server data down to the Client View Component
	return (
		<AuthorPage
			authorData={authorData}
			authorArticles={authorArticles}
			recentArticles={recentArticles}
			totalPages={totalPages}
			totalArticles={totalArticles}
			currentPage={currentPage}
			slug={slug}
		/>
	)
}
