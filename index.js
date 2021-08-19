const axios = require('axios');

// axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
axios.get('https://nsi.rosminzdrav.ru:443/port/rest/data?userKey=90af2cf9-b51d-4857-b494-c2cd523b25a3&identifier=1.2.643.5.1.13.13.11.1461&page=1&size=200')
  .then((response) => {
    console.log('list.length', response.data.list.length);
    // console.log(response.data);
    // console.log(response.data.url);
    // console.log(response.data.explanation);
  })
  .catch((error) => {
    console.log(error);
  });
