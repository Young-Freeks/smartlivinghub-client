'use client'
import { usePathname } from 'next/navigation'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const FULLSCREEN_ROUTES = ['/temu-product-v2']

const Layout = ({ children }) => {
	const pathname = usePathname()
	const isFullscreen = FULLSCREEN_ROUTES.includes(pathname)

	if (isFullscreen) {
		return children
	}

	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	)
}

export default Layout
