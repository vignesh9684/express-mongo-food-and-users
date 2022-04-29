var express = require('express');
var router = express.Router();
const {dbUrl,mongodb,MongoClient} = require('../dbconfig');

/* GET home page. */
// get all food
router.get('/', async(req,res) => {
const client = await MongoClient.connect(dbUrl);
try{
  const db = await client.db('express');
  const foods = await db.collection('food').find().toArray()
  res.send({
      statusCode:200,
      data:foods
  })
}
catch(error)
{
  res.send({
      statusCode:500,
      message:"Internal server error"
  })
}
finally
{
 client.close()
}

}
);


// get food by category
// get food by category
// get food by sub-category
// get food both by category and sub-category
router.get('/type', async(req,res) => {
    const client = await MongoClient.connect(dbUrl);
    try {
        const db = await client.db('express');
        let food;
        if(req.body.category && req.body.sub_category)
        {
           food = await db.collection('food').find({ 
           $and:[
               {category: req.body.category},
               {sub_category: req.body.sub_category}
           ]     
           }).toArray()
        }
        else if(req.body.category && ! req.body.sub_category)
        {
            food = await db.collection('food').find({category: req.body.category}).toArray()
        }
        else if(! req.body.category && req.body.sub_category)
        {
            food = await db.collection('food').find({sub_category: req.body.sub_category}).toArray()
        }
        // console.log(req.body.sub_category);
        res.send({
            statusCode:200,
            message:"find food by category",
            data:food
        })

    } catch (error) {
        console.log(error);
        res.send({
            statusCode:500,
            message:"500 internal server error",
        })
    }
    finally
    {
        client.close();
    }
}
);

router.get('/sort/:order',async(req,res) => {

    const client = await MongoClient.connect(dbUrl);
    const order = req.params.order
    try {
        const db = await client.db('express');
        const food = await db.collection('food').find().sort({price:order}).toArray()
        res.send({
            statusCode: 200,
            data:food
        })
    } 
    catch (error) {
        res.send({
            statusCode:500,
            message:"Internal server error"
        })
    }
    finally{
      client.close();
    }





});

// create food
router.post('/', async(req,res) => {

    const client = await MongoClient.connect(dbUrl);
    try {
        const db = await client.db('express');
        var food = await db.collection('food').insertOne(req.body);
        res.send({
            statusCode:200,
            message:"food added successfully",
            data:food
        })


    } catch (error) {
        console.log(error);
        res.send({
            statusCode:500,
            message:"500 internal server error",
        })
    }
    finally
    {
        client.close();
    }
}
);

// update food
router.put('/:id', async(req,res) => {
      const id = req.params.id;
      const client = await MongoClient.connect(dbUrl);
    
    try {
        const db = await client.db('express');
        var food = await db.collection('food').findOneAndReplace({_id:mongodb.ObjectId(id)},req.body);
         res.send({
               statusCode:200,
               message:"changes applied successfully",
               data:food
            })

    } catch (error) {
        res.send({
            statusCode:500,
            message:"Internal server error"
        })
    }
    finally{
        client.close()
    }
}
);

// delete food
router.delete('/:id', async(req,res) => {

    const id = req.params.id;
      const client = await MongoClient.connect(dbUrl);
    
    try {
        const db = await client.db('express');
        var food = await db.collection('food').findOneAndDelete({_id:mongodb.ObjectId(id)},req.body);
        console.log(food)
         res.send({
               statusCode:200,
               message:"data deleted successfully",
               data:food
            })
        
    } catch (error) {
        res.send({
            statusCode:500,
            message:"Internal server error"
        })
    }
    finally{
        client.close()
    }

}
);



module.exports = router;
