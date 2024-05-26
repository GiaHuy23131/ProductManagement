import React, { Component, useState, useEffect } from "react";
import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import navigation hook
import { IconButton, MD3Colors } from 'react-native-paper';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import * as ImagePicker from 'expo-image-picker';
import { storage, database } from "../../FireBase/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as FileSystem from 'expo-file-system';
import { v4 as uuidv4 } from 'uuid';
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
  const [upLoad, setUploading] = useState(false);
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [arrListImage, setArrListImage] = useState([]);
  const [description, setDescription] = useState('');
  const [manager] = useState(new Manager());
  //
  const [arrList, setArrList] = useState([]);
  //hàm tạo id ramdon
  function generateUUID() {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now(); // Sử dụng độ chính xác cao hơn nếu có
    }
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
  //Choose image
  const handleImagePickerPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    if (!result.canceled) {
      setArrListImage(prevState => [...prevState, result.assets[0].uri]);
    }
  }
  //upload file
  // const uploadImage = async () => {
  //   setUploading(true);
  //   const randomId = generateUUID(); // Tạo ID ngẫu nhiên
  //   try {
  //     for (const imageUri of arrListImage) {
  //       //xử lý đường dẫn trong file
  //       const fileInfo = await FileSystem.getInfoAsync(imageUri);
  //       console.log('arrListImage',arrListImage);
  //       console.log('imageUri',imageUri);
  //       console.log('fileInfo',fileInfo);
  //       if (!fileInfo.exists) {
  //         throw new Error('File does not exist');
  //       }

  //       // Chuyển đổi hình ảnh sang blob
  //       const blobImage = await new Promise((resolve, reject) => {
  //         const xhr = new XMLHttpRequest();
  //         xhr.onload = function () {
  //           resolve(xhr.response);
  //         };
  //         xhr.onerror = function () {
  //           reject(new TypeError('Network request failed'));
  //         };
  //         xhr.responseType = 'blob';
  //         xhr.open('GET', imageUri, true);
  //         xhr.send(null);
  //       });
  //       console.log('imageUri',imageUri);
  //       const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
  //       //console.log('fileName',fileName);
  //       const storageRef = ref(storage, `images/${randomId}/` + fileName);
  //       const uploadTask = uploadBytesResumable(storageRef, blobImage);

  //       // Giám sát quá trình tải lên
  //       uploadTask.on('state_changed',
  //         (snapshot) => {
  //           // Tiến trình tải lên
  //           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //           console.log('Upload is ' + progress + '% done');
  //         },
  //         (error) => {
  //           // Xử lý lỗi tải lên
  //           console.error('Upload failed', error);
  //           setUploading(false);
  //         },
  //         async () => {
  //           // Xử lý khi tải lên hoàn tất
  //           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  //           console.log('File available at', downloadURL);
  //           Alert.alert('Image uploaded', 'Image uploaded successfully!');
  //           // Giải phóng blob
  //           blobImage.close();
  //         }
  //       );
  //     }

  //     Alert.alert('Image upload', 'All images have been uploaded successfully');
  //   } catch (error) {
  //     console.error('err', error);
  //   } finally {
  //     setUploading(false);
  //   }

  // };
  //Xử lý thêm
  const handleAddProduct = () => {
    //const newIDPr = manager.epls.length > 0 ? Math.max(...manager.epls.map(item => item.idPr)) + 1 : 1;
    //console.log('newID', newIDPr);
    //set dữ liệu vào mảng
    //setArrList(prevState => prevState.concat(manager.epls.map(item => ({ ...item, idPr: newIDPr })))); // Thêm ID mới vào mỗi phần tử trong arrList
    // Cập nhật arrList sau khi thêm sản phẩm mớ
    if (name == "") {
      return Alert.alert('Nhập tên');
    } else if (type == "") {
      return Alert.alert('Chọn loại');
    } else if (price == "") {
      return Alert.alert('Nhập giá');
    } else if (arrListImage == "") {
      return Alert.alert('Chọn ảnh');
    } else if (description == "") {
      return Alert.alert('Nhập mô tả');
    } else {
      manager.addProduct(id, name, type, price, description, arrListImage);
      //uploadImage();
      console.log('Add', manager.epls);

      // Reset input fields 
      navigation.navigate('ProductManagement');
    }

  };
  //Xử lý sửa
  const handleUpdateProduct = () => {
    manager.updateProduct(id, name, type, price, description, arrListImage);

    // const updateItem = ({
    //   ...item,  
    //   idPr: id,
    //   namePr: name, 
    //   typePr: type, 
    //   pricePr: price, 
    //   descriptionPr: description, 
    //   imagePr: arrListImage,
    // });
    //console.log('arrItem',updateItem);
    // navigation.navigate('ProductManagement',{updateItem: updateItem});
    navigation.navigate('ProductManagement');
  };
  // Khai báo hàm onPressButton và biến buttonText
  let onPressButton;
  let buttonText;
  if (detail) {
    // Xử lý sửa sản phẩm
    buttonText = "Lưu";
  } else {
    // Xử lý thêm sản phẩm
    buttonText = "Thêm";
  }
  const clickText = () => {
    if (flags) {
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
    else {
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
    const deleteImage = arrListImage.filter(item => item !== imagePr); // xóa đồng bộ
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
        data={arrListImage}
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
            {item.imagePr[0] && <Image source={{ uri: item.imagePr[0] }} style={styles.image} />}
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