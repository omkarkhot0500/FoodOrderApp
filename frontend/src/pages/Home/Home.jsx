import React, { useState } from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {

  const [category,ChageCategory] = useState("All");

  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={ChageCategory}/>      
      <FoodDisplay category={category}/>
      <AppDownload/>
    </div>
  )
}

// Here in above ExploreMenu we pass category and chageCategory where as  it menu_name          ( Note: there is menu_name and category in assets.js)

// Now that Changed category is used in FoodDisplay to search

export default Home
