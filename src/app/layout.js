import './globals.css'
import Layout from '@/layout/Layout/Layout'

export const metadata = {
	metadataBase: new URL('https://smartlivinghub.info'),
	title: {
		default: 'Smart Living Hub Portal',
		template: '%s | Smart Living Hub Portal',
	},
	description:
		'The ultimate destination for Health, Tech, Wealth, and Home living. Discover daily news, insights, and modern lifestyle trends.',
	keywords: [
		'Smart Living',
		'Lifestyle',
		'Health',
		'Technology',
		'Wealth',
		'Home Decor',
		'Travel',
		'News',
	],
	authors: [{ name: 'Smart Living Hub Team' }],
	openGraph: {
		title: 'Smart Living Hub Portal',
		description:
			'The ultimate destination for Health, Tech, Wealth, and Home living.',
		url: 'https://smartlivinghub.info',
		siteName: 'Smart Living Hub Portal',
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Smart Living Hub Portal',
		description:
			'The ultimate destination for Health, Tech, Wealth, and Home living.',
	},
	robots: {
		index: true,
		follow: true,
	},
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<Layout>{children}</Layout>
			</body>
		</html>
	)
}
