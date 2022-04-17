const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    
    item_title:{
        type:String
    },
    item_timestamp :{
        type:String
    },
    item_condition:{
        type:String
    },
    item_description:{
        type:String
    },
    auction_expiration:{
        type:String
    },
    owner_info:{
        type:String
    }
})
//map the database collection in mongodb to itemSchema
module.exports = mongoose.model('items',itemSchema)