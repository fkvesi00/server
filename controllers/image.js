const Clarifai= require('clarifai'); 
const { json } = require('express');

const app=new Clarifai.App({
    apiKey:'26c374060442478e841a18c0302f035a'
  });


const handleApiCall=(req,res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>res.status(400).json('unable to work with API')).console.log(err);
}
  
const handleImage=(req,res,db)=>{
    const {id} = req.body
    db('users').where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0].entries);
    })
    .catch(err=> res.status(400).json('unable to get entries'));
}

module.exports={
    handleImage:handleImage,
    handleApiCall
}