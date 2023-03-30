import { createContext, useContext, useState } from "react";

const Context = createContext();

const GroceryProvider = ({children}) => {
    const [list, setList] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [discountList, setDiscountList] = useState([]);

    return (
        <Context.Provider value={{
            list,
            setList,
            wishlist,
            setWishlist,
            cartList,
            setCartList,
            discountList,
            setDiscountList
        }}>
            {children}
        </Context.Provider>
    )
};

export const GroceryState = () => {
    return useContext(Context);
}

export default GroceryProvider;

