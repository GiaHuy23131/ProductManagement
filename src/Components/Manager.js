import { Alert } from "react-native";
import Admin from "../Class/Admin";
export default class Manager{
    constructor(){
        this.epls = [];
    }
    //thêm sản phẩm
    addProduct(idPr, namePr,typePr,pricePr,descriptionPr,imagePr){
        const newProduct = new Admin(idPr, namePr,typePr,pricePr,descriptionPr,imagePr);
        this.epls.push(newProduct);
        fetch('http://192.168.232.194/apiProduct/createProduct.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idPr: idPr,
                namePr: namePr,
                typePr: typePr,
                pricePr: pricePr,
                descriptionPr: descriptionPr,
                imagePr: imagePr,
            })
        }).then((response) => {
            return response.json()
        })
            .then((responseJson) => {
                Alert.alert(JSON.stringify(responseJson));
            }).catch((error) => {
                console.error(error);
            })
    };
    //hiển thị sản phẩm
    showProduct(){ 
        let result = ""; 
        this.epls.forEach((product,index) => {
            result +=`${index +1} Id ${ product.idPr} Tên ${ product.namePr},- Loại ${ product.typePr},- Giá ${ product.pricePr},- Mô tả ${ product.descriptionPr},- Hình ảnh ${ product.imagePr}\n` 
        });
        return result;
    }
    //xóa sản phẩm
    removeProduct(idPr){
        for (let i = 0; i < this.epls.length; i++) {
            if(this.epls[i].getIdPr() == idPr){
                this.epls.splice(i,1);
                //sau khi xóa, cập nhật lại ID của các sản phẩm còn lại
                for (let j = i; j < this.epls.length; j++) {
                    this.epls[j].setIdPr(j+1);
                }
                return this.epls;
            }
        }
    }
    //sửa sản phẩm
    updateProduct(idPr, namePr,typePr,pricePr,descriptionPr,imagePr){
        fetch(`http://192.168.232.194/apiProduct/updateProduct.php?idPr=${idPr}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idPr: idPr,
                namePr: namePr,
                typePr: typePr,
                pricePr: pricePr,
                descriptionPr: descriptionPr,
                imagePr: imagePr,
            })
        }).then((res) => {
            return res.json()
        }).then((resJson) => {
            Alert.alert(JSON.stringify(resJson));
        }).catch((err) => {
            console.error('error: ', err);
        })
    }
    //xóa hình ảnh
    removeImage(imagePr){
        for(let i = 0; i < this.epls.length; i++){
            const images = this.epls[i].getImagePr();
            for (let j = 0; j < images.length; j++) {
                if(images[i] === imagePr){
                    images.splice(j,1);
                    return;
                }
                
            }
        }
    }
}