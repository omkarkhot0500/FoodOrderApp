import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets,url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {

    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    const [image, setImage] = useState(false);

    const onSubmitHandler = async (event) => {                   {/* This will run when we press Submit where as onSubmit will trigger and call the onSubmitHandler , it will save the data from which is stored in the data variable which will change when we add new input to the form we have created */}
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        {/*                                                              Below line 
            1.  The axios.post call sends an HTTP POST request to the 
                ${url}/api/food/add endpoint.
            2.  The formData object serves as the payload in this request.
            3.  The server-side route handler for the /add endpoint (defined by foodRouter.post("/add", upload.single("image"), addFood))
                 will receive this data.
            4.  Inside the addFood method, you can process the data, perform any necessary validation, and save it to your 
                database or take other relevant actions. */}
        const response = await axios.post(`${url}/api/food/add`, formData);   
        if (response.data.success) {
            toast.success(response.data.message)
            {/* Below line is to make the form to default empty after sending the data to the mongoDB server 
                (means that data will be passed to /add route and /add route will pass that data to add )*/}
            setData({                              
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false);
        }
        else{
            toast.error(response.data.message)
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />               {/* This line is to create a preview img of the image we have selected */}
                    </label>
                    <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" id="image" hidden required />               {/* Here setimage will update image to the selected image from the file */}
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' required />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={6} placeholder='Write content here' required />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product category</p>
                        <select name='category' onChange={onChangeHandler} >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='$25' />
                    </div>
                </div>
                <button type='submit' className='add-btn' >ADD</button>
            </form>
        </div>
    )
}

export default Add
