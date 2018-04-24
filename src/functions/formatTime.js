/*
*------------------------------------------------------------------------
* Define the formatTime function
*------------------------------------------------------------------------
*
* Use this function to get a somewhat standardized date-time string.
* 
*/
const Moment = require('moment'); // Moment.JS
module.exports = {
  formatTime: function(){
    return Moment().format('Y-MM-DD HH:mm:ss');
  }
};
