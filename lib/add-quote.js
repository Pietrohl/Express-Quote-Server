'use strict';

var submitButton = document.getElementById('submit-quote');
var newQuoteContainer = document.getElementById('new-quote');

submitButton.addEventListener('click', function () {
  var quote = document.getElementById('quote').value;
  var person = document.getElementById('person').value;

  fetch('/api/quotes?quote=' + quote + '&person=' + person, {
    method: 'POST'
  }).then(function (response) {
    return response.json();
  }).then(function (_ref) {
    var quote = _ref.quote;

    var newQuote = document.createElement('div');
    newQuote.innerHTML = '\n    <h3>Congrats, your quote was added!</h3>\n    <div class="quote-text">' + quote.quote + '</div>\n    <div class="attribution">- ' + quote.person + '</div>\n    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>\n    ';
    newQuoteContainer.appendChild(newQuote);
  });
});