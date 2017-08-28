
// all the memory tiles images stored as an array
var tiles = [
    "http://images.clipartpanda.com/pokemon-clip-art-clip-art-pokemon-014810.jpg",
    "http://images.clipartpanda.com/pokemon-clip-art-biyga5yiL.jpeg",
    "https://clipartion.com/wp-content/uploads/2015/11/pokemon-clip-art1.jpg",
    "http://www.picgifs.com/clip-art/cartoons/pokemon/clip-art-pokemon-860612.jpg",
    "http://images.clipartpanda.com/pokemon-clip-art-clip-art-pokemon-192137.jpg",
    "http://www.picgifs.com/clip-art/cartoons/pokemon/clip-art-pokemon-461574.jpg",
    "https://clipartion.com/wp-content/uploads/2015/11/pokemon-clip-art.jpg",
    "http://www.picgifs.com/clip-art/cartoons/pokemon/clip-art-pokemon-905111.jpg",
    "http://images.clipartpanda.com/pokemon-clip-art-clip-art-pokemon-014810.jpg",
    "http://images.clipartpanda.com/pokemon-clip-art-biyga5yiL.jpeg",
    "https://clipartion.com/wp-content/uploads/2015/11/pokemon-clip-art1.jpg",
    "http://www.picgifs.com/clip-art/cartoons/pokemon/clip-art-pokemon-860612.jpg",
    "http://images.clipartpanda.com/pokemon-clip-art-clip-art-pokemon-192137.jpg",
    "http://www.picgifs.com/clip-art/cartoons/pokemon/clip-art-pokemon-461574.jpg",
    "https://clipartion.com/wp-content/uploads/2015/11/pokemon-clip-art.jpg",
    "http://www.picgifs.com/clip-art/cartoons/pokemon/clip-art-pokemon-905111.jpg"
    ];

var tiles_values = []; //array to store memory tile values
var tile_ids = []; // array to store tile ids
var tiles_flipped = 0; // variable to store number of tiles that are flipped
var player1 = 0; // variable to store score for player 1 
var player2 = 0; // variable to store score for player 2 
var playerturn = 1; // variable to check the player's turn

newBoard(); // call the function to arrange the tiles

//function to arrange the tiles
function newBoard() {
    
    tiles_flipped = 0;
    tiles = _.shuffle(tiles);
    var output = '';
    _.forEach(tiles, function(tiles_value, index) {
        output += '<div id="tile_'+ index +'" onclick="memoryFlipTile(this,\''+ tiles_value +'\')"></div>';
    });

    document.getElementById('memory_board').innerHTML = output;
    
    if(playerturn === 1){
            
        document.getElementById("player1").style.background = "blue";
        document.getElementById("player2").style.background ="none";
    }
    else{

        document.getElementById("player2").style.background = "red";
        document.getElementById("player1").style.background ="none";
    }
}

//function to check if card can be flipped if not already open
function canFlipCard(tile) {
  return (tile.innerHTML == "" && tiles_values.length < 2);
}

// function to check if one card is flipped
function isOneCardFlipped() {
  return (tiles_values.length === 1);
}

//function to check if no cards are flipped
function areNoCardsFlipped() {
  return (tiles_values.length === 0);
}

// function to set the card as flipped once clicked
function setCardAsFlipped(tile, value) {
  tiles_values.push(value); // push the flipped tile's values into tiles_values array
  tile_ids.push(tile.id); //  push the flipped tile's ids into tiles_ids array
}

//function to check if the flipped tiles match
function isThereAMatch() {
   return (tiles_values[0] === tiles_values[1]);
}

//function to match the flipped tiles
function matchCards() {
    
    tiles_flipped += 2;
    // Clear both arrays
    tiles_values = [];
    tile_ids = [];
    
    // Change the player's turn
    if(playerturn === 1){
        playerturn = 2;
    } else if(playerturn === 2){
        playerturn = 1;
    }
    
    //change css accordingly
    if(playerturn === 1){

        document.getElementById("player1").style.background = "blue";
        document.getElementById("player2").style.background ="none";
    }else{
        
        document.getElementById("player2").style.background = "red";
        document.getElementById("player1").style.background ="none";
        
    }
}

//function to check if game is over and all the tiles are flipped
function isGameOver() {
  // Check to see if the whole board is cleared
  return (tiles_flipped === tiles.length);
}

//function for game over
function gameIsOver() {
    
    // Append the message in the modal dialog respectively
    if(player1 > player2)
        {
            $("#winner").text("Winner!!Player1 catched more Pokemons");
        }
    if(player2 > player1){
            $("#winner").text("Winner!!Player2 catched more Pokemons");
        }
    if(player1 === player2)
        {
                $("#winner").text("Both players catched equal Pokemons");
        }
    // show modal dialog         
    $("#myModal").modal('show');

}
 
function reset()
{
    //reset the scores
    player1 = 0;
    player2 = 0;
    playerturn = 1;

    document.getElementById("score1").innerHTML = player1;
    document.getElementById("score2").innerHTML = player2;
    
    document.getElementById('memory_board').innerHTML = "";
    // display new board 
    newBoard();
}

function cardsDoNotMatch() {
   if(playerturn === 1){
    playerturn = 2;
    }
   else
   if(playerturn === 2){
    playerturn = 1;
    
   }
  setTimeout(flipCardBack, 700);
}

function flipCard(tile, value) {
  tile.style.background = '#FFF';
  tile.innerHTML = "<img id='tilesimg' src='" + value + "'>";
  
}

function flipCardBack() {
  // Flip the 2 tiles back over
  var tile_1 = document.getElementById(tile_ids[0]);
  var tile_2 = document.getElementById(tile_ids[1]);
  tile_1.style.background = '#FF9900';
  tile_1.innerHTML = "";
  tile_2.style.background = '#FF9900';
  tile_2.innerHTML = "";

  // Clear both arrays
  tiles_values = [];
  tile_ids = [];
  
  if(playerturn === 1)
    {
        document.getElementById("player1").style.background = "blue";
        document.getElementById("player2").style.background ="none";

    }
    else{
        document.getElementById("player2").style.background = "red";
        document.getElementById("player1").style.background ="none";
        
        

    }
}

function memoryFlipTile(tile, value) {
    
    if (canFlipCard(tile)) {

        flipCard(tile, value);
        
            if (areNoCardsFlipped()) {
                
                setCardAsFlipped(tile, value);
                
            } else if(isOneCardFlipped()) {
      
                setCardAsFlipped(tile, value);
                if(isThereAMatch()) {
                    
                    if(playerturn === 1){
                        
                        player1++;
                        document.getElementById("score1").innerHTML = player1;
                    } else{
                
                        player2++;
                        document.getElementById("score2").innerHTML = player2;
                    }
        
                    document.getElementById("match").play();
                    setCardAsFlipped(tile, value);
                    matchCards();
                    setTimeout(function(){
                    if (isGameOver()) {
                        gameIsOver();
                    }},1000);
                    
                    } else {
  			            cardsDoNotMatch();
                    }
    
        }
    }

}

$("#close").on("click",function(){
    
    $("#myModal").css("display","none");

    var result = confirm("Do you want to play again?");
    
    if(result === true){
        reset();
    } else{
        
    }
        

});

$("#play").on("click",function(){

    document.getElementById("play").sttle.display = "block";
    reset();
     
});

$("#start").on("click",function(){
    

            document.getElementById("memory_board").style.display = "block";

            document.getElementById("scores").style.display = "block";

            reset();
            
    });