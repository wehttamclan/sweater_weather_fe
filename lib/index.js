// This file is in the entry point in your webpack config.
import './styles.scss'

var request = new XMLHttpRequest();
var highTempCurrent = document.getElementById('high-temp');
var lowTempCurrent = document.getElementById('low-temp');
var tempCurrent = document.getElementById('current-temp');
var cityName = document.getElementById('city-name')

request.open('GET', 'https://obscure-woodland-70588.herokuapp.com/api/v1/forecast?city=austin', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    console.log(data.currently.temperature);
    displayCurrentTemps(data);
    displayCityName(data)
  } else {
    console.log('error');
  }
}

function displayCurrentTemps(currentData) {
  var currentTemp = Math.floor(currentData.currently.temperature);
  var highTemp = Math.floor(currentData.daily.data[0].temperature_high);
  var lowTemp = Math.floor(currentData.daily.data[0].temperature_low);
  tempCurrent.innerText = `${currentTemp}º F`;
  highTempCurrent.innerText = `${highTemp}º F`;
  lowTempCurrent.innerText = `${lowTemp}º F`;
};

function displayCityName(data) {
  var city = data.city;
  var state = data.state;
  cityName.innerText = `${city}, ${state}`;
}

function getBackground(image) {

}

request.send();