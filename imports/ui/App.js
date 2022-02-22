import './App.html'
import { Messages } from '../api/Messages'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

Meteor.subscribe("messages");

Accounts.ui.config({
     passwordSignupFields: "USERNAME_ONLY"
});

Template.body.helpers({
    recentMessages: function(){
        return Messages.find({});
    }
});

Template.body.events({
    "submit .new-message": function(event){
        message = event.target.text.value;
        if(message !== ""){
            Meteor.call("sendMessage", event.target.text.value, Meteor.user().username);
        }
        event.target.text.value = "";
        event.preventDefault();
    }
});

Template.message.events({
    "click .delete-message": function(event){
        Meteor.call("deleteMessage", this._id);
    }
});