var express=require("express"),
    router=express.Router(),
    passport=require("passport"),
    User=require("../models/user");

//INDEX Route
router.get("/",function(req,res){
   res.render("landing"); 
});



//============
//Auth ROUTES
//============

//show register form
router.get("/register",function(req,res){
  res.render("register");
});
//handling signup
router.post("/register",function(req,res){
  User.register(new User({username:req.body.username}),req.body.password,function(err,user){
    if(err){
      req.flash("error",err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req,res,function(){
      req.flash("success","Successfully signed up, Welcome "+user.username+"!");
      res.redirect("/campgrounds");
    });
  });
});

//show login form
router.get("/login",function(req,res){
  res.render("login");
});
//handling login
router.post("/login",passport.authenticate("local",{
  successRedirect:"/campgrounds",
  failureRedirect:"/login"
}),function(req,res){
});

//logout
router.get("/logout",function(req,res){
  req.logout();
  req.flash("success","Successfully Logged Out!");  
  res.redirect("/campgrounds");
});


module.exports=router;