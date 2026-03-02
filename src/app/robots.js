export default function robots() {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/api/', '/_next/'],
		},
		sitemap: 'https://smartlivinghub.info/sitemap.xml',
	}
}
