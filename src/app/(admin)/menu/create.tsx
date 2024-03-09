import { View, Text, StyleSheet, TextInput ,Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button'
import * as ImagePicker from 'expo-image-picker';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import { Stack, useLocalSearchParams } from 'expo-router';

const CreateProductScreen = () => {
  const [ name, setName ] = useState('')
  const [ price, setPrice ] = useState('')
  const [ errors, setErrors] = useState('')
  const [image, setImage] = useState<string | null>(null);

  const { id } = useLocalSearchParams();
  const isUpdating = !!id; // true if id is defined

  const resetField = () => {
    setName('');
    setPrice('');
  }

  const validateInput = () => {
    setErrors('')
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors('Price is required');
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors('Price is not a number');
      return false;
    }
    return true;
  }

  const onSubmit = () =>  {
    if (isUpdating) {
      onUpdate()
    } else {
      onCreate()
    }
  }

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    console.warn('creating product', name, price);
    //save in db
    resetField();
  }

  const onUpdate = () => {
    if (!validateInput()) {
      return;
    }
    console.warn('updating product', name, price);
    //save in db
    resetField();
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onDelete= () => {
    console.warn('DELETE!');

  }

  const confirmDelete = () => {
    //console.warn('entered function confirmDelete');
    Alert.alert('Confirm',  'Are you sure you want to delete this product?');
  }

    // , [
    //   {
    //   text: 'Cancel'
    //   },
    //   {
    //     text: 'Delete',
    //     style: 'destructive',
    //     onPress: 'onDelete',
    //   },
    //   {
    //     text: 'Cancel'
    //   }
    // ]}

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: isUpdating ? 'Update product' : 'Create product'}}/>
      <Image source={{ uri: image || defaultPizzaImage }} style={styles.image}/>
      <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName} placeholder='Name' style={styles.input}/>

      <Text style={styles.label}>Price</Text>
      <TextInput value={price} onChangeText={setPrice} placeholder='9.99' style={styles.input} keyboardType='numeric'/>

      <Text style={{color: 'red' }}>{errors}</Text>
      <Button text={isUpdating ? 'Update' : 'Create'} onPress={onSubmit}></Button>
      { isUpdating && <Text onPress={confirmDelete} style={styles.textButton} >Delete</Text>}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center'
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    margin: 20,
  },
  label: {
    color: 'gray',
    fontSize: 16
  }
})
export default CreateProductScreen
