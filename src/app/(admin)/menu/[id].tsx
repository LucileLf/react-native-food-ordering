import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import products from '@assets/data/products'
import { defaultPizzaImage } from '@/components/ProductListItem';
import { useState } from 'react';
import Button from '@/components/Button'
import { useCart } from '@/providers/CartProvider'
import { PizzaSize } from '@/types';
import Colors from '@/constants/Colors';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useProduct } from '@/api/products';

const sizes: PizzaSize[] = ["S", "M", "L", "XL"]

const ProductDetailsScreen = () => {
  const {id: idAsString} = useLocalSearchParams();
  const id = parseFloat(typeof idAsString === 'string' ? idAsString : idAsString[0]) // ! idAsString can be an array of strings

  const { addItem } = useCart()

  const router = useRouter()

  // const product = products.find((p) => p.id.toString() === id);
  const { data: product, error, isLoading } =  useProduct(id)

  if (isLoading) {
    return <ActivityIndicator/>
  }

  if (error) {
    return <Text>Product not found</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: 'Menu',
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ), }}
      />
      <Stack.Screen options={{ title: product.name}} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text style={styles.price}>${product.price}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10
  },
  image: {
    width: '100%',
    aspectRatio: 1
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default ProductDetailsScreen;
