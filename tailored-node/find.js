const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

var User = require('./models/user');
var Shirts = require('./models/shirts');

//survey & discover

//need user vector
//need clothing vector value
//need to modify user vector based on clothing vector
//need to update user vector in database (arr.join('') converts from array back to string)

exports.vectorUpdate = function (user, shirtarray, next, pref, res) {
   
   User.findById(user)
   .then((user) => {
      var uservector = user.vector;
      return uservector
   })
   .then((uservector) => {
      if (pref == 'y') {
         for (count = 0; count < uservector.length; count++){
            uservector[count] = uservector[count] + shirtarray [count];
         };
         return uservector
      }
      else if (pref == 'n') {
         for (count = 0; count < uservector.length; count++){
            uservector[count] = uservector[count] - shirtarray [count];
         };
         return uservector
      };
   })
   .then((uservector) => {
      User.findByIdAndUpdate(user, {
              $set: {vector: uservector}
          }, { new: true })
          .then((user) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(user);
          }, (err) => next(err))
          .catch((err) => next(err));
   }, (err) => next(err))
   .catch((err) => next(err));
};

// home page

//need user vector
//need all clothing vectors
//need to save top 50 clothes => return

exports.displayClothes = function (user, shirts, next, res, price = 999999) {

   User.findById(user)
   .then((user) => {
      var uservector = user.vector;
      return uservector
   })
   .then((uservector) => {
      for (counter = 0; counter < shirts.length; counter++) {
         if (shirts[counter].price > price){
            shirts.splice(counter, 1);
         }
      };
      return [shirts, uservector]
   })
   .then((arr) => {
      var shirtvectors = [];
      var shirts = arr [0];
      var uservector = arr [1];
      for (count = 0; count < shirts.length; count ++) {
         shirtvectors.push(shirts[count].vector);
      }; //making the vectors of shirtlist into own array
      return [shirts, uservector, shirtvectors]
   })
   .then((arr) => {
      var shirtweight = [];
      var shirts = arr [0];
      var uservector = arr [1];
      var shirtvectors = arr [2];
      for (count = 0; count < shirtvectors.length; count++){
         var weight = 0;
         for (counter = 0; counter < uservector.length; counter++){
            weight = (uservector[counter]*shirtvectors[count][counter]) + weight;
         };
         shirtweight.push(weight);
      }; //finding dot product of all clothes in shirtlist
      return [shirts, shirtweight]
   })
   .then((arr) => {
      var orderedshirtweight = [];
      var shirts = arr [0];
      var shirtweight = arr [1];
      for (count = 0; count < shirtweight.length; count++) {
         orderedshirtweight.push(shirtweight[count]);
      };
      return [shirts, shirtweight, orderedshirtweight]
   })
   .then((arr) => {
      var shirts = arr [0];
      var shirtweight = arr [1];
      var orderedshirtweight = arr [2];
      orderedshirtweight.sort(function(a, b){return b-a});
      return [shirts, shirtweight, orderedshirtweight]
   })
   .then((arr) => {
      var shirts = arr [0];
      var shirtweight = arr [1];
      var orderedshirtweight = arr [2];      
      var stopcount;
      if (shirts.length >= 500) {
         stopcount = 500;
      }
      else {
         stopcount = shirts.length - (shirts.length%4);
      }
      return [shirts, shirtweight, orderedshirtweight, stopcount]
   })
   .then((arr) => {
      var returnclothes = [];
      var shirts = arr [0];
      var shirtweight = arr [1];
      var orderedshirtweight = arr [2];      
      var stopcount = arr [3];      
      for (count = 0; count < stopcount; count++) {
         num = shirtweight.indexOf(orderedshirtweight[count]);
         delete shirtweight[num];
         returnclothes.push(shirts[num]);
      };
      return returnclothes
   })
   .then((returnclothes) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(returnclothes);
   }, (err) => next(err))
   .catch((err) => next(err));
};

exports.emailClick = function (brand, name, user, email) {
   var transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: 'teamtailored@gmail.com',
       pass: 'launchx123'
     }
   });

   var mailOptions = {
     from: 'teamtailored@gmail.com',
     to: email,
     subject: '[Tailored] User Clicked Item',
     text: 'Tailored user '+user+' clicked on '+brand+' '+name+'.'
   };

   transporter.sendMail(mailOptions, function(error, info){
     if (error) {
       console.log(error);
     } else {
       console.log('Email sent: ' + info.response);
     }
   });
}
/*
$(document).ready(function(){

   //converts the vector of all the clothing survey data into array
   var surveyvectorlst = [];
   var holder;
   var count;
   var counter;
   for (counter=0; counter<41; counter++){
      holder = JSON.stringify(clothingsurvey[counter].vector);
      var attribute = holder.split('');
      attribute.shift();
      for (count=0; count<22; count++){
         attribute[count] = parseInt(attribute[count]);
      }
      surveyvectorlst.push(attribute);
   };

   //converts the vector of all the clothing data into array
   var datavectorlst = [];
   for (counter=0; counter<229; counter++){
      holder = JSON.stringify(clothingdata[counter].vector);
      var attribute = holder.split('');
      attribute.shift();
      for (count=0; count<22; count++){
         attribute[count] = parseInt(attribute[count]);
      }
      datavectorlst.push(attribute);
   };

   //calculates userpreference vector
   var userpref = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
   var clothing;
   var blacklist = [];

   for (counter=0; counter<41; counter++){
      clothing = surveyvectorlst[counter];
      holder = JSON.stringify(clothingsurvey[counter].name);
      var answer = prompt("On a scale from 1 (despise) to 5 (adore) do you like "+counter+holder+"?")
      if ((answer == '4')||(answer=='y')){
         for (count=0; count<22; count++){
            userpref[count] = userpref[count]+clothing[count];
         };
      } else if ((answer=='2')||(answer=='n')){
         blacklist.push(JSON.stringify(clothingsurvey[counter].imageurl));
         for (count=0; count<22; count++){
            userpref[count] = userpref[count]-clothing[count];
         };
      } else if (answer=='1'){
         blacklist.push(JSON.stringify(clothingsurvey[counter].imageurl));
         for (count=0; count<22; count++){
            userpref[count] = userpref[count]-(2*clothing[count]);
         };
      } else if (answer='5'){
         for (count=0; count<22; count++){
            userpref[count] = userpref[count]+(2*clothing[count]);
         };
      };
   };

   //finds the dot product between userpreference vector and each clothing vector 
   var clothingweight = [];
   var weight = 0;
   for (counter=0; counter<229; counter++){
      clothing = datavectorlst[counter];
      for (count=0; count<22; count++){
         weight = (userpref[count]*clothing[count]) + weight;
      };
      clothingweight.push(weight);
      weight = 0;
   };
   console.log(clothingweight);

   //finds the order of the clothes based on weight array

   var returnclothes = [];
   var clothingweightremove = [];
   for (counter=0; counter<(clothingweight.length); counter++){
      returnclothes.push(clothingweight[counter]);
      clothingweightremove.push(clothingweight[counter]); //another version of clothingweight that will be altered
   };
   returnclothes.sort(function(a, b){return b-a}); //ordered version of clothingweight
   var clothingwebsite = []
   for (counter=0; counter<(clothingweight.length); counter++){
      num = clothingweightremove.indexOf(returnclothes[counter]); //finding the index in both clothingdata and clothingweight of highest weight clothing item
      delete clothingweightremove[num]; // to prevent the same item from showing up twice
      returnclothes[counter] = JSON.stringify(clothingdata[num].name); //replacing the weight of with name of item 
      clothingwebsite.push(JSON.stringify(clothingdata[num].imageurl));
   }


   for (black=0; black<(blacklist.length); black++){
      num = clothingwebsite.indexOf(blacklist[black]);
      clothingwebsite.splice(num,1);
   };



   for (counter=0; counter<56; counter++){
      $("#img"+counter).attr('src', clothingwebsite[counter].slice(1,-1));
   }

});
*/
