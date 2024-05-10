import { View, FlatList, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, { useState , useEffect } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IconButton, MD3Colors } from 'react-native-paper';
// src
import Manager from '../../Components/Manager';
import Admin from '../../Class/Admin';

const HomeManager = () =>{
    const navigation = useNavigation(); // Sử dụng hook navigation
    const route = useRoute();
    const [manager] = useState(new Manager());
    const [arrList, setArrList] = useState(route.params?.arrList ?? []); // Cập nhật useState để sử dụng setArrList
    const [idPrs, setID] = useState(route.params?.idPr); // Khởi tạo id ban đầu
    console.log('updatedProduct',route.params?.updateItem);

    //xử lý xóa
    const removeProduct = (idPr) => {
      console.log('idText:', idPr);
      manager.removeProduct(idPr);
        const removeList = arrList.filter(item => item.idPr !== idPr); // xóa đồng bộ
        //Xóa id 
        setID(prevID => prevID - 1);
        setArrList(removeList);
      console.log('arr2', manager.epls);
    };
    //cập nhật lại dữ liệu 
    useEffect(() => {
      //cập nhật add
      if (route.params?.arrList) {
        // Tính toán ID mới
        const newIDPr = arrList.length > 0 ? Math.max(...arrList.map(item => item.idPr)) + 1 : 1;
        console.log('newID', newIDPr);
        //set dữ liệu vào mảng
        setArrList(prevState => prevState.concat(route.params.arrList.map(item => ({ ...item, idPr: newIDPr })))); // Thêm ID mới vào mỗi phần tử trong arrList
        ///setArrList(route.params?.arrList);
      }
      ///cập nhật update
      if (route.params?.updateItem) {
        // Tạo một bản sao mới của arrList
        const updatedProductList = [...arrList];
  
        // Tìm kiếm sản phẩm trong danh sách với id tương ứng và cập nhật giá trị
        const indexToUpdate = updatedProductList.findIndex(product => product.idPr === route.params.updateItem.idPr);
        ///console.log('indexToUpdate',indexToUpdate);
        if (indexToUpdate !== -1) {
          updatedProductList[indexToUpdate] = route.params.updateItem;
          // Cập nhật danh sách sản phẩm
          setArrList(updatedProductList);
        }
      }
  }, [route.params?.arrList, route.params?.updateItem]);
    return (
        <View style={styles.homeManager}>
            <FlatList
                style={styles.flatList}
                data={arrList}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => {navigation.navigate('Product', { item: item, detail: true , flag: true})
                  }}>
                    <View style={styles.itemListView}>
                      {item.imagePr[0] && <Image source={{uri: item.imagePr[0]}} style={styles.image} />}
                        <View>
                          <Text style={styles.textName}>
                            Tên:{item.namePr} 
                          </Text>
                          <Text style={styles.textPrice}>
                            Giá:{item.pricePr} 
                          </Text>
                          <Text style={styles.textDescription}>
                            Mô tả:{item.descriptionPr.length > 10 ? item.descriptionPr.split(" ").slice(0,10).join(" ") + '...' : item.descriptionPr} 
                          </Text>     
                        </View>
                        <View style={styles.iconDelete}>
                            <IconButton
                                icon="delete"
                                size={25}
                                onPress={() => removeProduct(item.idPr)}
                            />
                        </View>
                    </View>
                  </TouchableOpacity>
                    
                )}
                keyExtractor={(item,index)=> index.toString()}
            />
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Product')}>
                    <Text style={styles.buttonText}>Thêm</Text>
                </TouchableOpacity>     
                
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    homeManager: {
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
      itemListView: {
        flexDirection: 'row',
        padding: 10,
        fontSize: 18,
        width:330,
        height: 130,
        marginVertical: 5,
        backgroundColor: 'white',
        borderRadius: 10,
      },
      title: {
        fontSize: 32,
      },
      selectList: {
        borderWidth: 1,
        height: 40,
        width: 230,
        backgroundColor: 'pink',
        marginLeft: 40,
      },
      imageProduct: {
        height: 100,
        width: 100,
        margin: 10,
        backgroundColor: 'black',
      },
      textName: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 5,
      },
      textPrice: {
        fontSize: 16,
        color: 'red',
        margin: 5,
      },
      textDescription: {
        fontSize: 16,
        margin: 5,
      },
      deleteProduct: {
        marginTop: 'auto',
      },
      flatList: {
        margin: 20,
      },
      iconDelete: {
        marginLeft: 'auto',
         justifyContent: 'flex-end',
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 40,
        margin: 10,
        backgroundColor: 'blue',
      },
});
export default HomeManager;