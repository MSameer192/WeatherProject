const { response } = require('express');
const express = require('express')
const https = require('node:https');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')

});


app.post('/', function (req, res) {


    const query = req.body.cityName;
    const key = 'c43ace7dd4a46c1323c94cc483f92b18'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}&units=metric`


    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on('data', function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            console.log(temp);

            const description = weatherData.weather[0].description
            console.log(description);

            const icon = weatherData.weather[0].icon
            console.log(icon);

            const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`

            res.write(`<h1> The temperature of ${weatherData.name} is ${temp} degree celcius </h1>`)
            res.write(`<h3> The weather is currently ${description} </h3>`)

            res.write(`<img src=${imgURL} alt="" />`)
            res.send()

        })
    })


});



app.listen(3000, function () {
    console.log('Server is running');
})