const { fetchMyIP, fetchCoordsByIp } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

// fetchCoordsByIp('38.34.61.232', (error, data) => {
//   if (error) {
//     console.log('Error connecting!', error)
//     return;
//   }
//   console.log(data)
// })