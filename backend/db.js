const e = require('express');
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://zwiggy:Mrsmarty8041&@cluster0.tburwgn.mongodb.net/zwiggy?retryWrites=true&w=majority&appName=Cluster0'
const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log('Connected!');
      let fetched_data1 = mongoose.connection.db.collection("mysample");
      let data1=await fetched_data1.find({}).toArray() 
      // console.log(data);
      // global.food_items=data;
      // console.log(global.food_items);
      let fetched_data2=mongoose.connection.db.collection("mysample2");
      let data2=await fetched_data2.find({}).toArray() 
       global.food_items=data1;
       global.food_category=data2;
    } catch (error) {
      console.log('err: ', error);
    }
  };

module.exports = mongoDB;

