import { Alert } from "react-native";
import Discount from "../Class/Discount";
import { database } from "../FireBase/firebaseConfig";
import { child, push, ref, set, remove,update } from "firebase/database";

export default class ManagerDiscount {
    constructor() {
        this.epls = [];
    }
    //thêm sản phẩm
    addDiscount(idDis, nameDis,codeDis, priceDis,descriptionDis,statusDis) {
        //FireBase
        const newKey = push(child(ref(database), 'discount')).key;//id ramdon
        set(ref(database, 'discount/' + newKey), {
            idDis: newKey,
            nameDis: nameDis,
            codeDis: codeDis,
            priceDis: priceDis,
            descriptionDis: descriptionDis,
            statusDis: statusDis,
        }).then(() => {
            Alert.alert('Thêm thành công')
        })
            .catch((error) => {
                console.error(error);
            });
    };
    //xóa sản phẩm
    removeDiscount(idDis) {
        remove(ref(database, 'discount/' + idDis));
        alert('remove');
    };
    //sửa sản phẩm
    updateDiscount(idDis, nameDis,codeDis, priceDis,descriptionDis,statusDis) {
        update(ref(database, 'discount/' + idDis), {
            nameDis: nameDis,
            codeDis: codeDis,
            priceDis: priceDis,
            descriptionDis: descriptionDis,
            statusDis: statusDis,
        }).then(() => {
            Alert.alert('Sửa thành công')
        })
            .catch((error) => {
                console.error(error);
            });
    }
}