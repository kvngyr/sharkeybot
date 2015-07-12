var Bot = require('./bot'),
    config = require('./config'),
    sharkey = new Bot(config),
    thisTwitterUserName = '';


console.log(thisTwitterUserName + ' started @ ' + time());

sharkeyBot();

function sharkeyBot() {
    var stream = sharkey.twit.stream('statuses/filter', { track: 'Dublin' }),
        introduction = [
            'Hey',
            'Hi',
            'Kia ora',
            'Yo'
        ],
        questions = [
            'it is currently 4 degrees in Dublin'
        ];

    stream.on('tweet', function(tweet) {
        if (tweet.user.screen_name === thisTwitterUserName) {
            // don't tweet to yourself
            return;
        }

        // we're not responding to one of our own tweets, write some logs
        logger('Incoming', '@' + tweet.user.screen_name + ' ' + tweet.text);

        // generate a tweet to send
        var outgoingTweet =
            introduction[Math.floor(Math.random() * introduction.length)] +
            ' ' +
            '@' + tweet.user.screen_name +
            ' ' +
            questions[Math.floor(Math.random() * questions.length)];

        // send the tweet
        sharkey.tweet(outgoingTweet, logger);
        // follow the user who we just sent a tweet to
        sharkey.follow(tweet.user, logger);
    });
}

function logger(action, message){
    console.log(time() + ' ' + action + ' - ' + message);
    return true;
}

function time() {
    var now     = new Date(),
        year    = now.getFullYear(),
        month   = now.getMonth() + 1,
        day     = now.getDate(),
        hour    = now.getHours(),
        minute  = now.getMinutes(),
        second  = now.getSeconds();

    if(month.toString().length == 1) {
        month = '0' + month;
    }
    if(day.toString().length == 1) {
        day = '0' + day;
    }
    if(hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if(minute.toString().length == 1) {
        minute = '0' + minute;
    }
    if(second.toString().length == 1) {
        second = '0' + second;
    }
    return hour + ':' + minute + ':' + second;
    // return year+'/'+month+'/'+day+' @ '+hour+':'+minute+':'+second;
}

function handleError(err) {
  console.error('response status:', err.statusCode);
  console.error('data:', err.data);
}

