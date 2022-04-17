const mongoose = require('mongoose')

const auctionSchema = mongoose.Schema({
    
    bidding_price:{
        type:Number
    },
    bidder:{
        type:String
    },
    status:{
        type:String
    },
    time_left:{
        type:String
    },
    item_title:{
        type:String
    },
    winner:{
        type:String
    }
})
//map the database collection in mongodb to itemSchema
module.exports = mongoose.model('auctions',auctionSchema)