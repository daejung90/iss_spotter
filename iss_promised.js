const request = require('request-promise-native');

const fetchMyIP = function () {
    return request ('https://api.ipify.org?format=json');
}

const fetchCoordsByIp = function (body) {
    const ip = JSON.parse(body).ip
  return request ('http://ipwho.is/' + ip)
}

const fetchISSFlyOverTimes = function (body) {
  const coords = JSON.parse(body)
  const latitude = coords.latitude;
  const longitude = coords.longitude;
    
    return request ('https://iss-flyover.herokuapp.com/json/?lat=' + latitude + '&lon=' + longitude)
}

const nextISSTimesForMyLocation = function () {
    return fetchMyIP()
      .then(fetchCoordsByIp)
      .then(fetchISSFlyOverTimes)
      .then((data) => {
        const { response }  = JSON.parse(data)
        return response
      })
}


module.exports = { nextISSTimesForMyLocation };