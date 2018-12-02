// This file is in the entry point in your webpack config.
import './styles.scss'

var request = new XMLHttpRequest();
var highTempCurrent = document.getElementById('high-temp');
var lowTempCurrent = document.getElementById('low-temp');

request.open('GET', 'https://obscure-woodland-70588.herokuapp.com/api/v1/forecast?city=austin', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    displayCurrentTemps(data.daily.data[0].temperature_high, data.daily.data[0].temperature_low);
  } else {
    console.log('error');
  }
}

function displayCurrentTemps(highTemp, lowTemp) {
  highTemp = Math.floor(highTemp);
  lowTemp = Math.floor(lowTemp);
  highTempCurrent.innerText = `${highTemp}º F`;
  lowTempCurrent.innerText = `${lowTemp}º F`;
};

function getBackground(image) {

}

request.send();