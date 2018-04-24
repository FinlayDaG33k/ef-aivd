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
    for(i=0;i<=query_length;i++){
      // Get a random entry from the wordlist
      rubbish += data[Math.floor(Math.random() * (data.length - 0) + 0)];
      // check whether the current word is not the last
      if(i != query_length){
        // Check whether the query_length > 0, if so, add a space to the end
        if(query_length > 0){
          rubbish += " ";
        }
      }
    }

    return rubbish;
  }
};
