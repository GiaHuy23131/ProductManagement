import { View, Modal,FlatList, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Color from '../Class/Color';
import { useNavigation, useRoute } from '@react-navigation/native';

const ListColor = () => {
    const navigation = useNavigation(); // Sử dụng hook navigation
    const [arrColor, setArrList] = useState([
        new Color('Trắng', 'white'),
        new Color('Đen', 'black'),
        new Color('Xanh Dương', 'blue'),
        new Color('Xanh lá', 'green'),
        new Color('Vàng', 'yellow'),
        new Color('Đỏ', 'red'),
        new Color('Tím', 'purple'), 
        new Color('Cam', 'orange'),
    ]);
    console.log('arrColor', arrColor);
    return (
        <View style={styles.container}>
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
            {/* <FlatList
                data={arrColor} 
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleItemPress(item.color)}>
                        <View style={[styles.imageColor, { backgroundColor: item.color }]} />
                        <Text style={styles.nameColor}>{item.nameColor}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.nameColor}
                numColumns={4}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
    },
    imageColor: {
        width: 80,
        height: 80,
        borderRadius: 40,
        margin: 10,
    },
    nameColor: {
        marginTop: 5,
        textAlign: 'center',
    },
});

export default ListColor;