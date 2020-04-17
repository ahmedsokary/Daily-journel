//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');//include lowercase fun as to turn any space to - like specefic format

let posts=[];//put the input of the post from compose.ejs

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//render gets the page and make changes but get load the page itself
app.get('/',function(req,res){//the / indicates the root that by default go to home.ejs

  res.render('home',{text1:homeStartingContent,compose_array:posts});
})

app.get('/contact',function(req,res){//here must specify the root thet is /contact
  res.render('contact',{theContacts:contactContent});
})

app.get('/about',function(req,res){//here must specify the root thet is /contact
  res.render('about',{theAbout:aboutContent});
})

app.get('/compose',function(req,res){
  res.render('compose')
})

app.get('/post/:topic',function(req,res){//here i am routing my url as if i go to http://localhost:3000/posts/ahmed the output is ahmed

let urlTag=_.lowerCase(req.params.topic);//lower case changes all the spaces to - as if the user enter a ahmed amr the spaces will not make an error

posts.forEach(function(element)
{
  let title=element.composeTitle;
    let body=element.composeBody;
   if(urlTag==title)
  {

    res.render('post',{postedBody:body,postedTitle:title})
  }

   })
})




app.post('/compose',function(req,res){
  // let composeTitle=req.body.postTitle;
  // let composeBody=req.body.postBody;
//instead of this make object looks better
const post={//try using pbjects when getting more than 1 input
  composeTitle:req.body.postTitle,
  composeBody:req.body.postBody
};
posts.push(post);

res.redirect('/');


})





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
