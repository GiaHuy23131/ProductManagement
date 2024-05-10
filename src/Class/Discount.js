class Discount { 
    constructor(idDis, nameDis,codeDis, priceDis,fromDateDis,toDateDis,descriptionDis,statusDis){
        this.idDis = idDis;
        this.nameDis = nameDis;
        this.codeDis = codeDis;
        this.priceDis = priceDis;
        this.fromDateDis = fromDateDis;
        this.toDateDis = toDateDis;
        this.descriptionDis = descriptionDis;
        this.statusDis = statusDis;
    }
    setIdDis(idDis){
        this.idDis = idDis;
    }
    getIdDis(){
        return this.idDis;
    }
    setNameDis(nameDis){
        this.nameDis = nameDis;
    }
    getNameDis(){
        return this.nameDis;
    }
    setCodeDis(codeDis){
        this.codeDis = codeDis;
    }
    getCodeDis(){
        return this.codeDis;
    }
    setPriceDis(priceDis){
        this.priceDis = priceDis;
    }
    getPriceDis(){
        return this.priceDis;
    }
    setFromDateDis(fromDateDis){
        this.fromDateDis = fromDateDis;
    }
    getFromDateDis(){
        return this.fromDateDis;
    }
    SetToDateDis(toDateDis){
        this.toDateDis = toDateDis;
    }
    getToDateDis(){
        return this.toDateDis;
    }
    setDescriptionDis(descriptionDis){
        this.descriptionDis = descriptionDis;
    }
    getDescriptionDis(){
        return this.descriptionDis;
    }
    setStatusDis(statusDis){
        this.statusDis = statusDis;
    }
    getStatusDis(){
        return this.statusDis;
    }
    
}
export default Discount;