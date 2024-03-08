import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button'

const CreateProductScreen = () => {
  const [ name, setName ] = useState('')
  const [ price, setPrice ] = useState('')

  const resetField = () => {
    setName('')
    setPrice('')
  }
  const onCreate = () => {
    console.warn('creating product', name, price);
    //save in db
    resetFields()
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName} placeholder='Name' style={styles.input}/>

      <Text style={styles.label}>Price</Text>
      <TextInput value={price} onChangeText={setPrice} placeholder='9.99' style={styles.input} keyboardType='numeric'/>

      <Button text='Create' onPress={onCreate}></Button>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
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
