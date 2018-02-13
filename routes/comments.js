var express=require("express"),
    router=express.Router({mergeParams:true}),
    Campground=require("../models/campground"),
    Comment=require("../models/comment"),
    middleware=require("../middleware");

//COMMENTS ROUTE
//NEW
router.get("/new",middleware.isLoggedIn,function(req,res){
  Campground.findById(req.params.id,function(err,campground){
    if(err){
      console.log(err);
    }
    else{
      res.render("comments/new",{campground:campground});
    }
  });
});
//CREATE
router.post("/",middleware.isLoggedIn,function(req,res){
  Campground.findById(req.params.id,function(err,campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    }
    else{
      Comment.create(req.body.comment,function(err,comment){
        if(err){
          console.log(err);
        }
        else{
          comment.author.id=req.user._id;
          comment.author.username=req.user.username;
          comment.save();
          campground.comments.push(comment._id);
          campground.save(function(err){
            if(err){
              console.log(err);
            }
            else{
//               console.log("Comment submitted");
              req.flash("success","Comment added successfully");
              res.redirect("/campgrounds/"+req.params.id);
            }
          });
        }
      });
    }
  });
});
//EDIT
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
  Comment.findById(req.params.comment_id,function(err,foundComment){
    if(err){
      res.send("back");
    }
    else{
      res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
    }
  }); 
});
//UPDATE
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,foundComment){
    if(err){
      res.redirect("back");
    }
    else{
      req.flash("success","Comment updated successfully");
      res.redirect("/campgrounds/"+req.params.id);
    }
  });
});
//DESTROY
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id,function(err){
    if(err){
      res.redirect("back");
    }
    else{
      req.flash("success","Comment deleted");
      res.redirect("/campgrounds/"+req.params.id);
    }
  })
});

module.exports=router;
