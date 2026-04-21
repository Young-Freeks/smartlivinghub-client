import TemuLandingV3 from './TemuLandingV3'

export const metadata = {
	title: 'Ексклюзивна пропозиція · Temu',
	description:
		'Сертифікований товар із Temu за чесною ціною. Знижка до 40% діє обмежений час. Повернення 30 днів і безпечна оплата.',
	robots: {
		index: false,
		follow: true,
	},
	openGraph: {
		title: 'Ексклюзивна пропозиція · Temu',
		description:
			'Сертифікований товар із Temu за чесною ціною. Знижка до 40%.',
		locale: 'uk_UA',
		type: 'website',
	},
	alternates: {
		canonical: 'https://smartlivinghub.info/temu-product-v3',
	},
}

export default function TemuProductV3Page() {
	return <TemuLandingV3 />
}
