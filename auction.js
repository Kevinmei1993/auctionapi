const express = require('express')

const router = express.Router()
const verify=require('../verifyToken')
//import model
const Auction = require('../models/Auction')
const User = require('../models/User')

//make asycrhronous request and response to database 
//try catch for error handling 
router.get('/',verify, async(req,res) =>{
    try{
        const auctions = await Auction.find()
        res.send(auctions)
    }catch(err){
        res.status(400).send({message:err})
    }
})

router.get('/:auctionid',verify,  async(req,res) =>{
    try{
        const getsold = await Auction.findById(req.params.auctionid)
        res.send(getsold)
    }catch(err){
        res.send({message:err})
    }
})

router.post('/',verify, async(req,res)=>{
 //console.log(req.body)


    const auctionData = new Auction({
        bidding_price:req.body.bidding_price,
        bidder:req.body.bidder,
        status:req.body.status,
        time_left:req.body.time_left,
        item_title:req.body.item_title,
        winner:req.body.winner

        
    })
   // const user = await User.findOne({bidder:req.body.bidder})
//if(user){
   //     res.status(400).send({message:'User cannot bid for own item'})
 // } 
    try{
        const auctionToSave = await auctionData.save()
        res.send(auctionToSave)
    }catch(err){
        res.send({message:err})
    }
})





module.exports = router