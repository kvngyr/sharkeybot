var Twit = require('./node_modules/twit/lib/twitter');

var Bot = module.exports = function(config) {
  this.twit = new Twit(config);
};

Bot.prototype.tweet = function (status, callback) {
  if(typeof status !== 'string') {
    return callback(new Error('tweet must be of type String'));
  } else if(status.length > 140) {
    return callback(new Error('tweet is too long: ' + status.length));
  }
  this.twit.post('statuses/update', { status: status }, callback('Outgoing', status));
};

Bot.prototype.follow = function (user, callback) {
  this.twit.post('friendships/create', { 'id': user.id }, callback('Following', user.screen_name));
};
