import Home from '@/page_components/Home/Home'
import { fetchArticles, fetchNewsArticles } from '@/services/api'

export const metadata = {
	alternates: {
		canonical: '/',
	},
}

// Enable Next.js ISR caching (revalidate every 60 seconds)
export const revalidate = 60

export default async function Page() {
	// Fetch data asynchronously on the server during the initial request
	const articlesData = await fetchArticles()
	const newsArticlesData = await fetchNewsArticles()

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Smart Living Hub Portal',
		url: 'https://smartlivinghub.info',
		description: 'The ultimate destination for Health, Tech, Wealth, and Home living.',
		potentialAction: {
			'@type': 'SearchAction',
			target: 'https://smartlivinghub.info/search?q={search_term_string}',
			'query-input': 'required name=search_term_string',
		},
	}

	// Pass pre-fetched server data down to the Client View Component
	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Home articlesData={articlesData} newsArticlesData={newsArticlesData} />
		</>
	)
}
