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
    // console.log(body)
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

    const obj = JSON.parse(body);
    callback(null, obj.ip);
    
  });
};

const fetchCoordsByIp = function(ip, callback) {
  const url = 'http://ipwho.is/38.34.61.232';

  request(url, (error, response, body) => {
    // console.log(body)
    if (error) {
      callback(error, null);
      return;
    }
    const parsedObj = JSON.parse(body);

    if (!parsedObj.success) {
      const msg = 'Success status was ' + parsedObj.success + '. ' + ' Server message says: ' + parsedObj.message + ' when fetching for IP ' + parsedObj.ip;
      callback(Error(msg), null);
      return;
    }

    console.log("error:", error);
    console.log('StatusCode:', response && response.statusCode);

    
    const latitude = parsedObj.latitude;
    const longitude = parsedObj.longitude;
    const coordinates = {latitude, longitude};
    
    // console.log(coordinates)
    
    callback(null, coordinates);
    
  });
};

module.exports = { fetchMyIP, fetchCoordsByIp};