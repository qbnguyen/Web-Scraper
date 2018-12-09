var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticlesSchema = new Schema({
        title:{
        type:String,
        require:true,
        index:{
            unique:true
        }
    },
        link:{
            type: String,
            require: true
        },
        summary:{
            type: String,
            require: true
        }
    
});

var Articles = mongoose.model("Articles", ArticlesSchema);
module.exports = Articles;