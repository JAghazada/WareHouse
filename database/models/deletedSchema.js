const mongoose = require("mongoose");

const deletedSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    },
    deletedAt:{
        type:Date,
        default : Date.now,
    }
});

module.exports= mongoose.model("DeletedProductSchema",deletedSchema);
