import Home from '@/page_components/Home/Home'
import { fetchArticles } from '@/services/api'

// Enable Next.js ISR caching (revalidate every 60 seconds)
export const revalidate = 60

export default async function Page() {
	// Fetch data asynchronously on the server during the initial request
	const articlesData = await fetchArticles()

	// Pass pre-fetched server data down to the Client View Component
	return <Home articlesData={articlesData} />
}
