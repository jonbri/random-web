
// function getRandomNumber() {
//   fetch('/listUsers')
//     .then(function(response) {
//       if (response.status !== 200) {
//         console.log('Looks like there was a problem. Status Code: ' + response.status);
//         return;
//       }
//       // Examine the text in the response
//       response.json().then(function(data) {
//         console.log(data);
//       });
//     })
//     .catch(function(err) {
//       console.log('Fetch Error :-S', err);
//     });

//   var number = Math.floor(Math.random() * 99) + 1;
//   return number.toString();
// }

var cards = [];
var game = 'numbers';

var gameParam = location.search.split('game=')[1];
if (gameParam !== undefined) {
  game = gameParam;
}
window.ticker.config({
  align: 'left'
});
console.log('`', game.toUpperCase());

if (game === 'numbers') {
  const array = [];
  const amountToGenerate = 100;
  for (var i = 0; i < amountToGenerate; i++) {
    array.push(i);
  }
  for (var i = 0; i < amountToGenerate; i++) {
    array.push(i * -1);
  }
  for (var i = 0; i < amountToGenerate; i++) {
    cards.push({
      key: array.splice(0, 1),
      value: array.splice(0, 1)
    });
  }
} else if (game === 'chinese') {
  cards = [
    {
      key: 'c',
      value: 'c'
    },
    {
      key: 'h',
      value: 'h'
    },
    {
      key: 'i',
      value: 'i'
    },
    {
      key: 'n',
      value: 'n'
    }
  ];
}


var currentIndex = 0;
var cardUnopened = true;

function goForward() {
  var target = document.getElementById("target");

  if (cardUnopened) {
    target.innerHTML = cards[currentIndex].value;
    cardUnopened = false;
    return;
  }
  cardUnopened = true;
  currentIndex++;

  if (currentIndex === cards.length) {
    currentIndex = 0;
  }

  target.innerHTML = cards[currentIndex].key;
}

function goBackward() {
  var target = document.getElementById("target");
  if (cardUnopened) {
    cardUnopened = false;
    if (currentIndex === 0) {
      currentIndex = cards.length - 1;
      target.innerHTML = cards[currentIndex].value;
      return;
    }
    currentIndex--;
    target.innerHTML = cards[currentIndex].value;
    return;
  }
  cardUnopened = true;
  target.innerHTML = cards[currentIndex].key;
}

// First we check if you support touch, otherwise it's click:
let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

// Then we bind via thát event. This way we only bind one event, instead of the two as below
window.addEventListener(touchEvent, (event) => {
  // console.log(`body click: (${event.clientX}, ${event.clientY}) (${window.innerWidth}, ${window.innerHeight})`);
  var middleX, clientX;

  if (touchEvent === 'click') {
    middleX = window.innerWidth / 2;
    clientX = event.clientX;
  } else {
    middleX = window.innerWidth / 2;
    clientX = event.touches[0].clientX;
  }
  // console.log('`', `${middleX}, ${clientX}`);

  if (clientX < middleX) {
    goBackward();
  } else {
    goForward();
  }

  if (currentIndex > 0) {
    if (cardUnopened && currentIndex % 30 === 0) {
      console.log('`', ':)');
    }
  }
});


function initialRender() {
  var target = document.getElementById("target");
  target.innerHTML = cards[currentIndex].key;
}
initialRender();
