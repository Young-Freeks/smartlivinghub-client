import React, { useEffect } from 'react'
import Link from 'next/link'
import promoImage from '../../assets/menu-image.jpeg'
import './MenuModal.css'

const MenuModal = ({ isOpen, onClose }) => {
	// Prevent scrolling on the body when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	if (!isOpen) return null

	return (
		<div className='menu-modal-overlay' onClick={onClose}>
			<div
				className='menu-modal-content'
				onClick={e =>
					e.stopPropagation()
				} /* Prevent clicks inside from closing */
			>
				{/* Close Button */}
				<button
					className='menu-modal-close'
					onClick={onClose}
					aria-label='Close menu'
				>
					&times;
				</button>

				{/* Left Panel: Promo/Subscribe */}
				<div className='menu-modal-left'>
					<h2 className='menu-modal-promo-title'>
						Smart Living
						<br />
						Hub Portal
					</h2>
					<div className='menu-modal-promo-image'>
						<img src={promoImage.src} alt='Magazine Promo' />
					</div>
				</div>

				{/* Right Panel: Navigation */}
				<div className='menu-modal-right'>
					<div className='menu-modal-nav-group'>
						<h3 className='menu-modal-group-title'>Company</h3>
						<ul className='menu-modal-nav-list'>
							<li>
								<Link href='/about' onClick={onClose}>
									About
								</Link>
							</li>
							<li>
								<Link href='/contact' onClick={onClose}>
									Contact us
								</Link>
							</li>
							<li>
								<Link href='/privacy-policy' onClick={onClose}>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link href='/terms-of-service' onClick={onClose}>
									Terms of Service
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MenuModal
