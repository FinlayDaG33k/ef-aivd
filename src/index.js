/*
*--------------------------------------------------
* Import required
*--------------------------------------------------
*
*/

/*
*--------------------------------------------------
* Define main bot function
*--------------------------------------------------
*
*/
function ef_aivd(){

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
});