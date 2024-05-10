import { View, FlatList, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';

const DiscountCode = () => {
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.addDiscount}>
        <Text style={styles.discout}>Trạng thái:</Text>
        <RadioButton.Group onValueChange={newValue => setStatus(newValue)} value={status}>
          <View style={styles.addDiscount}>
            <View style={styles.addDiscount}>
              <RadioButton value='Kích hoạt' />
              <Text>Kích hoạt</Text>
            </View>
            <View style={styles.addDiscount}>
              <RadioButton value='Chưa áp dụng' />
              <Text>Chưa áp dụng</Text>
            </View>
          </View>

        </RadioButton.Group>
      </View>
      <View style={styles.addDiscount}>
        <Text style={styles.discout}>Tên Mã: </Text>
        <TextInput
          value={name}
          keyboardType="default"
          placeholder="Nhập tên mã"
          editable={true}
          style={styles.item}
          onChangeText={(text) => setName(text)}//xử lý văn bản
        />
      </View>
    </View>
  )

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  addDiscount: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
  },
  discout: {
    fontSize: 20,
  },
  item: {
    marginLeft: 'auto',
    height: 40,
    width: '70%',
    borderWidth: 1,
    padding: 10,
  },
});
export default DiscountCode;