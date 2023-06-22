const mongoose = require('mongoose');
//const mongoURL= "mongodb://ac-lmb5idk-shard-00-00.t8ijvwj.mongodb.net:27017,ac-lmb5idk-shard-00-01.t8ijvwj.mongodb.net:27017,ac-lmb5idk-shard-00-02.t8ijvwj.mongodb.net:27017/eFoodmern?replicaSet=atlas-qg5cp0-shard-0 --ssl --authenticationDatabase admin --username eFood --password Njtechnur"
const mongoURL= 'mongodb+srv://eFood:Njtechnur@cluster0.t8ijvwj.mongodb.net/eFoodmern?retryWrites=true&w=majority';
// const mongoURL='mongodb://eFood:Njtechnur@1@ac-lmb5idk-shard-00-00.t8ijvwj.mongodb.net:27017,ac-lmb5idk-shard-00-01.t8ijvwj.mongodb.net:27017,ac-lmb5idk-shard-00-02.t8ijvwj.mongodb.net:27017/eFoodmern?ssl=true&replicaSet=atlas-qg5cp0-shard-0&authSource=admin&retryWrites=true&w=majority'
const mongoDB = async()=>{
   await mongoose.connect(mongoURL,{useNewUrlParser:true},async(err,result) =>{
    if(err){
      console.log("---",err);
    }
    else{
      console.log("connected");
      const fetched_data= await mongoose.connection.db.collection("food_items");
      fetched_data.find({}).toArray(async function(err,data){
        const foodCategory=await mongoose.connection.db.collection("food_category");
        foodCategory.find({}).toArray(function(err,catData){
          if(err){console.log(err);}
          else{
           global.food_items =data;
           global.food_category =catData;
         }
    })
     
   })
  }  
 });   
}

module.exports =mongoDB;

