/*
*--------------------------------------------------
* Import required
*--------------------------------------------------
*
*/
const fs = require('fs');

/*
*--------------------------------------------------
* Define main bot function
*--------------------------------------------------
*
*/
function ef_aivd(){

  // define self with 'this'
  var self = this;

  /*
  *------------------------------------------------------------------------
  * Load some functions from the files
  *------------------------------------------------------------------------
  *
  * Load functions here that shouldn't change too often (to keep this file
  * nice and compact)
  * 
  */
  self.formatTime = require('./functions/formatTime').formatTime;
  self.generateRubbish = require('./functions/generateRubbish').generateRubbish;

  
  /*
  *------------------------------------------------------------------------
  * Load our wordlist
  *------------------------------------------------------------------------
  *
  * Load all lines of our wordlist and put them in an object.
  * Not the most efficient way, but it'll do for now
  * 
  */
  console.log(`[${self.formatTime()}] Loading wordlist, this may take a while to complete...`);
  var Wordlist = fs.readFileSync('wordlists/wordlist.txt').toString().split('\r\n');
  console.log(`[${self.formatTime()}] Loading wordlist complete!`);

  /*
  *------------------------------------------------------------------------
  * Generate the rubbish
  *------------------------------------------------------------------------
  * 
  */
  console.log(self.generateRubbish(Wordlist, 1,5));
}

module.exports.ef_aivd = new ef_aivd();

/*
*--------------------------------------------------
* Catch uncaught exceptions
*--------------------------------------------------
*
* Any uncaught exception will be handled here
*
* You can change whether to exit the process
* in the confis.js file.
* If set to true, it will exit, otherwise,
* It will restart the process
*/
process.on('uncaughtException', function(err){
  var self = this;
  // get the config
  self.config = require('./config');

  // Log the error to the console
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
  console.error(err.stack);

  if(self.config.EXIT_ON_ERROR == "true"){
    process.exit(1);
  }
});