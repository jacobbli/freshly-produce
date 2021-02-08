let db = require('../db/db');

function addProduct(obj){
    let sql = "INSERT INTO items (product_name, product_type, product_price, unit, quantity, user_id) values ('"+ obj.product_name +"','"+  obj.product_type +"','"+ obj.product_price +"','" +obj.unit+"','"+ obj.quantity + "','" + obj.user_id + ")"

    return db.query(sql);
}

function addCloseToExpiryProduct(obj){
    let sql = "INSERT INTO items (product_name, product_type, product_price, unit, quantity, expiration_date, user_id) values ('"+ obj.itemName +"','"+  obj.category +"','"+ obj.officeName +"','" +obj.dateReceived+"','"+ obj.serialNo + "','" + obj.manufacturer +"',"+ obj.jobNo + ")"

    return db.query(sql);
}

module.exports = {
    add : addProduct,
    addExpiry : addCloseToExpiryProduct,
}