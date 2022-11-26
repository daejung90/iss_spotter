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

    // console.log("error:", error);
    // console.log('StatusCode:', response && response.statusCode);

    const obj = JSON.parse(body);
    callback(null, obj.ip);
    
  });
};

const fetchCoordsByIp = function(ip, callback) {
  const url = 'http://ipwho.is/' + ip;

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

    // console.log("error:", error);
    // console.log('StatusCode:', response && response.statusCode);

    
    const latitude = parsedObj.latitude;
    const longitude = parsedObj.longitude;
    const coordinates = {latitude, longitude};
    
    // console.log(coordinates)
    
    callback(null, coordinates);
    
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const latitude = coords.latitude;
  const longitude = coords.longitude;
  const url = ('https://iss-flyover.herokuapp.com/json/?lat=' + latitude + '&lon=' + longitude);
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS passing time. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // console.log("error:", error);
    // console.log('StatusCode:', response && response.statusCode);

    const timePassing = JSON.parse(body);
    callback(null, timePassing.response);

  });
};

module.exports = { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes };