var mongoose=require("mongoose"),
    Campground=require("./models/campground"),
    Comment=require("./models/comment");

var data = [
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",description:"Good and warm campground to hangout at Winter!"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",description:"One of the costliest campgrounds rich people's choice"},
        {name: "Mountain Goat's Rest", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg",description:"Find it cooler at any time; Best place to hangout with family and friendsContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."}
];

function seedDB(){
  Campground.remove({},function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("Removed all campgrounds");
      data.forEach(function(seed){
        Campground.create(seed,function(err,campground){
          if(err){
            console.log(err);
          }
          else{
            console.log("Added a campground");
            Comment.create({text:"This place is great but I wish there was Internet!",author:"Colt"},function(err,comment){
              campground.comments.push(comment._id);
              campground.save();
              console.log("Created a comment");
            });
          }
        });
      });
    }
  });
}
module.exports=seedDB;