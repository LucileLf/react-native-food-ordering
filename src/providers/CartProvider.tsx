import { CartItem, Product } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react"
import { randomUUID } from 'expo-crypto'


type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size']) => void;
}

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {}
});

const CartProvider = ({ children }: PropsWithChildren) => { //here children refers to app stack
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (product: Product, size: CartItem['size']) => {
    // if already in cart, increment quantity
    const newCartItem: CartItem = {
      id : randomUUID(),
      product, // product: product
      product_id: product.id,
      size, // size: size
      quantity: 1,
    }
    setItems([newCartItem, ...items])
  }

  //update quantity
console.log(items);


  return (
    <CartContext.Provider
      value={{items: items, addItem }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;

export const useCart = () => useContext(CartContext)
