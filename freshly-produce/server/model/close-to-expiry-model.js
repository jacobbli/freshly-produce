let db = require('../db/db');

function addItem(obj){
    let sql = "INSERT INTO items (item_name, category, office_name, date_received, serial_no, manufacturer,  job_no) values ('"+ obj.itemName +"','"+  obj.category +"','"+ obj.officeName +"','" +obj.dateReceived+"','"+ obj.serialNo + "','" + obj.manufacturer +"',"+ obj.jobNo + ")"

    return db.query(sql);
}