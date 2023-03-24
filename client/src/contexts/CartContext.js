import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const CartContext = createContext();

export const CartProvider = ({
    children
}) => {

    const [products,setProducts] = useLocalStorage('cart', [])

    const addProductToCart = (productData) => {
      if(products.length == 0){
        if(Array.isArray(productData)){
          setProducts(productData);
        }
        else{
          let newArray = [productData]
          setProducts(newArray);
        }
      }
      else{
        setProducts([...products,productData]);
      }
    }
  
    const removeProductFromCart = (productId) => {
      setProducts(products.filter(x => x._productId !== productId));
    }
  
    const emptyCart = () => {
      setProducts([])
    }
  

    return (
        <CartContext.Provider value = {{cart: products, addProductToCart, removeProductFromCart, emptyCart}}>
            {children}
        </CartContext.Provider>
    );
}