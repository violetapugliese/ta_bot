require('dotenv').config()
const {TwitterClient} = require('twitter-api-client')
const axios = require('axios')
const APP_ID = process.env.Weather_App_ID
const APP_KEY = process.env.Weather_App_Key

const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

var date = new Date()
var today = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
var day = date.getDay()

var fs = require('fs');
var obj;
fs.readFile('proverb.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    var aleatory = Math.floor(Math.random() * (0, 87));
    let tweet = 'El consejo de la tía para esta semana: ' + obj.texto[aleatory] +' #buenlunes ' + (today)

    if (day === 1) {
        twitterClient.tweets.statusesUpdate({
            status: tweet
        }).then (response => {
            console.log("Tweeted!", response)
        }).catch(err => {
            console.error(err)
        })
    }
});

axios.get(`http://api.weatherunlocked.com/api/current/-34.36,-58.26?app_id=${APP_ID}&app_key=${APP_KEY}`)
    .then(response => {
    const data = response.data ? response.data : {}

    fs.readFile('weatherText.json', 'utf8', function (err, dataW) {
        if (err) throw err;
        objW = JSON.parse(dataW);
        var aleatory = Math.floor(Math.random() * (0, 9));
        let tweet
        if (data.temp_c <= 5){
            tweet = 'La temperatura ahora en Buenos Aires es de ' + data.temp_c + 'º. ' + objW.weatherText.verycold[aleatory]+' ' + today
        } else if (data.temp_c <= 15) {
            tweet = 'La temperatura ahora en Buenos Aires es de ' + data.temp_c + 'º. ' + 'Te dejo una receta calentita ' + objW.weatherText.cold[aleatory] + ' ' + today
        } else if (data.temp_c <= 22) {
            tweet = 'La temperatura ahora en Buenos Aires es de ' + data.temp_c + 'º. ' + objW.weatherText.tempered[aleatory] +' ' + today
        } else if (data.temp_c <= 30) {
            tweet = 'La temperatura ahora en Buenos Aires es de ' + data.temp_c + 'º. ' + 'Te dejo una receta de algo fresco ' + objW.weatherText.warm[aleatory] +' ' + today
        } else {
            tweet = 'La temperatura ahora en Buenos Aires es de ' + data.temp_c + 'º. ' + objW.weatherText.veryhot[aleatory] +' ' + today
        }
    

        twitterClient.tweets.statusesUpdate({
            status: tweet
        }).then (response => {
            console.log("Tweeted!", response)
        }).catch(err => {
            console.error(err)
        })
    });

}).catch (err => {
    console.error(err)
})