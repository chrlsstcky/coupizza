let MongoClient = require('mongodb').MongoClient; 
let url = 'mongodb://localhost:27017/papa'; 

let exampleCode = {

} 

(()=>{
  return MongoClient.connect(url)
    .then((db)=>{
      return db.collection('codes').insertMany({"zip": /(\d{5})/g, "code": "This is a code."})
    })
    .then((db)=>{
      console.log('"papa" db created');
      console.log('"codes" collection created.'); 
      console.log('Inserted document with a zipcode of "99999"'); 
      return db; 
    })
})()
