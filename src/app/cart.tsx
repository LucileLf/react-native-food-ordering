import { Text, View } from '@/components/Themed';
import { Platform, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'
import { useCart } from '@/providers/CartProvider'

const CartScreen = () => {
  const { items } = useCart()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{items.length} items in cart.</Text>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default CartScreen;
