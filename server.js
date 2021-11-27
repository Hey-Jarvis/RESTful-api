const express = require('express');
const mongoose = require('mongoose');

const app = express();


const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/movieDB');

const movieSchema = {
    movie:String,
    cast:String,
    director:String,
    type:String,    
}

const Movie = mongoose.model('Movie', movieSchema);

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});


//create or add data
app.post('/',(req,res)=>{

    const newMovie = new Movie({
        movie : req.body.mName,
        cast : req.body.cName,
        director : req.body.dName,
        type : req.body.gName,
       
    })
    newMovie.save();
    res.send('Thank you for adding');
});


//read data
app.get('/movies',(req,res)=>{
    Movie.find((err,findMovies)=>{
        if(!err){
           res.send(findMovies);
        }else{
            res.send(err);
        }
    })
});


//delete data
app.delete('/movies',(req,res)=>{
    Movie.deleteMany((err)=>{
        if(!err){
            res.send('its deleting')
        }else{
            res.send(err)
        }
    })
});



app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});