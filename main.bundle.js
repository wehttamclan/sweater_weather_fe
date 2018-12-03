/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var request = new XMLHttpRequest(); // This file is in the entry point in your webpack config.

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
	  tempCurrent.innerText = currentTemp + '\xBA F';
	  highTempCurrent.innerText = highTemp + '\xBA F';
	  lowTempCurrent.innerText = lowTemp + '\xBA F';
	};

	function displayCityName(data) {
	  var city = data.city;
	  var state = data.state;
	  cityName.innerText = city + ', ' + state;
	};

	function displayDateTime(data) {
	  var time = data.currently.time;
	  dateTime.innerText = '' + time;
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
	  feelsLikeDiv.innerText = feelsLike + '\xBA F';
	  humidityDiv.innerText = humidity + '%';
	  visibilityDiv.innerText = visibility + ' miles';
	  uvIndexDiv.innerText = '' + uvIndex;
	};

	function displayTodaySummary(data) {
	  var todaySummary = data.daily.data[0].summary;
	  var upcomingSummary = data.hourly.summary;
	  todaySummaryText.innerText += " " + todaySummary;
	  upcomingSummaryText.innerText += " " + upcomingSummary;
	};

	function getBackground(image) {};

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
	        data: hourlyData.map(getTemperature)
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
	  if (index % 2 === 0) {
	    return item.time;
	  } else return "";
	};

	function getTemperature(item) {
	  return item.temperature;
	};

	function getMinRange(array) {
	  return Math.min.apply(Math, array.map(function (o) {
	    return o.temperature;
	  })) - 5;
	};

	function getMaxRange(array) {
	  return Math.max.apply(Math, array.map(function (o) {
	    return o.temperature;
	  })) + 5;
	};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./styles.scss", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./styles.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "body {\n  margin: 0;\n  background-position: center;\n  background-attachment: fixed;\n  background-size: cover;\n  background-repeat: no-repeat;\n  font-family: 'Anaheim'; }\n\nnav {\n  height: 80px;\n  color: #00ff2a;\n  background-color: rgba(0, 0, 0, 0.54);\n  position: relative;\n  width: 100%; }\n\nnav span {\n  float: left;\n  padding: 22px; }\n\nnav a {\n  color: #00ff2a; }\n\nnav button {\n  display: inline-block;\n  vertical-align: top;\n  width: 32px;\n  height: 32px;\n  border-radius: 4px;\n  background-color: #e0e0e0;\n  margin: 4px; }\n\nnav input {\n  border-radius: 60px;\n  width: 250px;\n  height: 25px;\n  padding-left: 10px; }\n\nnav input::placeholder {\n  color: #21638E;\n  font-size: 10pt; }\n\nnav button {\n  color: #404041; }\n\n.account-links {\n  float: right;\n  padding: 22px; }\n\n.nav-links {\n  text-align: center;\n  font-size: 20pt; }\n\n#logo {\n  font-family: 'Sedgwick Ave';\n  padding-right: 13px; }\n\n#search-btn {\n  display: inline-block;\n  height: 16px;\n  width: 16px; }\n\n.wrapper {\n  padding: 10px;\n  display: grid;\n  grid-gap: 10px;\n  grid-template-columns: auto 1fr;\n  background-color: rgba(255, 255, 255, 0);\n  color: #444;\n  position: absolute; }\n\n.box {\n  background-color: #444;\n  color: #fff;\n  padding: 20px;\n  font-size: 150%;\n  background-color: rgba(0, 0, 0, 0.54); }\n\n.current-weather {\n  grid-column: 1 / 3;\n  background-color: rgba(0, 0, 0, 0); }\n\n.current-weather img {\n  margin: -33px;\n  padding: 0px 10px; }\n\n.hour-item img {\n  margin: -42px;\n  margin-left: -14px;\n  margin-right: -39px;\n  padding: 0px 10px; }\n\n.location {\n  grid-column: 1 / 3;\n  background-color: rgba(0, 0, 0, 0);\n  padding-top: 0px; }\n\n.hourly {\n  grid-column: 1; }\n\n.currently {\n  grid-column: 2; }\n\n.current-details {\n  display: grid;\n  grid-template-columns: auto 1fr; }\n\n#current-icon {\n  text-align: center; }\n\n.helper {\n  display: inline-block;\n  height: 100%;\n  vertical-align: middle; }\n\n#current-icon img {\n  vertical-align: middle; }\n\n.d {\n  grid-column: 1 / -1; }\n\n.box h3 {\n  margin: 0px; }\n\n.box p {\n  margin: 0px; }\n\n#current-temp {\n  font-size: 50pt; }\n\n#city-name {\n  margin-block-start: 0.5em;\n  margin-block-end: 0.5em; }\n\n#current-list {\n  list-style-type: none; }\n\n#summaries {\n  grid-column: 1 / 3;\n  max-width: 440px; }\n\n#summaries p {\n  margin-top: 10px;\n  margin-bottom: 10px; }\n\n.current-item {\n  width: 300px;\n  margin-block-start: -10px;\n  margin-block-end: -20px; }\n\n.start {\n  float: left; }\n\n.end {\n  float: right; }\n\n#hourly-chart {\n  grid-column: 1 / 3;\n  background-color: rgba(0, 0, 0, 0.54); }\n", ""]);

	// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ })
/******/ ]);