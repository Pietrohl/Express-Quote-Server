'use strict';

var fetchAllButton = document.getElementById('fetch-quotes');
var fetchRandomButton = document.getElementById('fetch-random');
var fetchByAuthorButton = document.getElementById('fetch-by-author');

var quoteContainer = document.getElementById('quote-container');
var quoteText = document.querySelector('.quote');
var attributionText = document.querySelector('.attribution');

var resetQuotes = function resetQuotes() {
  quoteContainer.innerHTML = '';
};

var renderError = function renderError(response) {
  quoteContainer.innerHTML = '<p>Your request returned an error from the server: </p>\n<p>Code: ' + response.status + '</p>\n<p>' + response.statusText + '</p>';
};

var renderQuotes = function renderQuotes() {
  var quotes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  resetQuotes();
  if (quotes.length > 0) {
    quotes.forEach(function (quote) {
      var newQuote = document.createElement('div');
      newQuote.className = 'single-quote';
      newQuote.innerHTML = '<div class="quote-text">' + quote.quote + '</div>\n      <div class="attribution">- ' + quote.person + '</div>';
      quoteContainer.appendChild(newQuote);
    });
  } else {
    quoteContainer.innerHTML = '<p>Your request returned no quotes.</p>';
  }
};

fetchAllButton.addEventListener('click', function () {
  fetch('/api/quotes').then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  }).then(function (response) {
    renderQuotes(response.quotes);
  });
});

fetchRandomButton.addEventListener('click', function () {
  fetch('/api/quotes/random').then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  }).then(function (response) {
    renderQuotes([response.quote]);
  });
});

fetchByAuthorButton.addEventListener('click', function () {
  var author = document.getElementById('author').value;
  fetch('/api/quotes?person=' + author).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  }).then(function (response) {
    renderQuotes(response.quotes);
  });
});