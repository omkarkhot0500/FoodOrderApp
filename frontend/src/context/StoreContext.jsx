import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [cartItems, setCartItems] = useState(0);
  const url = "http://localhost:4000"
  const [token,setToken] = useState("")
  const [food_list,setFoodList]=useState([])        // This food list is for the loged user


  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
        setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    }
    else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      // Here axios is trying to send the data from this file to this  "/api/cart/add" 
      // where as this is a post type so we  add post in front to sepecify that
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });    
    }
}

const removeFromCart = async (itemId) => {
  setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
  if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
  }
}

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for(const item in cartItems){
      if(cartItems[item] > 0){
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  }


  const fetchFoodList = async () => {
    const response = await axios.get(url+"/api/food/list")
    setFoodList(response.data.data)
  }

  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: {token} });
    setCartItems(response.data.cartData);
}


  useEffect(()=>{
    async function loadData(){
      await fetchFoodList();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData();
  },[])


  const constextVlaue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={constextVlaue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
