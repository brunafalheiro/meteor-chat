import { Meteor } from 'meteor/meteor';
import { Messages } from '../imports/api/Messages.js';

const SEED_USERNAME = 'meteor';
const SEED_PASSWORD = 'password';
const months = ['Jan','Feb','Mar','Apr','May','Jun',
'Jul','Aug','Sep','Oct','Nov','Dec'];

Meteor.startup(() => {  
  if(!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  Messages.remove({});
});

Meteor.publish("messages", function () {
  return Messages.find({});
});

Meteor.methods({
  sendMessage: function (text, username) {
    var date = new Date();
    var month = months[date.getMonth()];
    Messages.insert({
      text: text,
      createdAt: `${month} ${date.getUTCDate()}, at ${date.getHours()}:${date.getUTCMinutes()}`,
      username: username
    });
  },

  deleteMessage: function(id){
    Messages.remove(id);
  }
});
