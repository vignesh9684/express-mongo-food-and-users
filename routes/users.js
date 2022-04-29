var express = require('express');
var router = express.Router();
/*
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send("welcome to user page");
// });
//*/

var {dbUrl} = require('../dbconfig');
const mongoose = require('mongoose');
const {UserDetails} = require('../schema');

mongoose.connect(dbUrl);
// mongoose.disconnect();

router.get('/',async(req,res)=>{
  
    try {
        const details = await UserDetails.find()
        res.send({
            statusCode:200,
            message:"all users data found successfully",
            users:details
        })
    } catch (error) {
        console.log(error);
        res.send({
            StatusCode:500,
            message:"internal server error",
            error:error
        })
    }



})


router.post('/',async(req,res) =>{

   try {
       const details = await UserDetails.create(req.body);  
       res.send({
           StatusCode:201,
           message:"user data created successfully"
       })
       
   } catch (error) {
       console.log(error);
    res.send({
        statusCode:500,
        message:"500 internal server error",
        error:error
    })
   }
  
})

router.put('/:id',async(req,res)=>{

 try {
     const details = await UserDetails.updateOne({_id:req.params.id},req.body)
     res.send({
         statusCode:200,
         message:"modified users data successfully",
         data:details
     })


 } catch (error) {
     console.log(error);
     res.send({ 
         statusCode:500,
         message:"Internal server error",
         error:error
     })
 }


})

router.delete('/:id',async(req,res)=>{

    try {
        const details = await UserDetails.deleteOne({_id:req.params.id},res.body)
        res.send({
            statusCode:200,
            message:'Successfully deleted',
            data:details
        })
    } catch (error) {
        console.log(error);
        res.send({
            statusCode:500,
            message:"Internal server error",
            error:error
        })
    }
})

module.exports = router;
