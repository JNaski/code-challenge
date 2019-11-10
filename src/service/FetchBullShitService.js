/*
* We would need a backend for the things we do in this file,
* but for simplicity we used cors-anywhere to go around the
* cors errors
*/

const secretUrl = 'https://koodihaaste-api.solidabis.com/secret'
const url = 'https://cors-anywhere.herokuapp.com/https://koodihaaste-api.solidabis.com/bullshit';
var token = '';

const getData = async () => {
  getSecret().then(result => token = result);
  // short sleep here so that we get the token response before we continue.
  await sleep(500);
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
    },
  })
  .then(res => res.json())
  .then((result) => {
    return result;
  },
  (error) =>{
    return error;
  })
}

const getSecret = () => {
  return fetch(secretUrl, {
    method: 'GET'
  })
  .then(res => res.json())
    .then((result) => {
      return result.jwtToken;
    },
    (error) =>{
      return error;
    })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const FetchBullShit = () => {
   return getData();
 }