require('dotenv').config()
const {TwitterClient} = require('twitter-api-client')

const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

var date = new Date()
var day = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

var fs = require('fs');
var obj;
fs.readFile('proverb.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    var aleatory = Math.floor(Math.random() * (0, 87));
    let tweet = 'Mi consejo para esta semana: ' + obj.texto[aleatory] + day + '#buenlunes'


    twitterClient.tweets.statusesUpdate({
        status: tweet
    }).then (response => {
        console.log("Tweeted!", response)
    }).catch(err => {
        console.error(err)
    })
});