import { Text, View } from '@/components/Themed';
import { Platform, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

export default CartScreen;

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
