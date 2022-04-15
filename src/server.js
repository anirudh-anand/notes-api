const express = require('express');
const app= express();

const mongoose= require('mongoose');
const Note= require('./models/Note');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const mongodbPath = "mongodb+srv://AnirudhAwake:anirudh01@cluster0.ycul2.mongodb.net/notesdb"

mongoose.connect(mongodbPath).then(
    function(){
        app.get("/", function(req,res){
          const response= {message: "API works"};
          res.json(response);
      
      });
      app.post("/notes/list",async function(req,res){
          var notes=await Note.find({
              userid:req.body.userid
          });
          res.json(notes);
      
      });
      app.post("/notes/add",async function(req,res){
          await Note.deleteOne({
              id:req.body.id
          });
         
      var newNote = new Note({
           id: req.body.id,
           userid: req.body.userid,
           title: req.body.title,
           content: req.body.content
       });
       await newNote.save();

       const response = {
           message: "new note createdid: " + `id: ${req.body.id}` };
           res.json(response);

       });

       app.post("/notes/delete", async function(req, res){
           await Note.deleteOne({id: req.body.id});
          
           const response = {
            message: "new note deleted: " + `id: ${req.body.id}` };
            res.json(response);
       })
      
    
    });
  







const PORT= process.env.PORT || 5000;
app.listen(PORT, function() {
    console.log("server started at PORT: " + PORT);
});

