const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const { USERKEY, DICTIONARY } = process.env;

async function getOnePage(userkey, dictionary, page = 1, size = 200) {
  const url = `https://nsi.rosminzdrav.ru:443/port/rest/data?userKey=${userkey}&identifier=${dictionary}&page=${page}&size=${size}`;
  console.log('url', url);
  const result = [];
  try {
    const response = await axios.get(url);
    console.log('list.length', response.data.list.length);
    result.push(...response.data.list);
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
  }
  return result;
}

async function getAllPages(userkey, dictionary) {
  const result = [];
  let list = [];
  let page = 0;
  const size = 200;
  /* eslint-disable no-await-in-loop */
  do {
    try {
      list = await getOnePage(userkey, dictionary, page, size);
      result.push(...list);
    } catch (error) {
      console.log(error);
      list = [];
    }
    page += 1;
  } while (list.length === size);
  /* eslint-enable no-await-in-loop */
  return result;
}

(async () => {
  const result = await getAllPages(USERKEY, DICTIONARY);
  console.log('result.length', result.length);
  console.log('result[0]', result[0]);
  console.log('result[result.length-1]', result[result.length - 1]);
})();
