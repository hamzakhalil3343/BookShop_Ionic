const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//body parser code
const bodyParser = require('body-parser');
const app = express();
mongoose.connect('mongodb://localhost:27017/myfdb', {useNewUrlParser: true,useUnifiedTopology:true});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));




//creating model
const Student = mongoose.model('Student', {
    name: String,
    student_id: Number,
    email: String,
    password: String,
    date_added: Date
   });



//to create students 
app.get('/', (req, res) => { 
    res.send('hello world');
  });
  app.get('/students', async (req, res) => {

    const allStudents = await Student.find();
    console.log('allStudents', allStudents);
  
    res.send(allStudents);
  });

//sign up 
app.post('/signup', async (req, res) => {
    const body = req.body;
    console.log('req.body', body)
      try{
    const student = new Student(body);
    
    const result = await student.save();
    res.send({
      message: 'Student signup successful'
    });
    
      }
      catch(ex){
        console.log('ex',ex);
        res.send({message: 'Error'}).status(401);
      };
    });
      //login

      app.post('/login',  async (req, res) => {
        const body = req.body;
        console.log('req.body', body);
    
        const email = body.email;
    
        // lets check if email exists
    
        const result = await Student.findOne({"email":  email});
        if(!result) // this means result is null
        {
          res.status(401).send({
            Error: 'This user doesnot exists. Please signup first'
           });
        }
        else{
          // email did exist
          // so lets match password
    
          if(body.password === result.password){
    
            // great, allow this user access
    
            console.log('match');
            
    
            res.send({message: 'Successfully Logged in'});
          }
    
            else{
    
              console.log('password doesnot match');
    
              res.status(401).send({message: 'Wrong email or Password'});
            }
    
    
        }
    
      });

      //rest of codes






app.get('/', (req, res) => { 
  res.send('hello world');
});

app.listen(3000, () => {
  console.log('Express application running on localhost:3000');
});

