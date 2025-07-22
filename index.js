const express = require('express');
const app = express();
const config = require('./config/dbconfig');
const shorturl = require('./models/shorturl');
require('dotenv').config();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.get('/',async (req,res)=>{
  const shorturls = await shorturl.find();
  res.render('index',{shortUrls:shorturls});
})
app.listen(3000,()=>{
  console.log('app is listening at port 3000');
});
app.post('/shrink',async (req,res)=>{
 await shorturl.create({fullurl:req.body.fullurl});
 res.redirect('/');
})
app.get('/:shortUrl',async (req,res)=>{
  const shortUrl = await shorturl.findOne({short:req.params.shortUrl});
  if(!shortUrl){
    res.status(404).send("The url dosent exist");
    return;
  }
  shortUrl.clicks++;
  shortUrl.save();
  console.log(shortUrl.fullurl);
  res.redirect(shortUrl.fullurl);
})