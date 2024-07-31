import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../context/StoreContext'
import Fooditem from '../FoodItem/Fooditem'

const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)


  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map( (item,index) => {
          //   Here below if category is same as the category in food_list then it will print  ( bec it is in if loop)  think here as if category does not match then it will print all the category so we can see all of them as default
          if(category === "All" || category === item.category){
            return <Fooditem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
          }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
