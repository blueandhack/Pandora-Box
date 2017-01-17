'use strict';
var Alexa = require('alexa-sdk');
var https = require('https');
var rp = require('request-promise');
var handlers = {
  "All": function(){
    var speechOutput = "";
    if(this.event.request.intent.slots.EVE.value && this.event.request.intent.slots.EVE.value.toLowerCase() == "stop"){
      var that = this;
      var options = {
        method: 'POST',
        uri: 'https://alexa.blueandhack.com/api/all/change',
        body: {
            change: 'off'
        },
        json: true
      };
      rp(options)
      .then(function (parsedBody) {
          speechOutput = "Everthing turn off.";
          that.emit(":tell",speechOutput);
          return;
      });
    }
    if(this.event.request.intent.slots.EVE.value && this.event.request.intent.slots.EVE.value.toLowerCase() == "start"){
      var that = this;
      var options = {
        method: 'POST',
        uri: 'https://alexa.blueandhack.com/api/all/change',
        body: {
            change: 'on'
        },
        json: true
      };
      rp(options)
      .then(function (parsedBody) {
          speechOutput = "Everthing turn on.";
          that.emit(":tell",speechOutput);
          return;
      });
    }
  },
  "Light": function(){
    var speechOutput = "";
    if(this.event.request.intent.slots.LED.value && this.event.request.intent.slots.LED.value.toLowerCase() == "off"){
      var that = this;
      var options = {
        method: 'POST',
        uri: 'https://alexa.blueandhack.com/api/light/change',
        body: {
            change: 'off'
        },
        json: true
      };
      rp(options)
      .then(function (parsedBody) {
          speechOutput = "Light turn off.";
          that.emit(":tell",speechOutput);
          return;
      });
    }
    if(this.event.request.intent.slots.LED.value && this.event.request.intent.slots.LED.value.toLowerCase() == "on"){
      var that = this;
      var options = {
        method: 'POST',
        uri: 'https://alexa.blueandhack.com/api/light/change',
        body: {
            change: 'on'
        },
        json: true
      };
      rp(options)
      .then(function (parsedBody) {
          speechOutput = "Light turn on.";
          that.emit(":tell",speechOutput);
          return;
      });
    }
  },
  "FFF": function(){
    var speechOutput = "";
    if(this.event.request.intent.slots.FAN.value && this.event.request.intent.slots.FAN.value.toLowerCase() == "stop"){
      var that = this;
      var options = {
        method: 'POST',
        uri: 'https://alexa.blueandhack.com/api/fan/change',
        body: {
            change: 'off'
        },
        json: true
      };
      rp(options)
      .then(function (parsedBody) {
          speechOutput = "Fan turn off.";
          that.emit(":tell",speechOutput);
          return;
      });
    }
    if(this.event.request.intent.slots.FAN.value && this.event.request.intent.slots.FAN.value.toLowerCase() == "run"){
      var that = this;
      var options = {
        method: 'POST',
        uri: 'https://alexa.blueandhack.com/api/fan/change',
        body: {
            change: 'on'
        },
        json: true
      };
      rp(options)
      .then(function (parsedBody) {
          speechOutput = "Fan turn on.";
          that.emit(":tell",speechOutput);
          return;
      });
    }
  },
  "Door": function(){
    var speechOutput = "";
    if(this.event.request.intent.slots.FRONT.value && this.event.request.intent.slots.FRONT.value.toLowerCase() == "close"){
      var that = this;
      var options = {
        method: 'POST',
        uri: 'https://alexa.blueandhack.com/api/door/change',
        body: {
            change: 'close'
        },
        json: true
      };
      rp(options)
      .then(function (parsedBody) {
          speechOutput = "Door is close.";
          that.emit(":tell",speechOutput);
          return;
      });
    }
    if(this.event.request.intent.slots.FRONT.value && this.event.request.intent.slots.FRONT.value.toLowerCase() == "open"){
      var that = this;
      var options = {
        method: 'POST',
        uri: 'https://alexa.blueandhack.com/api/door/change',
        body: {
            change: 'open'
        },
        json: true
      };
      rp(options)
      .then(function (parsedBody) {
          speechOutput = "Door is open.";
          that.emit(":tell",speechOutput);
          return;
      });
    }
  },
  "Todo": function(){
    var that = this;
    var speechOutput = "Got Error!";
    if(this.event.request.intent.slots.ACTION.value && this.event.request.intent.slots.ACTION.value.toLowerCase() == "tell"){
      rp("https://alexa.blueandhack.com/api/task/get")
      .then(function (htmlString) {
        var obj = JSON.parse(htmlString);
        if(obj.length > 0){
          var result = "There has a todo list";
          for(var i=0; i<obj.length; i++){
            result += " , number " + (i+1) + " is " + obj[i].content + "";
          }
          result += ".";
          that.emit(":tell",result);
          return;
        }else{
          that.emit(":tell","Sorry, the list is empty.");
          return;
        }
      })
      .catch(function (err) {
        that.emit(":tell",speechOutput);
        return;
      });
    }
    if(this.event.request.intent.slots.ACTION.value && this.event.request.intent.slots.ACTION.value.toLowerCase() == "remove"){
      var that = this;
      var speechOutput = "Got Error!";
      var no = parseInt(this.event.request.intent.slots.NUMBER.value);
      var options = {
        method: 'POST',
        uri: 'https://alexa.blueandhack.com/api/task/remove',
        body: {
            number: no
        },
        json: true
      };
      rp(options)
      .then(function (parsedBody) {
        // var obj = JSON.parse(parsedBody);
        if(parsedBody.status == "ok"){
          that.emit(":tell","Delete successful!");
          return;
        }else{
          that.emit(":tell","Sorry, I can't delete it.");
          return;
        }
      })
      .catch(function (err) {
        that.emit(":tell",speechOutput);
        return;
      });
    }

    if(this.event.request.intent.slots.ACTION.value && this.event.request.intent.slots.ACTION.value.toLowerCase() == "add"){
      if(this.event.request.intent.slots.FOOD.value){
        var that = this;
        var speechOutput = "Got Error!";
        var content = this.event.request.intent.slots.FOOD.value;
        var options = {
          method: 'POST',
          uri: 'https://alexa.blueandhack.com/api/task/add',
          body: {
              content: "I want to eat " + content + "."
          },
          json: true
        };
        rp(options)
        .then(function (parsedBody) {
          // var obj = JSON.parse(parsedBody);
          if(parsedBody.status == "ok"){
            that.emit(":tell","Add successful!");
            return;
          }else{
            that.emit(":tell","Sorry, I can't add it.");
            return;
          }
        })
        .catch(function (err) {
          that.emit(":tell",speechOutput);
          return;
        });
      }
      if(this.event.request.intent.slots.BOOK.value){
        var that = this;
        var speechOutput = "Got Error!";
        var content = this.event.request.intent.slots.BOOK.value;
        var options = {
          method: 'POST',
          uri: 'https://alexa.blueandhack.com/api/task/add',
          body: {
              content: "I want to read " + content + "."
          },
          json: true
        };
        rp(options)
        .then(function (parsedBody) {
          // var obj = JSON.parse(parsedBody);
          if(parsedBody.status == "ok"){
            that.emit(":tell","Add successful!");
            return;
          }else{
            that.emit(":tell","Sorry, I can't add it.");
            return;
          }
        })
        .catch(function (err) {
          that.emit(":tell",speechOutput);
          return;
        });
      }
    }


  },
  "Unhandled": function() {
        this.emit(':ask', 'Sorry, I didn\'t get that. Try saying others.', 'Try saying something.');
  }


};

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = "amzn1.ask.skill.513e289c-9174-4791-af08-d962d398fbbb";
    alexa.registerHandlers(handlers);
    alexa.execute();
};
