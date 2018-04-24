/*
*--------------------------------------------------
* Import required
*--------------------------------------------------
*
*/
const fs = require('fs');
const http = require('http');
const sqlite3 = require('sqlite3');


/*
*--------------------------------------------------
* Define main bot function
*--------------------------------------------------
*
*/
function ef_aivd(){
  /*
  *------------------------------------------------------------------------
  * Prepare self
  *------------------------------------------------------------------------
  *
  * Prepare the self variable
  * 
  */
  var self = this;
  self.config = require('./config');

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
  * Create the bogus searches
  *------------------------------------------------------------------------
  * 
  * First, we generate some rubbish, encode it and send it to the
  * search engine.
  * Then, we repeat this every minute or so
  * 
  */
  setInterval(function() {
    var rubbish = self.generateRubbish(Wordlist, 0,5);
    console.log(`[${self.formatTime()}] Sending rubbish query: ${rubbish}`);
    var encoded_rubbish = encodeURIComponent(rubbish);
    var options = {method: 'HEAD', host: 'google.com', port: 80, path: '/search?q='};
    var req = http.request(options,function(resp){
      // Check whether the request was a success
      switch(resp.statusCode){
        case 200: {
          console.log(`[${self.formatTime()}] Successfully send rubbish query!`);
          break;
        }
        case 301: {
          console.log(`[${self.formatTime()}] There was a small (ignorable) issue while sending the rubbish query`);
          break;
        }
      }
    });
    req.end();
  }, self.config.QUERY_DELAY_SECONDS * 1000);
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