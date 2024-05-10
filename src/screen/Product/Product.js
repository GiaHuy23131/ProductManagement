import React, { Component, useState, useEffect } from "react";
import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import navigation hook
import { IconButton, MD3Colors } from 'react-native-paper';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import * as ImaggePicker from 'expo-image-picker';
//
import Manager from "../../Components/Manager";

const ManagerProduct = () => {

  const navigation = useNavigation(); // Sử dụng hook navigation
  // route
  const route = useRoute();
  // Lấy dữ liệu từ route.params
  const { item, detail, flag } = route.params ?? { arrList: [] };
  const [details, setDetais] = useState(detail);
  const [flags, setFlags] = useState(flag ?? false);
  //Dropdown-picker
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Ao', value: 'Áo' },
    { label: 'Quan', value: 'Quần' },
  ]);
  //    
  const [id, setID] = useState(1);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [arrListtImage, setArrListImage] = useState([]);
  const [description, setDescription] = useState('');
  const [manager] = useState(new Manager());
  //
  const [arrList, setArrList] = useState([]);
  //Choose image
  const handleImagePickerPress = async () => {
    let result = await ImaggePicker.launchImageLibraryAsync({
      mediaTypes: ImaggePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    if (!result.canceled) {
      setArrListImage(prevState => [...prevState, result.assets[0].uri]);
    }
  }
  //Xử lý thêm
  const handleAddProduct = () => {
    setID(prevID => prevID + 1);
    // Cập nhật arrList sau khi thêm sản phẩm mới
    manager.addProduct(id, name, type, price, description, arrListtImage);
    console.log('Add', manager.epls);
    // Reset input fields
    navigation.navigate('ProductManagement', { arrList: manager.epls, idPr: id });
  };
  //Xử lý sửa
  const handleUpdateProduct = (item) => {
    const updateItem = ({
      ...item, 
      idPr: id,
      namePr: name, 
      typePr: type, 
      pricePr: price, 
      descriptionPr: description, 
      imagePr: arrListtImage,
    });
    //console.log('arrItem',updateItem);
    navigation.navigate('ProductManagement',{updateItem: updateItem});
  };
  // Khai báo hàm onPressButton và biến buttonText
  let onPressButton;
  let buttonText;
  if (detail ) {
    // Xử lý sửa sản phẩm
    buttonText = "Lưu";
  } else {
    // Xử lý thêm sản phẩm
    buttonText = "Thêm";
  }
  const clickText = () => {
    if(flags){
      if (details) {
        setID(item.idPr);
        setValue(item.typePr);
        setName(item.namePr);
        setPrice(item.pricePr);
        setDescription(item.descriptionPr);
        setArrListImage(item.imagePr);
        setDetais(false);
        // Xử lý sửa sản phẩm
        onPressButton = () => handleUpdateProduct();
      } 
      else {
        // Xử lý sửa sản phẩm
        onPressButton = () => handleUpdateProduct();
      }
    }
    else{
      // Xử lý thêm sản phẩm
      onPressButton = () => handleAddProduct();
    }
  }
  useEffect(() => {
    clickText();
  }, [handleUpdateProduct, handleAddProduct]);
  //hàm xóa hình ảnh
  const handleDeleteImage = (imagePr) => {
    console.log('deleteImage', imagePr);
    manager.removeImage(imagePr);
    const deleteImage = arrListtImage.filter(item => item !== imagePr); // xóa đồng bộ
    setArrListImage(deleteImage);
  }
  return (
    <View style={styles.container}>
      <View style={styles.addProduct}>
        <Text style={styles.product}>Chọn loại: </Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          defaultOption={{ label: 'Ao', value: 'Áo' }}
          onChangeValue={(item) => {
            console.log("Selected item:", item);
            setType(item)
          }}//xử lý được chọn
          style={styles.selectList}

        />
      </View>
      <View style={styles.addProduct}>
        <Text style={styles.product}>Tên sản phẩm: </Text>
        <TextInput
          value={name}
          keyboardType="default"
          placeholder="Nhập tên sản phẩm"
          editable={true}
          style={styles.item}
          onChangeText={(text) => setName(text)}//xử lý văn bản
        />
      </View>
      <View style={styles.addProduct}>
        <Text style={styles.product}>Giá: </Text>
        <TextInput
          value={price}
          keyboardType="numeric"
          placeholder="Nhập giá tiền"
          style={styles.item}
          onChangeText={(text) => setPrice(text)}
        />
      </View>
      <View style={styles.addProduct}>
        <Text style={styles.product}>Mô tả: </Text>
        <AutoGrowingTextInput
          value={description}
          keyboardType="default"
          placeholder="Nhập mô tả"
          style={styles.item}
          onChangeText={(text) => setDescription(text)}
        />
      </View>
      <View style={styles.addProduct}>
        <Text style={styles.product}>Hình ảnh: </Text>
        <TouchableOpacity style={styles.button}
          onPress={handleImagePickerPress}
        >
          <Text style={styles.buttonText}>Chọn hình</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setArrListImage([])}>
          <Text style={styles.buttonText}>Loại bỏ hình</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal={true}
        data={arrListtImage}
        renderItem={({ item }) => (
          <View style={styles.itemListImage}>
            <TouchableOpacity onPress={() => handleDeleteImage(item)}>
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
            {item && <Image source={{ uri: item }} style={styles.image} />}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <FlatList
        data={arrList}
        renderItem={({ item }) => (
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
                            Mô tả:{item.descriptionPr} 
                          </Text>     
                        </View>
                        <View style={styles.iconDelete}>
                            <IconButton
                                icon="delete"
                                size={25}
                            />
                        </View>
                    </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={() => onPressButton()}>
          <Text style={styles.buttonText}>{buttonText}</Text>
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
  product: {
    fontSize: 20,
  },
  addProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
  },
  item: {
    marginLeft: 'auto',
    height: 40,
    width: '65%',
    borderWidth: 1,
    padding: 10,
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
  render: {
    fontSize: 24,
    color: 'red',
  },
  itemListView: {
    flexDirection: 'row',
    padding: 10,
    fontSize: 18,
    width: 330,
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
    width: '65%',
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
    padding: 20,
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
  itemListImage: {
    marginHorizontal: 5,
    position: 'relative', // Đặt vị trí của container là 'relative'
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'white',
    zIndex: 1, // Đặt zIndex để nút nổi lên trên hình ảnh
  },
});
export default ManagerProduct;