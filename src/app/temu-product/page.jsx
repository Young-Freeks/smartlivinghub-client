import TemuLanding from './TemuLanding'

export const metadata = {
	title: 'Ексклюзивна пропозиція — знижка до 40% діє лише сьогодні',
	description:
		'Хіт продажів дня. Якість, яку обирають понад 10 000 клієнтів. Обмежена пропозиція — встигни замовити за найкращою ціною.',
	robots: {
		index: false,
		follow: true,
	},
	openGraph: {
		title: 'Ексклюзивна пропозиція — знижка до 40% діє лише сьогодні',
		description:
			'Хіт продажів дня. Обмежена пропозиція — встигни замовити за найкращою ціною.',
		locale: 'uk_UA',
		type: 'website',
	},
	alternates: {
		canonical: 'https://smartlivinghub.info/temu-product',
	},
}

export default function TemuProductPage() {
	return <TemuLanding />
}
