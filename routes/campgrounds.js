var express=require("express"),
    router=express.Router(),
    Campground=require("../models/campground"),
    middleware=require("../middleware");


//Campground Routes

//LANDING
router.get("/",function(req,res){
   Campground.find({},function(err,campgrounds){
     if(err){
       console.log(err);
     }
     else{
       res.render("campgrounds/index",{campgrounds:campgrounds}); 
     }
   });
});

//CREATE
router.post("/",middleware.isLoggedIn,function(req,res){
   var name=req.body.name; 
   var image=req.body.image;
   var description=req.body.description;
  var author={id:req.user._id,username:req.user.username};
   var newcampground={name:name,image:image,description:description,author:author}; 
   //campgrounds.push(newcampground);
  Campground.create(newcampground,function(err,campground){
    if(err){
      console.log(err);
    }
    else{
        req.flash("success","Successfully added a campground!");
        res.redirect("/campgrounds");
    }
  });
});

//NEW
router.get("/new",middleware.isLoggedIn,function(req,res){
   res.render("campgrounds/new"); 
});

//SHOW
router.get("/:id",function(req,res){
  Campground.findById(req.params.id).populate("comments").exec(function(err,campground){
    if(err){
      console.log(err);
    }
    else{
      res.render("campgrounds/show",{campground:campground});
    }
  });
});

//EDIT
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
  Campground.findById(req.params.id,function(err,foundCampground){
    res.render("campgrounds/edit",{campground:foundCampground});
  });
});

//UPDATE

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
  Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,foundCampground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    }
    else{
      req.flash("success","Campground updated successfully");
      res.redirect("/campgrounds/"+req.params.id);
    }
  });
});

//DESTROY

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
  Campground.findByIdAndRemove(req.params.id,function(err){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    }
    else{
      req.flash("success","Campground deleted");
      res.redirect("/campgrounds");
    }
  });
});

module.exports=router;
