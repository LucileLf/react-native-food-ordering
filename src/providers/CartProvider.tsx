import { CartItem, Tables } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react"
import { randomUUID } from 'expo-crypto'
import { useInsertOrder } from '@/api/orders'
import { useInsertOrderItem } from '@/api/order-items'
import { useRouter } from "expo-router";

type Product = Tables<'products'> // get type from supabase

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size']) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number,
  checkout: () => void
}

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {}
});


const CartProvider = ({ children }: PropsWithChildren) => { //here children refers to app stack
  const [items, setItems] = useState<CartItem[]>([])

  const { mutate: insertOrder } = useInsertOrder()
  const { mutate: insertOrderItem } = useInsertOrderItem()

  const router= useRouter();

  const addItem = (product: Product, size: CartItem['size']) => {
    // if already in cart, increment quantity
    const existingItem = items.find((item) => item.product === product && item.size === size);
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }
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
  const updateQuantity =(itemId: string, amount: -1 | 1) => {
    console.log(itemId, amount);
    setItems(
      items.map(item =>
        item.id !== itemId ? item : {...item, quantity: item.quantity + amount}
        )
        .filter((item => item.quantity > 0))
    );
  };

  const total = items.reduce((sum, item) => (sum += item.product.price * item.quantity), 0)

  const clearCart = () => {
    setItems([]);
  }

  const checkout = () => {
    // create new order
    insertOrder({ total }, {
      onSuccess: saveOrderItems,
    })
  }

  const saveOrderItems = (order: Tables<'orders'>) => {

    // create order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      size: item.size
    }));
    insertOrderItem(orderItems, {
      onSuccess() {
        clearCart();
        router.push(`/(user)/orders/${order.id}`)
      } // after placing order, go to details of order
    })
  }

  return (
    <CartContext.Provider
      value={{items: items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;

export const useCart = () => useContext(CartContext)
