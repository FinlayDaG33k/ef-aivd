/*
*------------------------------------------------------------------------
* Define the generateRubbish function
*------------------------------------------------------------------------
*
* Use this function to easily get some rubbish going!
* 
*/
module.exports = {
  generateRubbish: function(data,high,low){
    // Get a random query length between the low value and high value
    var query_length = Math.floor(Math.random() * (high - low) + low);

    // generate our rubbish query
    var rubbish = "";
    for(i=0;i<query_length;i++){
      rubbish += data[Math.floor(Math.random() * (data.length - 0) + 0)] + " ";
    }

    return rubbish;
  }
};
