'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { fetchArticles } from '../../services/api'
import MenuModal from '../../components/MenuModal/MenuModal'
import SearchDropdown from '../../components/SearchDropdown/SearchDropdown'
import './Header.css'

const Header = () => {
	const pathname = usePathname()
	const isHome = pathname === '/'

	const [allArticles, setAllArticles] = useState([])
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const searchBtnRef = useRef(null)
	const searchDropdownRef = useRef(null)

	// Close search on click outside
	useEffect(() => {
		const handleClickOutside = event => {
			// Don't close if clicking the button or the dropdown content
			const clickedButton =
				searchBtnRef.current && searchBtnRef.current.contains(event.target)
			const clickedDropdown =
				searchDropdownRef.current &&
				searchDropdownRef.current.contains(event.target)

			if (isSearchOpen && !clickedButton && !clickedDropdown) {
				setIsSearchOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isSearchOpen])

	useEffect(() => {
		const loadData = async () => {
			const data = await fetchArticles()
			setAllArticles(data || [])
		}
		loadData()
	}, [])

	return (
		<header className='header-wrapper'>
			{/* Top Header Row */}
			<div className='container header-top'>
				<div className='header-left'>
					<button className='header-btn' onClick={() => setIsMenuOpen(true)}>
						<span
							className='header-icon'
							style={{
								color: 'var(--primary-color)',
								display: 'flex',
								alignItems: 'center',
								lineHeight: 0,
							}}
						>
							≡
						</span>
						<span>MENU</span>
					</button>
				</div>

				<div className='header-center'>
					<Link href='/' className='logo-main'>
						SmartLiving<span className='logo-sub'>HUB</span>
					</Link>
				</div>

				<div className='header-right' ref={searchBtnRef}>
					<button
						className='header-btn header-btn-dark'
						style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
						onClick={e => {
							e.stopPropagation()
							setIsSearchOpen(!isSearchOpen)
						}}
					>
						<span>Search</span>
						<span
							className='header-icon'
							style={{
								display: 'flex',
								alignItems: 'center',
								marginTop: '-2px',
							}}
						>
							⌕
						</span>
					</button>
				</div>
			</div>

			{/* Search Dropdown - Placed just below header-top */}
			<div style={{ position: 'relative' }} ref={searchDropdownRef}>
				<SearchDropdown
					isOpen={isSearchOpen}
					onClose={() => setIsSearchOpen(false)}
					articles={allArticles}
				/>
			</div>

			{/* Navigation Layer */}
			<nav className='nav-bar'>
				<div className='container' style={{ position: 'relative' }}>
					<ul className='nav-list'>
						{['news', 'health', 'money', 'tech', 'home', 'travel'].map(cat => (
							<li className='nav-item' key={cat}>
								<Link
									href={`/category/${cat}`}
									className={`nav-link ${pathname?.includes(cat) ? 'active' : ''}`}
								>
									{cat}
								</Link>

								{/* Mega Menu Dropdown */}
								<div className='mega-menu'>
									<div className='mega-menu-inner'>
										{allArticles
											.filter(a => a.category.toLowerCase() === cat)
											.slice(0, 5)
											.map(article => (
												<article key={article.id} className='mega-menu-card'>
													<Link
														href={`/article/${article.slug}`}
														className='image-wrapper'
													>
														<img src={article.image} alt={article.title} />
														<div className='mega-menu-overlay'>
															{article.isExclusive && (
																<span className='badge-exclusive'>
																	Exclusive
																</span>
															)}
														</div>
													</Link>
													<h4 className='mega-menu-title'>
														<Link href={`/article/${article.slug}`}>
															{article.title}
														</Link>
													</h4>
													<div
														className='article-meta'
														style={{ marginTop: '5px', margin: 0 }}
													>
														<span
															className='meta-item meta-date'
															style={{ fontSize: '11px' }}
														>
															{article.date}
														</span>
														<span className='meta-separator'>-</span>
														<span
															className='meta-item meta-views'
															style={{ fontSize: '11px' }}
														>
															{article.views?.toLocaleString()} views
														</span>
													</div>
												</article>
											))}
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</nav>

			{/* Ticker Layer - Only on Home */}
			{isHome && (
				<div className='ticker-bar'>
					<div className='container ticker-inner'>
						<div className='ticker-controls'>
							<button className='ticker-btn'>←</button>
						</div>

						<div
							className='ticker-mask'
							style={{ overflow: 'hidden', flex: 1, position: 'relative' }}
						>
							<div className='ticker-items'>
								{/* Duplicating the items twice for infinite scroll seamless loop */}
								{allArticles.slice(0, 8).map((article, i) => (
									<div
										className='ticker-item'
										key={`ticker-${article.id}-${i}`}
									>
										<h5>
											<Link href={`/article/${article.slug}`}>
												{article.isExclusive && (
													<span
														className='badge-exclusive'
														style={{ backgroundColor: 'var(--primary-color)' }}
													>
														EXCLUSIVE
													</span>
												)}
												{article.title}
											</Link>
										</h5>
										<span className='ticker-date'>{article.date}</span>
									</div>
								))}
							</div>
						</div>

						<div className='ticker-controls'>
							<button className='ticker-btn'>→</button>
						</div>
					</div>
				</div>
			)}

			{/* Menu Modal Overlay */}
			<MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
		</header>
	)
}

export default Header
