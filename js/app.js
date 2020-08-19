'use strict';

document.getElementById('ul').style.display = 'none';


// Global Variables
var parentElement = document.getElementById('products');
var finalList = document.getElementById('ul');
var productArray = [];
var totalClicks = 0;
var maxClicks = 25;
var uniqueImageArray = [];
var percentageArray = [];
var productName = [];

// Product array

function Product (name){
  this.title = `${name}`.slice(0,-4);
  // slice function from StackOverflow: https://stackoverflow.com/questions/952924/javascript-chop-slice-trim-off-last-character-in-string
  this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
  // capitaliation code from: https://paulund.co.uk/how-to-capitalize-the-first-letter-of-a-string-in-javascript
  this.alt = `${name}`;
  this.filepath = `../img/${name}`;
  this.clicks = 0;
  this.shown = 0;
  productArray.push(this);
}

new Product('bag.jpg');
new Product('banana.jpg');
new Product('bathroom.jpg');
new Product('boots.jpg');
new Product('breakfast.jpg');
new Product('bubblegum.jpg');
new Product('chair.jpg');
new Product('cthulhu.jpg');
new Product('dog-duck.jpg');
new Product('dragon.jpg');
new Product('pen.jpg');
new Product('pet-sweep.jpg');
new Product('scissors.jpg');
new Product('shark.jpg');
new Product('sweep.png');
new Product('tauntaun.jpg');
new Product('unicorn.jpg');
new Product('usb.gif');
new Product('water-can.jpg');
new Product('wine-glass.jpg');


for (var j = 0; j < productArray.length; j++){
  productName.push(productArray[j].title);
}
console.log(productName);

function getRandomImage(){
  var randomIndex = getRandomNumber(productArray.length);
  while(uniqueImageArray.includes(randomIndex)){
    randomIndex = getRandomNumber(productArray.length);
  }
  uniqueImageArray.push(randomIndex);

  if(uniqueImageArray.length > 6){
    uniqueImageArray.shift();
  }

  var chosenImage = productArray[randomIndex];
  chosenImage.shown++;

  buildElements(chosenImage);
}

function buildElements(chosenImage){

  var imageElement = document.createElement('img');
  imageElement.setAttribute('src', chosenImage.filepath);
  imageElement.setAttribute('alt', chosenImage.alt);
  imageElement.setAttribute('title', chosenImage.title);

  var buttonLabel = document.createElement('label');
  buttonLabel.innerHTML = 'Select';
  var radioButton = document.createElement('input');
  radioButton.setAttribute('type', 'radio');
  radioButton.setAttribute('value', chosenImage.alt);
  parentElement.appendChild(imageElement);
  parentElement.appendChild(buttonLabel);
  parentElement.appendChild(radioButton);
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function handleClick(event){
  totalClicks++;
  // console.log('The total clicks were: '+ totalClicks);
  // console.log('the event.target', event.target.value);
  var alt = event.target.value;

  for(var i=0; i<productArray.length; i++){
    if(alt === productArray[i].alt){
      productArray[i].clicks++;
      productArray[i].shown++;
    }
  }

  parentElement.innerHTML = '';
  getRandomImage();
  getRandomImage();
  getRandomImage();
  if (totalClicks>=maxClicks) {
    parentElement.removeEventListener('click', handleClick);
    product();
    chart();
    console.log('This is the percentage: '+ percentageArray);
    document.getElementById('ul').style.display = 'block';

    for (var j = 0; j < productArray.length; j++){
      var li = document.createElement('li');
      li.textContent = productArray[j].title + ' had ' + productArray[j].clicks + ' votes and was shown ' + productArray[j].shown + ' times.';
      finalList.appendChild(li);
    }
  }
}



parentElement.addEventListener('click', handleClick);

getRandomImage();
getRandomImage();
getRandomImage();


// // PRODUCT FUNCTION BELOW

function product (){
  for (var i = 0; i < productArray.length; i++) {
    if (parseInt(productArray[i].clicks) === 0 || parseInt(productArray[i].shown) === 0 ) {
      percentageArray.push(0);
    } else {
      percentageArray.push(Math.round((parseInt(productArray[i].clicks) / parseInt(productArray[i].shown)* 100)));
    }
  }
}


// Rendering chart

function chart() {
  console.log(percentageArray);
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productName,
      datasets: [{
        label: 'Popularity percentage: Number of votes divided by number of times that object was displayed',
        data: percentageArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)' ,
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)' ,
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)' ,
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
