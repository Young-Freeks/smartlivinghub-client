import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN

const api = axios.create({
	baseURL: `${API_URL}/api`,
	headers: {
		Authorization: `Bearer ${API_TOKEN}`,
	},
})

const extractTextFromRichText = blocks => {
	if (!blocks) return ''
	if (typeof blocks === 'string') return blocks
	if (!Array.isArray(blocks)) return ''
	return blocks
		.map(block => {
			if (block.children) {
				return block.children.map(child => child.text || '').join('')
			}
			return ''
		})
		.join('\n')
}

// Helper function to format the article data exactly like mock data
const formatArticle = item => {
	// Format the date
	const dateObj = new Date(item.publishedAt || item.createdAt)
	const options = { year: 'numeric', month: 'long', day: 'numeric' }
	const formattedDate = dateObj.toLocaleDateString('en-US', options)

	// Get image URL
	let imageUrl =
		'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&w=1000&q=80' // default
	if (item.featuredImage && item.featuredImage.url) {
		imageUrl = item.featuredImage.url
	}

	// Calculate reading time or provide default excerpt if none
	const excerpt =
		item.description ||
		'An exclusive look into the most pressing trends of the year. Essential reading for anyone looking to stay ahead of the curve.'

	return {
		id: item.id.toString(),
		documentId: item.documentId,
		slug: item.slug,
		title: item.title,
		category: item.category?.name || 'Tech', // Fallback to Tech
		author: item.author?.name || 'Alex Carter', // Fallback to Alex Carter
		authorSlug: item.author?.slug || 'alex-carter',
		authorBio:
			extractTextFromRichText(item.author?.bio) ||
			'Newspaper is your news, entertainment, music fashion website. We provide you with the latest breaking news and videos straight from the entertainment industry.',
		authorAvatar:
			item.author?.avatar?.url ||
			`https://ui-avatars.com/api/?name=${encodeURIComponent(item.author?.name || 'Alex Carter')}&background=random&color=fff&size=52`,
		date: formattedDate,
		rawDate: item.publishedAt || item.createdAt,
		image: imageUrl,
		featuredImage: imageUrl,
		contentImage1: item.contentImage1?.url || null,
		contentImage2: item.contentImage2?.url || null,
		content: item.content, // Raw content blocks from Strapi
		excerpt: excerpt,
		views: parseInt(item.views) || Math.floor(Math.random() * 10000), // Fallback to random if not available
		commentsCount: parseInt(item.commentsCount) || 0,
		isFeatured: item.isExclusive || false,
		isExclusive: item.isExclusive || false,
		tags: item.tags || [],
	}
}

const formatNewsArticle = item => {
	const dateObj = new Date(item.publishedAt || item.createdAt)
	const options = { year: 'numeric', month: 'long', day: 'numeric' }
	const formattedDate = dateObj.toLocaleDateString('en-US', options)

	let imageUrl = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&w=1000&q=80'
	if (item.image && item.image.url) {
		imageUrl = item.image.url
	}

	return {
		id: item.id?.toString(),
		documentId: item.documentId,
		slug: item.slug,
		title: item.title,
		category: 'News',
		author: item.author?.name || 'News Bot',
		authorSlug: item.author?.slug || 'news-bot',
		authorAvatar: item.author?.avatar?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.author?.name || 'News Bot')}&background=random&color=fff&size=52`,
		date: formattedDate,
		rawDate: item.publishedAt || item.createdAt,
		image: imageUrl,
		featuredImage: imageUrl,
		content: item.content,
		excerpt: item.description || '',
		views: parseInt(item.views) || Math.floor(Math.random() * 10000),
		commentsCount: parseInt(item.commentsCount) || 0,
		isFeatured: item.isExclusive || false,
		isExclusive: item.isExclusive || false,
		tags: item.tags || ['News'],
	}
}

const POPULATE_QUERY =
	'populate[0]=category&populate[1]=author.avatar&populate[2]=featuredImage&populate[3]=contentImage1&populate[4]=contentImage2'

export const fetchArticles = async () => {
	try {
		const response = await api.get(
			`/articles?${POPULATE_QUERY}&pagination[limit]=100`,
		)
		const data = response.data.data
		if (!data) return []

		return data.map(formatArticle)
	} catch (error) {
		console.error('Error fetching articles:', error)
		return [] // Return empty array on error to prevent breaking the UI
	}
}

export const fetchNewsArticles = async () => {
	try {
		const response = await api.get(
			`/news-articles?populate[0]=category&populate[1]=author.avatar&populate[2]=image&pagination[limit]=100`,
		)
		const data = response.data.data
		if (!data) return []

		return data.map(formatNewsArticle)
	} catch (error) {
		console.error('Error fetching news articles:', error)
		return []
	}
}

export const fetchAllArticlesForSitemap = async () => {
	let allArticles = []
	
	// Fetch regular articles
	let page = 1
	let hasMore = true
	while (hasMore) {
		try {
			const response = await api.get(
				`/articles?populate[0]=category&populate[1]=author&fields[0]=slug&fields[1]=publishedAt&fields[2]=updatedAt&pagination[page]=${page}&pagination[pageSize]=100`,
			)
			const data = response.data.data
			const meta = response.data.meta

			if (!data || data.length === 0) {
				hasMore = false
				break
			}

			allArticles = [
				...allArticles,
				...data.map(item => ({
					slug: item.slug,
					date: item.updatedAt || item.publishedAt || new Date().toISOString(),
					category: item.category?.name?.toLowerCase() || 'tech',
					authorSlug: item.author?.slug || 'alex-carter',
				})),
			]

			if (meta?.pagination && meta.pagination.page >= meta.pagination.pageCount) {
				hasMore = false
			} else {
				page++
			}
		} catch (error) {
			console.error('Error fetching sitemap articles:', error)
			hasMore = false
		}
	}

	// Fetch news articles
	page = 1
	hasMore = true
	while (hasMore) {
		try {
			const response = await api.get(
				`/news-articles?populate[0]=category&populate[1]=author&fields[0]=slug&fields[1]=publishedAt&fields[2]=updatedAt&pagination[page]=${page}&pagination[pageSize]=100`,
			)
			const data = response.data.data
			const meta = response.data.meta

			if (!data || data.length === 0) {
				hasMore = false
				break
			}

			allArticles = [
				...allArticles,
				...data.map(item => ({
					slug: item.slug,
					date: item.updatedAt || item.publishedAt || new Date().toISOString(),
					category: item.category?.name?.toLowerCase() || 'news',
					authorSlug: item.author?.slug || 'ryan-mitchell',
				})),
			]

			if (meta?.pagination && meta.pagination.page >= meta.pagination.pageCount) {
				hasMore = false
			} else {
				page++
			}
		} catch (error) {
			console.error('Error fetching sitemap news articles:', error)
			hasMore = false
		}
	}

	return allArticles
}


export const fetchArticleBySlug = async slug => {
	try {
		// Try fetching from regular articles first
		const response = await api.get(
			`/articles?filters[slug][$eq]=${slug}&${POPULATE_QUERY}`,
		)
		let data = response.data.data

		if (data && data.length > 0) {
			return formatArticle(data[0])
		}

		// If not found, try fetching from news-articles
		const newsResponse = await api.get(
			`/news-articles?filters[slug][$eq]=${slug}&populate[0]=category&populate[1]=author.avatar&populate[2]=image`,
		)
		data = newsResponse.data.data

		if (data && data.length > 0) {
			return formatNewsArticle(data[0])
		}

		return null
	} catch (error) {
		console.error(`Error fetching article with slug ${slug}:`, error)
		return null
	}
}

export const fetchArticlesByCategory = async (categorySlug, page = 1) => {
	try {
		// Category page layout expects 4 featured + 5 feed on page 1, and 5 feed on page 2+
		const start = page === 1 ? 0 : 4 + (page - 1) * 5
		const limit = page === 1 ? 9 : 5

		let response;
		if (categorySlug === 'news') {
			response = await api.get(
				`/news-articles?populate[0]=category&populate[1]=author.avatar&populate[2]=image&pagination[start]=${start}&pagination[limit]=${limit}`,
			)
		} else {
			response = await api.get(
				`/articles?filters[category][slug][$eq]=${categorySlug}&${POPULATE_QUERY}&pagination[start]=${start}&pagination[limit]=${limit}`,
			)
		}
		
		const data = response.data.data
		const meta = response.data.meta

		if (!data) return { articles: [], meta: null }

		let articles = [];
		if (categorySlug === 'news') {
			articles = data.map(formatNewsArticle)
		} else {
			articles = data.map(formatArticle)
		}

		const total = meta?.pagination?.total || 0
		let pageCount = 1
		if (total > 9) {
			pageCount = 1 + Math.ceil((total - 9) / 5)
		}

		return {
			articles,
			meta: { pageCount },
		}
	} catch (error) {
		console.error(
			`Error fetching articles for category ${categorySlug}:`,
			error,
		)
		return { articles: [], meta: null }
	}
}

export const fetchArticlesByAuthor = async (authorSlug, page = 1) => {
	try {
		const pageSize = 5;
		const [articlesRes, newsRes] = await Promise.all([
			api.get(`/articles?filters[author][slug][$eq]=${authorSlug}&${POPULATE_QUERY}&pagination[limit]=100`),
			api.get(`/news-articles?filters[author][slug][$eq]=${authorSlug}&populate[0]=category&populate[1]=author.avatar&populate[2]=image&pagination[limit]=100`)
		]);

		const dataArticles = articlesRes.data.data || [];
		const dataNews = newsRes.data.data || [];

		const formattedArticles = dataArticles.map(formatArticle);
		const formattedNews = dataNews.map(formatNewsArticle);

		const all = [...formattedArticles, ...formattedNews].sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));

		const total = all.length;
		const pageCount = Math.ceil(total / pageSize) || 1;
		const paginated = all.slice((page - 1) * pageSize, page * pageSize);

		return {
			articles: paginated,
			meta: { pageCount, total },
		}
	} catch (error) {
		console.error(`Error fetching articles for author ${authorSlug}:`, error)
		return { articles: [], meta: null }
	}
}

export const fetchAuthorDetailsBySlug = async authorSlug => {
	try {
		const response = await api.get(
			`/authors?filters[slug][$eq]=${authorSlug}&populate=avatar`,
		)
		const data = response.data.data

		if (!data || data.length === 0) return null

		const authorObj = data[0]
		return {
			name: authorObj.name,
			slug: authorObj.slug,
			bio: extractTextFromRichText(authorObj.bio) || '',
			avatar:
				authorObj.avatar?.url ||
				`https://ui-avatars.com/api/?name=${encodeURIComponent(authorObj.name)}&background=random&color=fff&size=500`,
		}
	} catch (error) {
		console.error(`Error fetching author details for ${authorSlug}:`, error)
		return null
	}
}

// Helper function to format the product data exactly like mock data
const formatProduct = item => {
	// Get image URL
	let imageUrl =
		'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=1000' // default
	if (item.image && item.image.url) {
		imageUrl = item.image.url
	}

	return {
		id: item.id.toString(),
		documentId: item.documentId,
		name: item.title,
		originalPrice: `$${item.oldPrice}`,
		discountPrice: `$${item.price}`,
		rawOriginalPrice: item.oldPrice,
		rawDiscountPrice: item.price,
		rating: item.rating,
		reviews: item.reviews,
		image: imageUrl,
		timer: item.timer !== undefined ? item.timer : true,
		discount: item.discount, // e.g., 40
		link: item.link,
		benefitsTitle: item.benefitsTitle,
		benefits: [
			item.benefit1,
			item.benefit2,
			item.benefit3,
			item.benefit4,
		].filter(Boolean), // Remove empty benefits
	}
}

export const fetchProductById = async id => {
	try {
		const response = await api.get(`/products/${id}?populate=image`)
		const data = response.data.data

		if (!data) return null

		return formatProduct(data)
	} catch (error) {
		console.error(`Error fetching product with id ${id}:`, error)
		return null
	}
}

// Temu affiliate product — separate collection with rich fields for prelanding
const formatTemuProduct = item => {
	const defaultImage =
		'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80&w=1200'

	let imageUrl = defaultImage
	let imageLarge = defaultImage
	if (item.image && item.image.url) {
		imageUrl = item.image.url
		imageLarge = item.image.formats?.large?.url || item.image.url
	}

	const savings =
		item.oldPrice && item.price
			? Number((item.oldPrice - item.price).toFixed(2))
			: 0

	return {
		id: item.id.toString(),
		documentId: item.documentId,
		title: item.title,
		description: item.description,
		benefitsTitle: item.benefitsTitle,
		benefits: [
			item.benefit1,
			item.benefit2,
			item.benefit3,
			item.benefit4,
		].filter(Boolean),
		price: item.price,
		oldPrice: item.oldPrice,
		savings,
		discount: item.discount,
		rating: item.rating,
		reviews: item.reviews,
		timer: item.timer !== undefined ? item.timer : true,
		country: item.country,
		link: item.link,
		image: imageUrl,
		imageLarge,
		alt: item.image?.alternativeText || item.title,
	}
}

export const fetchTemuProducts = async () => {
	try {
		const response = await api.get(
			'/product-temus?populate=*&pagination[limit]=20',
		)
		const data = response.data.data
		if (!data) return []
		return data.map(formatTemuProduct)
	} catch (error) {
		console.error('Error fetching Temu products:', error)
		return []
	}
}

export const fetchTemuProduct = async () => {
	const products = await fetchTemuProducts()
	return products[0] || null
}

export const submitContactMessage = async data => {
	try {
		const response = await api.post('/contacts', {
			data: {
				name: data.name,
				email: data.email,
				request: data.request,
			},
		})
		return { success: true, data: response.data }
	} catch (error) {
		console.error('Error submitting contact message:', error)
		return { success: false, error: error.message }
	}
}

export const submitSubscription = async email => {
	try {
		const response = await api.post('/subscribers', {
			data: { email },
		})
		return { success: true, data: response.data }
	} catch (error) {
		console.error('Error submitting subscription:', error)
		// Try to extract Strapi's error message (e.g. for unique constraints)
		let errorMessage = 'Failed to subscribe. Please try again.'
		if (error.response?.data?.error?.message) {
			errorMessage = error.response.data.error.message
		}
		return { success: false, error: errorMessage }
	}
}
