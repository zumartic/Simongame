$(document).ready(function() {
  var round ;
  var value = 0;
  var valueD = "00";
  var myVar;
  var errTimer;
  var buttons = ["#green", "#red", "#yellow", "#blue"];
  var gameArr = [];
  var correctAnswers = 0;
  var interval = 800;
  var duration = 500;
  var sound0 = new Audio('sounds/sound0.wav');
  var sound1 = new Audio('sounds/sound1.wav');
  var sound2 = new Audio('sounds/sound2.wav');
  var sound3 = new Audio('sounds/sound3.wav');
  var error = new Audio('sounds/error.wav');
  var soundOn = true;
  
  
   // Set default state
  document.getElementById('myonoffswitch').checked = false;
  document.getElementById('Strict').checked = false;
  $("input").val("");
  

  
  // On-Off switch
  $(".onoffswitch").change(function() {
    if (document.getElementById('myonoffswitch').checked) {
	  $("input").val("00");
	  $(".checkButtons").css({"pointer-events": "auto"});
	  soundOn = true;
	  
    } else {
		  // Game shut down 
		  $("input").val("");
		  // Disable buttons
		 $(".buttons").css({"pointer-events": "none"});
		 $(".checkButtons").css({"pointer-events": "none"});
		 // Turn strict mode off
		 document.getElementById('Strict').checked = false;
		  document.getElementById('Start').checked = false;
		 // Clear sequence
		 clearInterval(myVar);
		 // Turn sounds off
		 sound0.pause();
		 sound1.pause();
		 sound2.pause();
		 sound3.pause();
		 error.pause();
		 clearTimeout(errTimer);
		 // Turn lights off
		 greenOff();
		 redOff();
		 yellowOff();
		 blueOff();	
    }
  });
  

  $(".Start").change(function() {
    //  "input[type='checkbox']" Check input( $( this ).val() ) for validity here
	
	if (document.getElementById('Start').checked) {
			clearInterval(myVar);
			
			if (errTimer != null) {
				error.pause();
				clearTimeout(errTimer);
			}
		
			round = 0;
			value = 1;
			gameArr = [];
			for (i = 0; i < 20; i++) {
				//gameArr.push(Math.floor(Math.random() * 4));
				gameArr.push(0);
			}
			
			// Show start LED
			setTimeout(function() {
				document.getElementById("Start").checked = false;
			}, 1500);

			updateInput();
			// Disable buttons
			$(".buttons").css({"pointer-events": "none"});
			
			// New sequence
			showColors();
	}
	});


  function setSpeed() {
	  if (value<5){
		  duration = 500;
		  interval = 800;
		  return;
	  }
	  if (value<9){
		  duration = 400;
		  interval = 600;
		   return;
	  }
	   if (value<13){
		  duration = 300;
		  interval = 400;
		   return;
	  }
	
	  duration = 200;
	  interval = 300;
	  return;
	
  }	
	
  function showColors() {
	  // Set game speed based on the round
	  setSpeed();
	  
	  // If error timer is running then pause sound and stop timer
	  if (errTimer != null) {
				error.pause();
				clearTimeout(errTimer);
			}
			
      // Show sequence
	  setTimeout(function() {
		  myVar = setInterval(function() {
			myTimer();
			round++;
			if (round >= value) {
				clearInterval(myVar);
				round = 0;
				// Enable buttons
				$(".buttons").css({"pointer-events": "auto"});
				// Button press does takes too long time 3s. 
				// Start timer after the button flashes
				setTimeout(function() {
					errTimer = setTimeout(timerOff, 3000);
				}, duration);
			}
		  }, interval);
	  }, 800);
	 }
  
  // Turn takes too long time
  function timerOff(){
	  error.currentTime = 0;
	  error.play();
	  // Disable buttons
	 $(".buttons").css({"pointer-events": "none"});
	 setTimeout(function() {
		if (document.getElementById('myonoffswitch').checked===true && document.getElementById("Start").checked === false){
				error.currentTime = 0;
				error.pause();
				
				// If strict mode enabled then create new array and start from beginning
				if(document.getElementById('Strict').checked){
				
				// Create game array
					gameArr = [];
					for (i = 0; i < 20; i++) {
						gameArr.push(Math.floor(Math.random() * 4));
					}
					round = 0;
					value = 1;
					updateInput();
				}
					correctAnswers=0;
					
					//setTimeout(function() {
						if (document.getElementById('myonoffswitch').checked===true){
							showColors();
						}
					//}, 800);
				}	  		
		}, 1500);
  }
  
  function myTimer() {
  
    switch (gameArr[round]) {
      case 0:
       greenButton(); 
		break;
		
      case 1:
        redButton();
        break;
		
      case 2:
        yellowButton();
        break;
		
      case 3:
        blueButton();
        break;
		
      default:
        console.log("You should not be here, like ever");
        break;
    }
  }
  
  // Game engine
  function checkValue(ccolor) {
	  
	clearTimeout(errTimer);
	
	if(ccolor==gameArr[correctAnswers]){
		correctAnswers++;
		if(correctAnswers==value){
			correctAnswers=0;
			value++;
			// Disable buttons
			$(".buttons").css({"pointer-events": "none"});
	
			
				if(value==21){ // Victory
					setTimeout(function() {
						showVictory();
					}, 800);
				
				}else{ // Continue game
					if (document.getElementById('myonoffswitch').checked===true){
						updateInput();
						showColors();
						}
				}
				
		}
	}else{ // Wrong button pressed
		// Disable buttons
		$(".buttons").css({"pointer-events": "none"});
		sound0.pause();
		sound1.pause();
		sound2.pause();
		sound3.pause();
		error.currentTime = 0;
		error.play();
		soundOn = false;
		
		setTimeout(function() {
			// Check that power is still on
			if (document.getElementById('myonoffswitch').checked===true){
			error.pause();
			
			switch (ccolor) {
			  case 0:	
				greenOff();
				break;
				
			  case 1:
				redOff();
				break;
				
			  case 2:
				yellowOff();
				break;
				
			  case 3:
				blueOff();
				break;
				
			  default:
				console.log("You should not be here, like ever");
				break;
			}
		
			soundOn = true;
			
			// If strict mode enabled then create new array and start from beginning
			if(document.getElementById('Strict').checked){
			
			// Create game array
				gameArr = [];
				for (i = 0; i < 20; i++) {
					gameArr.push(Math.floor(Math.random() * 4));
				}
				round = 0;
				value = 1;
				updateInput();
			} // strict mode game array modification ENDS
				correctAnswers=0;
				 if(document.getElementById("Start").checked === false){
					showColors();
				 }
			}  // Power on if statement
		 }, 1500);
		
		}
	}
	
	
  function showVictory() {
	  var victory = 0;
	  round=19;
	  interval = 900;
	  duration = 200;  
	  myTimer();
	  
	  setTimeout(function() {
		   interval = 900;
		   duration = 700;  
		   myTimer();
			myVar = setInterval(function() {
				myTimer();
				victory++;
				if (victory > 3) {
					clearInterval(myVar);
				}
			}, interval);
		}, 400);
  }
  
  // Get color button presses
  $("#green").mouseup(function green() {
	greenButton();
	checkValue(0);
  });
  

  $("#red").mouseup(function red() {
   	redButton();
	checkValue(1);
  });
  
   

  $("#yellow").mouseup(function yellow() {
	yellowButton();
	checkValue(2);
  }); 
 
  $("#blue").mouseup(function blue() {
	blueButton();						
	checkValue(3);
  });
  // Button presses end
  
  // Update input element based on value attribute
  function updateInput() {
    if (value.toString().length == 1) {
      valueD = "0" + value.toString();
      $("input").val(valueD);
    } else $("input").val(value);
  }
  
  function greenButton() {
       $("#green").css({
          "background-color": "rgba(0,255,0,1)",
          "background": "-webkit-linear-gradient(-45deg,rgba(255,0,0,0),rgba(0,255,0,1))",
          "background": "-o-linear-gradient(-45deg,rgba(255,0,0,0),rgba(0,255,0,1))",
          "background": "-moz-linear-gradient(-45deg,rgba(255,0,0,0),rgba(0,255,0,1))",
          "background": "linear-gradient(-45deg, rgba(255,0,0,0), rgba(0,255,0,1))"
        });
		
		sound0.currentTime = 0;
		sound0.play();
		
		setTimeout(function() {
			if(soundOn){
				$("#green").css({
				"background-color": "rgba(0,255,0,0.3)",
				"background": "-webkit-linear-gradient(-45deg,rgba(255,0,0,0),rgba(0,255,0,0.3))",
				"background": "-o-linear-gradient(-45deg,rgba(255,0,0,0),rgba(0,255,0,0.3))",
				"background": "-moz-linear-gradient(-45deg,rgba(255,0,0,0),rgba(0,255,0,0.3))",
				"background": "linear-gradient(-45deg, rgba(255,0,0,0), rgba(0,255,0,0.3))"
			  });
				sound0.pause();
			}
        }, duration);
  }  
  
   function redButton() {
	   $("#red").css({
          "background-color": "rgba(255,0,0,1)",
          "background": "-webkit-linear-gradient(45deg,rgba(255,0,0,0),rgba(255,0,0,1))",
          "background": "-o-linear-gradient(45deg,rgba(255,0,0,0),rgba(255,0,0,1))",
          "background": "-moz-linear-gradient(45deg,rgba(255,0,0,0),rgba(255,0,0,1))",
          "background": "linear-gradient(45deg, rgba(255,0,0,0), rgba(255,0,0,1))"		  
        });
		
		sound1.currentTime = 0;
		sound1.play();
		  
        setTimeout(function() {
			if(soundOn){
			  $("#red").css({
				"background-color": "rgba(255,0,0,0.3)",
				"background": "-webkit-linear-gradient(45deg,rgba(255,0,0,0),rgba(255,0,0,0.3))",
				"background": "-o-linear-gradient(45deg,rgba(255,0,0,0),rgba(255,0,0,0.3))",
				"background": "-moz-linear-gradient(45deg,rgba(255,0,0,0),rgba(255,0,0,0.3))",
				"background": "linear-gradient(45deg, rgba(255,0,0,0), rgba(255,0,0,0.3))"
			  });
			  sound1.pause();
			}
        }, duration);
   }
   
    function yellowButton() {
		$("#yellow").css({
          "background-color": "rgba(255,255,0,1)",
          "background": "-webkit-linear-gradient(-135deg,rgba(255,0,0,0),rgba(255,255,0,1))",
          "background": "-o-linear-gradient(-135deg,rgba(255,0,0,0),rgba(255,255,0,1))",
          "background": "-moz-linear-gradient(-135deg,rgba(255,0,0,0),rgba(255,255,0,1))",
          "background": "linear-gradient(-135deg, rgba(255,0,0,0), rgba(255,255,0,1))"
        });
		
		sound2.currentTime = 0;
		sound2.play();
		  
        setTimeout(function() {
			if(soundOn){
			  $("#yellow").css({
				"background-color": "rgba(255,255,0,0.3)",
				"background": "-webkit-linear-gradient(-135deg,rgba(255,0,0,0),rgba(255,255,0,0.3))",
				"background": "-o-linear-gradient(-135deg,rgba(255,0,0,0),rgba(255,255,0,0.3))",
				"background": "-moz-linear-gradient(-135deg,rgba(255,0,0,0),rgba(255,255,0,0.3))",
				"background": "linear-gradient(-135deg, rgba(255,0,0,0), rgba(255,255,0,0.3))"
			  });
			  sound2.pause();
			}
        }, duration);
	}
	
	function blueButton(){
		$("#blue").css({
          "background-color": "rgba(0,0,255,1)",
          "background": "-webkit-linear-gradient(135deg,rgba(255,0,0,0),rgba(0,0,255,1))",
          "background": "-o-linear-gradient(135deg,rgba(255,0,0,0),rgba(0,0,255,1))",
          "background": "-moz-linear-gradient(135deg,rgba(255,0,0,0),rgba(0,0,255,1))",
          "background": "linear-gradient(135deg, rgba(255,0,0,0), rgba(0,0,255,1))"
        });
		
     	sound3.currentTime = 0;
		sound3.play();
		  
        setTimeout(function() {
			if(soundOn){
			  $("#blue").css({
				"background-color": "rgba(0,0,255,0.3)",
				"background": "-webkit-linear-gradient(135deg,rgba(255,0,0,0),rgba(0,0,255,0.3))",
				"background": "-o-linear-gradient(135deg,rgba(255,0,0,0),rgba(0,0,255,0.3))",
				"background": "-moz-linear-gradient(135deg,rgba(255,0,0,0),rgba(0,0,255,0.3))",
				"background": "linear-gradient(135deg, rgba(255,0,0,0), rgba(0,0,255,0.3))"
			  });
			  sound3.pause();
			}
        }, duration);
	}
	
   function greenOff(){
	    $("#green").css({
            "background-color": "rgba(0,255,0,0.3)",
            "background": "-webkit-linear-gradient(-45deg,rgba(255,0,0,0),rgba(0,255,0,0.3))",
            "background": "-o-linear-gradient(-45deg,rgba(255,0,0,0),rgba(0,255,0,0.3))",
            "background": "-moz-linear-gradient(-45deg,rgba(255,0,0,0),rgba(0,255,0,0.3))",
            "background": "linear-gradient(-45deg, rgba(255,0,0,0), rgba(0,255,0,0.3))"
          });
  }
	
  function redOff(){
	  $("#red").css({
            "background-color": "rgba(255,0,0,0.3)",
            "background": "-webkit-linear-gradient(45deg,rgba(255,0,0,0),rgba(255,0,0,0.3))",
            "background": "-o-linear-gradient(45deg,rgba(255,0,0,0),rgba(255,0,0,0.3))",
            "background": "-moz-linear-gradient(45deg,rgba(255,0,0,0),rgba(255,0,0,0.3))",
            "background": "linear-gradient(45deg, rgba(255,0,0,0), rgba(255,0,0,0.3))"
          });
  }
  
   function yellowOff(){
	   $("#yellow").css({
            "background-color": "rgba(255,255,0,0.3)",
            "background": "-webkit-linear-gradient(-135deg,rgba(255,0,0,0),rgba(255,255,0,0.3))",
            "background": "-o-linear-gradient(-135deg,rgba(255,0,0,0),rgba(255,255,0,0.3))",
            "background": "-moz-linear-gradient(-135deg,rgba(255,0,0,0),rgba(255,255,0,0.3))",
            "background": "linear-gradient(-135deg, rgba(255,0,0,0), rgba(255,255,0,0.3))"
          });
  }
  
   function blueOff(){
	 $("#blue").css({
            "background-color": "rgba(0,0,255,0.3)",
            "background": "-webkit-linear-gradient(135deg,rgba(255,0,0,0),rgba(0,0,255,0.3))",
            "background": "-o-linear-gradient(135deg,rgba(255,0,0,0),rgba(0,0,255,0.3))",
            "background": "-moz-linear-gradient(135deg,rgba(255,0,0,0),rgba(0,0,255,0.3))",
            "background": "linear-gradient(135deg, rgba(255,0,0,0), rgba(0,0,255,0.3))"
          });
  }	
	
});