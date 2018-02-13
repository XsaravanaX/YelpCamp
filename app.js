var express=require("express"),
    mongoose=require("mongoose"),
    flash=require("connect-flash"),
    app=express(),
    campgroundRoutes=require("./routes/campgrounds"),
    commentRoutes=require("./routes/comments"),
    indexRoutes=require("./routes/index"),
    bodyparser=require("body-parser"),
    passport=require("passport"),
    methodOverride=require("method-override"),
    LocalStrategy=require("passport-local"),
    User=require("./models/user"),
    Campground=require("./models/campground"),
    Comment=require("./models/comment"),
    seedDB=require("./seeds");

mongoose.connect(process.env.DATABASEURL);
//seedDB();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIG

app.use(require("express-session")({
  secret:"Find the password secret if you can",
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  res.locals.currentUser=req.user;
  res.locals.error=req.flash("error");
  res.locals.success=req.flash("success");
  next();
});

//ROUTES
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(indexRoutes);


app.listen(process.env.PORT||3000,process.env.IP,function(){
   console.log("YelpCamp server has started!"); 
});