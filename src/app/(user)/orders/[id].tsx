import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import OrderItemListItem from '../../../components/OrderItemListItem';
import OrderListItem from '../../../components/OrderListItem';
import { useOrderDetails } from '@/api/orders/index';
import { useUpdateOrderSubscription } from '@/api/orders/subscription'

const OrderDetailScreen = () => {
  const {id: idAsString} = useLocalSearchParams();
  const id = parseFloat(typeof idAsString === 'string' ? idAsString : idAsString[0]) // ! idAsString can be an array of strings

  const { data: order, isLoading, error } = useOrderDetails(id)

  // subscribe to order updates
  useUpdateOrderSubscription(id);

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Product not found</Text>
  }

  if (!order) {
    return;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order}/>} //fixed header
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;
