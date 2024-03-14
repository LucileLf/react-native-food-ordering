import { useEffect } from 'react'
import OrderListItem from '@/components/OrderListItem'
// import orders from '@assets/data/orders'
import { ActivityIndicator, FlatList, Text } from 'react-native'
import { useAdminOrderList } from '@/api/orders'
import { useInsertOrderSubscription, useUpdateOrderSubscription } from '@/api/orders/subscription'


const OrdersScreen = () => {
  // fetching only active orders
  const {data: orders, isLoading, error} = useAdminOrderList({archived: false})

  // subscribe to new orders
  useInsertOrderSubscription();

  // console.log(orders);
  if (isLoading) {
    return <ActivityIndicator/>;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>
  }

  return (
    <FlatList
      data={orders}
      renderItem={({item}) => <OrderListItem order={item}/>}
      contentContainerStyle={{gap: 10, padding: 10}}
    />
  )
}

export default OrdersScreen
