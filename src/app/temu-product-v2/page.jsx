import TemuLandingV2 from './TemuLandingV2'

export const metadata = {
	title: 'Ексклюзивна пропозиція · перехід на Temu',
	description:
		'Хіт продажів на Temu зі знижкою до 40%. Обмежена пропозиція — встигни замовити за найкращою ціною.',
	robots: {
		index: false,
		follow: true,
	},
	openGraph: {
		title: 'Ексклюзивна пропозиція · перехід на Temu',
		description:
			'Хіт продажів на Temu зі знижкою до 40%. Обмежена пропозиція.',
		locale: 'uk_UA',
		type: 'website',
	},
	alternates: {
		canonical: 'https://smartlivinghub.info/temu-product-v2',
	},
}

export default function TemuProductV2Page() {
	return <TemuLandingV2 />
}
