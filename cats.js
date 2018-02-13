var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
  name:String,
  age:Number,
  temperament:String
});

var Cat=mongoose.model("Cat",catSchema);

var george= new Cat({
  name:"George",
  age:7,
  temperament:"cool"
});

george.save(function(err,cat){
  if(err){
    console.log(err);
  }
  else{
    console.log(cat);
  }
});

//or create directly instead of creating and saving

Cat.create({
  name:"Rock",
  age:11,
  temperament:"funny"},function(err,cat){
   if(err){
    console.log(err);
  }
  else{
    console.log(cat);
  }
});

Cat.find({},function(err,cats){
     if(err){
    console.log(err);
  }
  else{
    console.log("ALL THE CATS \n")
    console.log(cats);
}});


