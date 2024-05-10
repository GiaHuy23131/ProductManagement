import { View, FlatList, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, { useState , useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

const DiscountManagerment = () => {
  const navigation = useNavigation(); // Sử dụng hook navigation
    return(
        <View style={styles.container}>
            <Text>Hello</Text>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DiscountCode')}>
                    <Text style={styles.buttonText}>Thêm</Text>
                </TouchableOpacity>     
                
            </View>
        </View>
    )
    
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'pink',
    },  
    buttonWrapper: {
      backgroundColor: 'green',
      height: 40,
      justifyContent: 'center',
      marginTop: 'auto',
      borderRadius: 10,
      margin: 10,
    },
    button: {
      backgroundColor: '#007bff',
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  
  });
export default DiscountManagerment;