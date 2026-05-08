'use client'
import React from 'react'
import HomeTopGrid from '../../views/Home/HomeTopGrid'
import BreakingSection from '../../views/Home/BreakingSection'
import ExclusiveSection from '../../views/Home/ExclusiveSection'
import RecentPostsGrid from '../../views/Home/RecentPostsGrid'
import CategorySection from '../../views/Home/CategorySection'
import CategoryLifestyle from '../../views/Home/CategoryLifestyle'
import './Home.css'

const Home = ({ articlesData = [], newsArticlesData = [] }) => {
	// Arrays for the mixed demo sections
	const healthArticles = articlesData.filter(a => a.category === 'Health')
	const moneyArticles = articlesData.filter(a => a.category === 'Money')
	const techArticles = articlesData.filter(a => a.category === 'Tech')
	const homeArticles = articlesData.filter(a => a.category === 'Home')
	const travelArticles = articlesData.filter(a => a.category === 'Travel')

	// Arrays for the mixed demo sections
	const mixedArticles = articlesData.slice(0, 15)
	const breakingArticles = articlesData.slice(4, 12)
	const exclusiveArticles = articlesData.slice(7, 10)

	return (
		<div className='home-layout-container'>
			{/* Top 3-column Hero Grid (Demo: "Fresh stories") */}
			<HomeTopGrid articles={mixedArticles} />

			{/* Demo: "Breaking" */}
			<BreakingSection articles={breakingArticles} />

			{/* News Section */}
			{newsArticlesData.length > 0 && (
				<CategorySection categoryName='News' articles={newsArticlesData.slice(0, 5)} />
			)}

			{/* Category Block 1 (Demo: "Politics") -> mapped to Health */}
			<CategorySection categoryName='Health' articles={healthArticles} />

			{/* Category Block 2 (Demo: "Celebrity LIFESTYLE") -> mapped to Money */}
			<CategoryLifestyle categoryName='Money' articles={moneyArticles} />

			{/* Category Block 3 (Demo: "Food & travel") -> mapped to Tech */}
			<CategorySection categoryName='Tech' articles={techArticles} />

			{/* Exclusive Content Banner (Demo: "Exclusive content") */}
			<ExclusiveSection articles={exclusiveArticles} />

			{/* Category Block 4 -> mapped to Home */}
			<CategoryLifestyle categoryName='Home' articles={homeArticles} />

			{/* The large Latest Grid (Demo: "Recent posts LATEST") */}
			<RecentPostsGrid articles={mixedArticles} />

			{/* Category Block 5 -> mapped to Travel */}
			<CategorySection categoryName='Travel' articles={travelArticles} />
		</div>
	)
}

export default Home
