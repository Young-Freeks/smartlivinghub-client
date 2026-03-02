import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import './SearchDropdown.css'

const SearchDropdown = ({ isOpen, onClose, articles }) => {
	const [searchTerm, setSearchTerm] = useState('')
	const [results, setResults] = useState([])
	const dropdownRef = useRef(null)

	// We will handle click outside from the Header component instead
	// to avoid conflicts with the Header toggle button.

	// Clear search when closed
	useEffect(() => {
		if (!isOpen) {
			setSearchTerm('')
			setResults([])
		}
	}, [isOpen])

	// Filter articles
	useEffect(() => {
		if (searchTerm.length >= 3) {
			const query = searchTerm.toLowerCase()
			const filtered = articles.filter(
				article =>
					article.title.toLowerCase().includes(query) ||
					article.category.toLowerCase().includes(query),
			)
			setResults(filtered)
		} else {
			setResults([])
		}
	}, [searchTerm, articles])

	if (!isOpen) return null

	return (
		<div className='search-dropdown-wrapper container'>
			<div className='search-dropdown-container' ref={dropdownRef}>
				{/* Search Bar Row */}
				<div className='search-input-row'>
					<input
						type='text'
						className='search-input'
						placeholder='Enter search term...'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						autoFocus
					/>
					<button className='search-submit-btn'>Search</button>
				</div>

				{/* Results Area */}
				{searchTerm.length >= 3 && (
					<div className='search-results-area'>
						{results.length > 0 ? (
							<>
								<h5 className='search-results-header'>Posts</h5>
								<div className='search-results-grid'>
									{results.map(article => (
										<div className='search-result-item' key={article.id}>
											<Link
												href={`/article/${article.slug}`}
												className='image-wrapper'
												onClick={onClose}
												style={{ position: 'relative' }}
											>
												<img src={article.image} alt={article.title} />
												{article.isExclusive && (
													<div className='mega-menu-overlay'>
														<span className='badge-exclusive'>Exclusive</span>
													</div>
												)}
											</Link>
											<div className='search-result-content'>
												<h4>
													<Link
														href={`/article/${article.slug}`}
														onClick={onClose}
													>
														{article.title}
													</Link>
												</h4>
												<div className='search-result-meta'>
													<span className='search-category-label'>
														{article.category}
													</span>
													<span className='date'>By {article.author}</span>
													<span className='date'>{article.date}</span>
													<span className='date'>
														{article.views?.toLocaleString()} views
													</span>
												</div>
											</div>
										</div>
									))}
								</div>
							</>
						) : (
							<div className='search-no-results'>NO RESULTS</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default SearchDropdown
