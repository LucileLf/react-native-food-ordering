import React from 'react'
import OrderListItem from '@/components/OrderListItem'
import orders from '@assets/data/orders'
import { ActivityIndicator, FlatList, Text } from 'react-native'
import { useMyOrderList } from '@/api/orders/index'

const OrdersScreen = () => {
  const { data: orders, isLoading, error } = useMyOrderList();

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
