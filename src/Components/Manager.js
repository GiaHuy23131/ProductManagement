import { Alert } from "react-native";
import React, { Component, useState, useEffect } from "react";
import Admin from "../Class/Admin";
import { storage, database } from "../FireBase/firebaseConfig";
import { child, push, ref as databaseRef, set, remove, update } from "firebase/database";
import { ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject,getMetadata } from "firebase/storage";
import * as FileSystem from 'expo-file-system';

export default class Manager {
    constructor() {
        this.epls = [];
    }
    //thêm sản phẩm
    addProduct(idPr, namePr, typePr, pricePr, descriptionPr, imagePr) {
        //test 
        // const newProduct = new Admin(idPr, namePr, typePr, pricePr, descriptionPr, imagePr);
        // this.epls.push(newProduct);
        //FireBase
        const newKey = push(child(databaseRef(database), 'product')).key;//id ramdon
        set(databaseRef(database, 'product/' + newKey), {
            idPr: newKey,
            namePr: namePr,
            typePr: typePr,
            pricePr: pricePr,
            descriptionPr: descriptionPr,
            imagePr: imagePr,
        }).then(() => {
            Alert.alert('Thêm thành công');
            this.imageUploading(newKey, imagePr);
        })
            .catch((error) => { 
                console.error(error);
            });
        //Api php
        // fetch('http://192.168.232.194/apiProduct/createProduct.php', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         idPr: idPr,
        //         namePr: namePr,
        //         typePr: typePr,
        //         pricePr: pricePr,
        //         descriptionPr: descriptionPr,
        //         imagePr: imagePr,
        //     })
        // }).then((response) => {
        //     return response.json()
        // })
        //     .then((responseJson) => {
        //         Alert.alert(JSON.stringify(responseJson));
        //     }).catch((error) => {
        //         console.error(error);
        //     })
    };
    //Image upload
    async imageUploading(idPr, imagePr) {
        try {
            for (const imageUri of imagePr) {
                console.log('imagePr', imageUri);
                //xử lý đường dẫn trong file
                const fileInfo = await FileSystem.getInfoAsync(imageUri);
                console.log('fileInfo', fileInfo);
                if (!fileInfo.exists) {
                    throw new Error('File does not exist');
                }

                // Chuyển đổi hình ảnh sang blob
                const blobImage = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        resolve(xhr.response);
                    };
                    xhr.onerror = function () {
                        reject(new TypeError('Network request failed'));
                    };
                    xhr.responseType = 'blob';
                    xhr.open('GET', imageUri, true);
                    xhr.send(null);
                });
                console.log('imageUri', imageUri);
                const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
                //console.log('fileName',fileName);
                const storageRefs = storageRef(storage, `images/${idPr}/` + fileName);
                const uploadTask = uploadBytesResumable(storageRefs, blobImage);

                // Giám sát quá trình tải lên
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Tiến trình tải lên
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    },
                    (error) => {
                        // Xử lý lỗi tải lên
                        console.error('Upload failed', error);
                        setUploading(false);
                    },
                    async () => {
                        // Xử lý khi tải lên hoàn tất
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log('File available at', downloadURL);
                        //Alert.alert('Image uploaded', 'Image uploaded successfully!');
                        // Giải phóng blob
                        blobImage.close();
                    }
                );
            }
            //Alert.alert('Image upload', 'All images have been uploaded successfully');
        } catch (error) {
            console.error(error);
        }
    }
    //hiển thị sản phẩm
    showProduct() {

    }
    //xóa sản phẩm
    async removeProduct(idPr,imagePr) {
        //sắp xếp id
        // for (let i = 0; i < this.epls.length; i++) {
        //     if (this.epls[i].getIdPr() == idPr) {
        //         this.epls.splice(i, 1);
        //         //sau khi xóa, cập nhật lại ID của các sản phẩm còn lại
        //         for (let j = i; j < this.epls.length; j++) {
        //             this.epls[j].setIdPr(j + 1);
        //         }
        //         return this.epls;
        //     }
        // }
        remove(databaseRef(database, 'product/' + idPr)).then(() => {
            Alert.alert('remove product');
        }).catch((error) => {
            console.error(error);
        })     
        for (const imageUri of imagePr) {
            console.log('imagePr', imageUri);
                //xử lý đường dẫn trong file 
                const fileInfo = await FileSystem.getInfoAsync(imageUri); 
                console.log('fileInfo', fileInfo);
                if (!fileInfo.exists) {
                    throw new Error('File does not exist');
                }
                const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
                //console.log('fileName',fileName);
                const imagePath = `images/${idPr}/` + fileName;
                console.log('imagePath',imagePath);
                const ref = storageRef(storage, imagePath);
                // Tiếp tục xóa tệp
                deleteObject(ref)
                    .then(() => {
                        //alert('Đã xóa hình ảnh');
                    })
                    .catch((error) => {
                        console.error('Lỗi khi xóa tệp:', error);
                    });
        }
    };
    //sửa sản phẩm
    updateProduct(idPr, namePr, typePr, pricePr, descriptionPr, imagePr) {
        // fetch(`http://192.168.232.194/apiProduct/updateProduct.php?idPr=${idPr}`, {
        //     method: "PUT",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         idPr: idPr,
        //         namePr: namePr,
        //         typePr: typePr,
        //         pricePr: pricePr,
        //         descriptionPr: descriptionPr,
        //         imagePr: imagePr,
        //     })
        // }).then((res) => {
        //     return res.json()
        // }).then((resJson) => {
        //     Alert.alert(JSON.stringify(resJson));
        // }).catch((err) => {
        //     console.error('error: ', err);
        // })
        // A post entry.
        update(databaseRef(database, 'product/' + idPr), {
            namePr: namePr,
            typePr: typePr,
            pricePr: pricePr,
            descriptionPr: descriptionPr,
            imagePr: imagePr,
        }).then(() => {
            Alert.alert('Sửa thành công')
            this.imageUploading(idPr,imagePr);
        })
            .catch((error) => {
                console.error(error);
            });
    }
    //xóa hình ảnh
    removeImage(imagePr) {
        for (let i = 0; i < this.epls.length; i++) {
            const images = this.epls[i].getImagePr();
            for (let j = 0; j < images.length; j++) {
                if (images[i] === imagePr) {
                    images.splice(j, 1);
                    return;
                }

            }
        }
    }
}