//Steps:
//1.Define Schema -> Note: id,userid,title,content, dateadded
//2.Create Model-> <model name> 

const mongoose=require('mongoose');

const noteSchema =mongoose.Schema({
  userid:{
    type:String,
    required: true,
  },
  title:{
      type: String,
      required: true,
  },
  content:{
      type: String,
  }
},{
  timestamps: true,
});

module.exports= mongoose.model("Note",noteSchema);
