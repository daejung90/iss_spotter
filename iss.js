const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    console.log("error:", error);
    console.log('StatusCode:', response && response.statusCode);

    const parsedIP = JSON.parse(body).ip; //why parse(body) and then .ip? and not parse(body.ip)??
    callback(null, parsedIP)
    
  });
};
  
module.exports = { fetchMyIP };