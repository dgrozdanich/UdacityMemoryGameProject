/*
 * Create a list that holds all of your cards
 */

const cardIcons = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", 
"fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", 
"fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle",
"fa fa-paper-plane-o", "fa fa-cube"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//HInt for making timer work on click: With regards to your timer, a 
//hint would be to focus on when you are matching your cards. You can try and call 
//your timer function after you flip the first card or the second card. You can do this in an if/else statement.


const cardsContainer = document.querySelector(".deck");

let openCards = [];
let matchedCards = [];
let timer = 0;
let finalTime = "";


 // Create the cards
function game() {
  shuffle(cardIcons);
for (let i = 0; i < cardIcons.length; i++) {
 	const card = document.createElement("li");
 	card.classList.add("card");
  card.innerHTML = `<i class="${cardIcons[i]}"></i>`;
 	cardsContainer.appendChild(card);
 	
    // Add Click Event to each card
    click(card);

 }	
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



/*
 * Click event
 */

function click(card) {
 	//Card Click Event
 	card.addEventListener("click", function() {

 		const currentCard = this;
        const previousCard = openCards[0];

     // For an existing Opened Card     
 		if(openCards.length === 1){

 		    card.classList.add("open", "show", "disable", "flipInY", "animated");
 	        openCards.push(this);
 	        
            setTimeout(function() {
 	         // Compare the 2 open cards
             compare(currentCard, previousCard);
         }, 275);

 		} else {
     // There is no open card
             currentCard.classList.add("open", "show", "disable", "flipInY", "animated");
 	           openCards.push(this);
 		}
 	     
 	});
 }


// starts the timer
  const gameTimer = () => {
    let startTime = new Date().getTime();

    // Update the timer every second
    timer = setInterval(function() {
      var now = new Date().getTime();

      // Find the time elapsed between now and start
      var elapsed = now - startTime;

      // Calculate minutes and seconds
      let minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

      // Add starting 0 if seconds < 10
      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      let currentTime = minutes + ":" + seconds;

      // Update clock on game screen 
      $(".clock").text(currentTime);
      finalTime = currentTime;

    }, 750);
  };

/*
 * Compare Cards Function
 */

 function compare(currentCard, previousCard){

 	         if(currentCard.innerHTML === previousCard.innerHTML) {
 	         	
 	         	currentCard.classList.add("match");
 	         	previousCard.classList.add("match");

 	         	matchedCards.push(currentCard,previousCard);

 	         	openCards = [];
            addMove();

 	         	// Check if the game is over

 	         	gameOver();

 	        } else {

                //delays the selection for 300ms and then resets
 	        	setTimeout(function() {
                currentCard.classList.remove("open", "show", "disable","flipInY", "animated");
 	        	    previousCard.classList.remove("open", "show", "disable","flipInY", "animated");
 	        	    currentCard.classList.add("shake", "animated");
 	        	    previousCard.classList.add("shake", "animated");
 	        	}, 300);

                openCards = [];
                currentCard.classList.remove("shake", "animated");
 	        	    previousCard.classList.remove("shake", "animated");
                addMove();
 	        }
 }


 function gameOver () {

 	if(matchedCards.length === cardIcons.length) {
    clearInterval(timer);
 		playAgain();
 	}
 }


/*
 * Alert text 
 */

 function playAgain () {

  if (window.confirm( "Game Over! You won in " + finalTime + ", took " + moves +" moves and got a " + 
    ratingFinal + " star rating! Would you like to play again?")) { 
      restart();
     }
 }


/*
 *  Move Counter
 */ 
const movesContainer = document.querySelector(".moves"); 
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
	moves++;
	movesContainer.innerHTML = moves;

	// set the rating
	rating();
}


/*
 * Rating
 */

const starsContainer = document.querySelector(".stars");
let ratingFinal = 3;
function rating() {
	switch(moves){
		case 20:
		     starsContainer.innerHTML = 
         '<li><i class="fa fa-star"></i></li><li><i class = "fa fa-star"></i></li>';
         ratingFinal = 2;
		break;

		case 25: 
		     starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li>';
         ratingFinal = 1;
		break;
	}
}

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function (){
  restart();
});

/*
 *  Restart
  */
function restart() {

  	// Delete all cards
     cardsContainer.innerHTML = "";

  	// Call "game" to create new crads
     game();


  	// Reset any related variabels
    openCards = [];
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = 
    '<li><i class="fa fa-star"></i></li><li><i class = "fa fa-star"></i></li><li><i class = "fa fa-star"></i></li>';
    clearInterval(timer);
    $(".clock").text(0);
    //Reset the Timer
    gameTimer();
  }


// Start the game

game();
gameTimer();