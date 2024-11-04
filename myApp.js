var express = require('express');
var app = express();
var bodyParser=require('body-parser');
// --> 7)  Mount the Logger middleware here
  app.use((req,res,next)=>{
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
  });
        
app.use(bodyParser.urlencoded({extended: false}));

console.log('Hello World');

//app.get("/",(req,res)=>res.send("Hello Express"));
app.use('/public', express.static(__dirname + '/public'));

app.get("/",(req,res)=>res.sendFile(`${__dirname}/views/index.html`));

 app.get("/json",(req,res)=>{
   let resultMessage="Hello json";
   if (process.env.MESSAGE_STYLE==="uppercase"){
     resultMessage=resultMessage.toUpperCase();
   }
  
   res.json({"message": resultMessage});
                            
 });

  app.get('/now',(req,res,next)=>{
    req.time=new Date().toString();
    next();
  },(req,res)=>{
     res.json({time:req.time});
  });

app.get('/:word/echo',(req,res)=>{
  res.json({echo: req.params.word});
});

app.route('/name').get((req,res)=>{
  res.json({name: `${req.query.first} ${req.query.last}`});
})
.post((req,res)=>{
  res.json({name: `${req.body.first} ${req.body.last}`});
});


 module.exports = app;



































 module.exports = app;
