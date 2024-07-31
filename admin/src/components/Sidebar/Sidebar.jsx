import React from 'react'
import  './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'




const Sidebar = () => {
  return (
    
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">    {/* Here we need not to add onclick where as navlink will does on its own where as it provides a active call to which link we have clicked which it its adavantage over normal link tage */}
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
