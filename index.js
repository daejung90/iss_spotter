// const { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIp('38.34.61.232', (error, data) => {
//   if (error) {
//     console.log('Error connecting!', error)
//     return;
//   }
//   console.log(data)
// })

//fazer com que o resultado fetchcoordsbyip seja usado no fetch flyissovertime
// let coordinates = { latitude: 43.653226, longitude: -79.3831843 }
// fetchISSFlyOverTimes(coordinates, (error, time) => {
//   if(error) {
//     console.log('Error fetching Fly over time!')
//     return;
//   }
//   console.log(time)
// })

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});