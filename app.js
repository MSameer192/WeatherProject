const { response } = require('express');
const express = require('express')
const https = require('node:https');


const app = express();

app.get('/', function(req, res){

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=karachi&appid=c43ace7dd4a46c1323c94cc483f92b18&units=metric' 


    https.get(url, function(response){
        console.log(response.statusCode);

        response.on('data', function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            console.log(temp);

            const description = weatherData.weather[0].description
            console.log(description);

            res.send(`
            
            <p> The weather is currently ${description} </p>
            <h1> The temperature of ${weatherData.name} is ${temp} celcius </h1>  
            `) 

            
        })
    })

    

})

    
app.listen(3000, function(){
    console.log('Server is running');
})