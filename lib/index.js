// This file is in the entry point in your webpack config.
import './styles.scss'

var request = new XMLHttpRequest();

request.open('GET', 'https://obscure-woodland-70588.herokuapp.com/api/v1/forecast?city=austin', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    console.log(data);
  } else {
    console.log('error');
  }
}

request.send();