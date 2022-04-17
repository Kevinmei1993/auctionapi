const express = require('express')

const router = express.Router()
const verify=require('../verifyToken')
//import model
const Item = require('../models/Item')
//make asycrhronous request and response to database 
//try catch for error handling 
router.get('/',verify, async(req,res) =>{
    try{
        const items = await Item.find()
        res.send(items)
    }catch(err){
        res.status(400).send({message:err})
    }
})

router.get('/:itemId',verify, async(req,res) =>{
    try{
        const getitemById = await Item.findById(req.params.itemId)
        res.send(getitemById)
    }catch(err){
        res.send({message:err})
    }
})

router.post('/',verify,async(req,res)=>{
 //console.log(req.body)


    const itemData = new Item({
        item_title:req.body.item_title,
        item_timestamp:req.body.item_timestamp,
        item_condition:req.body.item_condition,
        item_description:req.body.item_description,
        auction_expiration:req.body.auction_expiration,
        owner_info:req.body.owner_info


        
    })
    // try to insert...
    try{
        const itemToSave = await itemData.save()
        res.send(itemToSave)
    }catch(err){
        res.send({message:err})
    }
})





module.exports = router