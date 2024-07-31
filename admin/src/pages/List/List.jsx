import React, { useEffect, useState } from 'react'
import './List.css'
import { url } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const [list,setList] = useState([]);
  
  const fetchList = async () => {
    {/* Below line will work on its own
        , when we enter the particular path 
          a method will run which will find the model which are created on the schema
          where as that data will we be passed to this response variable  */}
    const response = await axios.get(`${url}/api/food/list`) // Axios is an HTTP client library that allows you to make requests to various endpoints. These endpoints can be external APIs or your own backend server 
    if(response.data.success)
    {
      setList(response.data.data);   //   Here we are passing the data to list from response ( where as the data in response is from /list endpoint where as in /list endpoint we call a method which will return "all the models which are created by the mongoDB schema ")
    }
    else{
      toast.error("Error")
    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{
      id:foodId
    })
    await fetchList();    //  The reason we are calling fetchList() again is, When we delete a food item then we have to update the list and use it 
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList();
  },[])      // Whenever this component will be loaded fetchList function will run once

  return (
    <div className='list add flex-col'>
        <p>All Foods List</p>
        <div className='list-table'>
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item,index)=>{
            return (
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p className='cursor' onClick={()=>removeFood(item._id)}>x</p>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default List
