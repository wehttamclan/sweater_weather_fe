// This file is in the entry point in your webpack config.
import './styles.scss'

var request = new XMLHttpRequest();
var highTempCurrent = document.getElementById('high-temp');
var lowTempCurrent = document.getElementById('low-temp');
var tempCurrent = document.getElementById('current-temp');
var cityName = document.getElementById('city-name');
var dateTime = document.getElementById('date-time');
var currentSummary = document.getElementById('current-summary');
var feelsLikeDiv = document.getElementById('feels-like');
var humidityDiv = document.getElementById('humidity');
var visibilityDiv = document.getElementById('visibility');
var uvIndexDiv = document.getElementById('uv-index');
var todaySummaryText = document.getElementById('today-summary');
var upcomingSummaryText = document.getElementById('upcoming-summary');

request.open('GET', 'https://obscure-woodland-70588.herokuapp.com/api/v1/forecast?city=austin', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 300) {
    displayCurrentTemps(data);
    displayCityName(data);
    displayDateTime(data);
    displayCurrentSummary(data);
    displayCurrentDetails(data);
    displayTodaySummary(data);
    graphHourlyForecast(data);
  } else {
    console.log('error');
  };
};

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
};

function displayDateTime(data) {
 var time = data.currently.time;
 dateTime.innerText = `${time}`;
};

function displayCurrentSummary(data) {
  var summary = data.currently.summary;
  currentSummary.innerText = summary;
};

function displayCurrentDetails(data) {
  var feelsLike = Math.floor(data.currently.apparent_temperature);
  var humidity = Math.floor(data.currently.humidity * 100);
  var visibility = data.currently.visibility;
  var uvIndex = data.currently.uv_index;
  feelsLikeDiv.innerText = `${feelsLike}º F`;
  humidityDiv.innerText = `${humidity}%`;
  visibilityDiv.innerText = `${visibility} miles`;
  uvIndexDiv.innerText = `${uvIndex}`;
};

function displayTodaySummary(data) {
  var todaySummary = data.daily.data[0].summary;
  var upcomingSummary = data.hourly.summary;
  todaySummaryText.innerText += " " + todaySummary;
  upcomingSummaryText.innerText += " " + upcomingSummary;
};

function getBackground(image) {

};

request.send();

function graphHourlyForecast(rawData) {
  var ctx = document.getElementById('hourly-chart').getContext('2d');
  Chart.defaults.global.defaultFontColor = 'white';
  Chart.defaults.global.defaultColor = 'white';
  var hourlyData = rawData.hourly.data;
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: hourlyData.map(getTime),
      datasets: [{
        label: "Hourly Forecast",
        borderColor: 'rgb(255, 99, 132)',
        data: hourlyData.map(getTemperature),
      }]
    },

    // Configuration options go here
    options: {
      scales: {
        yAxes: [{
          ticks: {
            suggestedMin: getMinRange(hourlyData),
            suggestedMax: getMaxRange(hourlyData)
          }
        }]
      }
    }
  });
};

function getTime(item, index) {
  if(index % 2 === 0) {
    return item.time;
  } else return "";
};

function getTemperature(item) {
  return item.temperature;
};

function getMinRange(array) {
  return Math.min.apply(Math, array.map(o => o.temperature)) - 5;
};

function getMaxRange(array) {
  return Math.max.apply(Math, array.map(o => o.temperature)) + 5;
};