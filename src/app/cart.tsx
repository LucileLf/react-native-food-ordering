import { Text, View } from '@/components/Themed';
import { FlatList, Platform, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'
import { useCart } from '@/providers/CartProvider'
import CartListItem from '@/components/CartListItem';
import Button from '@/components/Button';

const CartScreen = () => {
  const { items, total } = useCart()

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({item}) => <CartListItem cartItem={item}/>}
        contentContainerStyle={{gap: 10, padding: 10}}
      />
      <Text style={{marginTop: 20, fontSize: 15, fontWeight: '500'}}>Total: ${total}</Text>
      <Button text='Checkout'></Button>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });

export default CartScreen;
