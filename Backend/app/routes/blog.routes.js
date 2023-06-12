const { authJwt } = require("../middlewares");
module.exports = app => {
    const blog = require("../controllers/blog.controller.js");
  
    var router = require("express").Router();

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
  
    // Create 
    router.post("/",[authJwt.verifyToken], blog.create);
  
    // Retrieve all 
    router.get("/", [authJwt.verifyToken], blog.findAll);
  
   
    // Retrieve a single 
    router.get("/:id" , [authJwt.verifyToken], blog.findOne);
  
    // Update a  with id
    router.put("/:id" , [authJwt.verifyToken], blog.update);
  
    // Delete with id
    router.delete("/:id" , [authJwt.verifyToken], blog.delete);
  
    
    router.delete("/" , [authJwt.verifyToken], blog.deleteAll);
  
    app.use("/api/blog", router);
  };
  