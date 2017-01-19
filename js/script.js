$(document).ready(function() {
  var round ;
  var value = 0;
  var valueD = "00";
  var myVar;
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
  
  //sound0.loop = true;
  //sound0.load();
  
  document.getElementById('myonoffswitch').checked = false;
  document.getElementById('Strict').checked = false;
  $("input").val("");
  

  // On-Off switch
  $(".onoffswitch").change(function() {
    if (document.getElementById('myonoffswitch').checked) {
      //updateInput();
	  $("input").val("00");
	  //$(".buttons").css({"pointer-events": "auto"});
	  $(".checkButtons").css({"pointer-events": "auto"});
    } else {
	  // Power down input element
      $("input").val("");
	  // Disable buttons
	 $(".buttons").css({"pointer-events": "none"});
	 $(".checkButtons").css({"pointer-events": "none"});
	 // Turn strict mode led off
	 document.getElementById('Strict').checked = false;
	 // Clear indicator sequence
	 clearInterval(myVar);
	 // Turn sounds off
	 sound0.pause();
	 sound1.pause();
	 sound2.pause();
	 sound3.pause();
	 error.pause();
    }
  });

  $(".Start").change(function() {
    //  "input[type='checkbox']" Check input( $( this ).val() ) for validity here
	
	if (document.getElementById('Start').checked) {
		clearInterval(myVar);
		round = 0;
		value = 1;
		gameArr = [];
		for (i = 0; i < 20; i++) {
			gameArr.push(Math.floor(Math.random() * 4));
		}
		
		// Show start LED
		setTimeout(function() {
			document.getElementById("Start").checked = false;
		}, 500);

		 //value = $("input").val();
		updateInput();
		console.log(gameArr);
		// Disable buttons
		$(".buttons").css({"pointer-events": "none"});
		showColors();
	} else {
		  clearInterval(myVar);
		  round = 0;
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
	  setSpeed();
	  // Show sequence
     myVar = setInterval(function() {
		// console.log(round);
        myTimer();
        round++;
        if (round >= value) {
          clearInterval(myVar);
          round = 0;
		  // Enable buttons
		   $(".buttons").css({"pointer-events": "auto"});
        }
      }, interval);
  }
  
  function myTimer() {
    // console.log(buttons[Math.floor(Math.random() * 4)]);
    switch (gameArr[round]) {
      case 0:
        //console.log("Green");
        /*$("#green").css({
          "background-color": "rgba(0,255,0,1)",
          "background": "-webkit-linear-gradient(-45deg,rgba(255,0,0,0),rgba(0,255,0,1))",
          "background": "-o-linear-gradient(-45deg,rgba(255,0,0,0),rgba(0,255,0,1))",
          "background": "-moz-linear-gradient(-45deg,rgba(255,0,0,0),rgba(0,255,0,1))",
          "background": "linear-gradient(-45deg, rgba(255,0,0,0), rgba(0,255,0,1))"
        });
		
		sound0.currentTime = 0;
		sound0.play();
        
		setTimeout(function() {
          $("#green").css({
            "background-color": "rgba(0,255,0,0.3)",
            "background": "-webkit-linear-gradient(-45deg,rgba(255,0,0,0),rgba(0,255,0,0.3))",
            "background": "-o-linear-gradient(-45deg,rgba(255,0,0,0),rgba(0,255,0,0.3))",
            "background": "-moz-linear-gradient(-45deg,rgba(255,0,0,0),rgba(0,255,0,0.3))",
            "background": "linear-gradient(-45deg, rgba(255,0,0,0), rgba(0,255,0,0.3))"
          });
		  sound0.pause();
        }, duration);*/
		
		greenButton();
        
		break;
		
      case 1:
        //console.log("Red");
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
          $("#red").css({
            "background-color": "rgba(255,0,0,0.3)",
            "background": "-webkit-linear-gradient(45deg,rgba(255,0,0,0),rgba(255,0,0,0.3))",
            "background": "-o-linear-gradient(45deg,rgba(255,0,0,0),rgba(255,0,0,0.3))",
            "background": "-moz-linear-gradient(45deg,rgba(255,0,0,0),rgba(255,0,0,0.3))",
            "background": "linear-gradient(45deg, rgba(255,0,0,0), rgba(255,0,0,0.3))"
          });
		  sound1.pause();
        }, duration);
        break;
		
      case 2:
        //console.log("Yellow");
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
          $("#yellow").css({
            "background-color": "rgba(255,255,0,0.3)",
            "background": "-webkit-linear-gradient(-135deg,rgba(255,0,0,0),rgba(255,255,0,0.3))",
            "background": "-o-linear-gradient(-135deg,rgba(255,0,0,0),rgba(255,255,0,0.3))",
            "background": "-moz-linear-gradient(-135deg,rgba(255,0,0,0),rgba(255,255,0,0.3))",
            "background": "linear-gradient(-135deg, rgba(255,0,0,0), rgba(255,255,0,0.3))"
          });
		  sound2.pause();
        }, duration);
        break;
		
      case 3:
        //console.log("Blue");
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
          $("#blue").css({
            "background-color": "rgba(0,0,255,0.3)",
            "background": "-webkit-linear-gradient(135deg,rgba(255,0,0,0),rgba(0,0,255,0.3))",
            "background": "-o-linear-gradient(135deg,rgba(255,0,0,0),rgba(0,0,255,0.3))",
            "background": "-moz-linear-gradient(135deg,rgba(255,0,0,0),rgba(0,0,255,0.3))",
            "background": "linear-gradient(135deg, rgba(255,0,0,0), rgba(0,0,255,0.3))"
          });
		  sound3.pause();
        }, duration);
        break;
		
      default:
        console.log("You should not be here, like ever");
        break;
    }
  }
  
  function checkValue(ccolor) {
	  
	console.log("colorcode:" +ccolor);
	console.log(gameArr[correctAnswers]);
	
	if(ccolor==gameArr[correctAnswers]){
		correctAnswers++;
	    console.log(correctAnswers);
		if(correctAnswers==value){
			correctAnswers=0;
			value++;
			// Victory
			if(value==21){
				$(".buttons").css({"pointer-events": "none"});
				
				$("input").val("JEE");
			// Continue game
			}else{
				// Disable buttons
				$(".buttons").css({"pointer-events": "none"});
				setTimeout(function() {
					updateInput();
					showColors();
				}, 800);
			}
		}
	}else{ // Continue game
		// Disable buttons
		$(".buttons").css({"pointer-events": "none"});
		if(document.getElementById('Strict').checked){
			gameArr = [];
			for (i = 0; i < 20; i++) {
				gameArr.push(Math.floor(Math.random() * 4));
			}
			round = 0;
			value = 1;
			updateInput();
		}
		console.log(gameArr);
		correctAnswers=0;
		showColors();
	}
  }
  
//function letsPlay() {
  $("#green").mouseup(function green() {
	greenButton();
	checkValue(0);
  });
  

  $("#red").mouseup(function red() {
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
      $("#red").css({
        "background-color": "rgba(255,0,0,0.3)",
        "background": "-webkit-linear-gradient(45deg,rgba(255,0,0,0),rgba(255,0,0,0.3))",
        "background": "-o-linear-gradient(45deg,rgba(255,0,0,0),rgba(255,0,0,0.3))",
        "background": "-moz-linear-gradient(45deg,rgba(255,0,0,0),rgba(255,0,0,0.3))",
        "background": "linear-gradient(45deg, rgba(255,0,0,0), rgba(255,0,0,0.3))"
      });
	sound1.pause();
    }, duration);
	
	checkValue(1);
  });
  
   

  $("#yellow").mouseup(function yellow() {
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
      $("#yellow").css({
        "background-color": "rgba(255,255,0,0.3)",
        "background": "-webkit-linear-gradient(-135deg,rgba(255,0,0,0),rgba(255,255,0,0.3))",
        "background": "-o-linear-gradient(-135deg,rgba(255,0,0,0),rgba(255,255,0,0.3))",
        "background": "-moz-linear-gradient(-135deg,rgba(255,0,0,0),rgba(255,255,0,0.3))",
        "background": "linear-gradient(-135deg, rgba(255,0,0,0), rgba(255,255,0,0.3))"
		});
		sound2.pause();
    }, duration);
	
	 checkValue(2);
  });
  
 

  $("#blue").mouseup(function blue() {
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
      $("#blue").css({
        "background-color": "rgba(0,0,255,0.3)",
        "background": "-webkit-linear-gradient(135deg,rgba(255,0,0,0),rgba(0,0,255,0.3))",
        "background": "-o-linear-gradient(135deg,rgba(255,0,0,0),rgba(0,0,255,0.3))",
        "background": "-moz-linear-gradient(135deg,rgba(255,0,0,0),rgba(0,0,255,0.3))",
        "background": "linear-gradient(135deg, rgba(255,0,0,0), rgba(0,0,255,0.3))"
      });
	  sound3.pause();
    }, duration);
	
	checkValue(3);
  });
  
//}; // letsPlay
  
  function updateInput() {
    if (value.toString().length == 1) {
      valueD = "0" + value.toString();
      $("input").val(valueD);
    } else $("input").val(value);
  }
  
  function greenButton() {
  //console.log("Green");
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
          $("#green").css({
            "background-color": "rgba(0,255,0,0.3)",
            "background": "-webkit-linear-gradient(-45deg,rgba(255,0,0,0),rgba(0,255,0,0.3))",
            "background": "-o-linear-gradient(-45deg,rgba(255,0,0,0),rgba(0,255,0,0.3))",
            "background": "-moz-linear-gradient(-45deg,rgba(255,0,0,0),rgba(0,255,0,0.3))",
            "background": "linear-gradient(-45deg, rgba(255,0,0,0), rgba(0,255,0,0.3))"
          });
		  sound0.pause();
        }, duration);
  }  
  
   function redButton() {
	   
   }
   
    function yellowButton() {
		
	}
	
	function blueButton(){
		
	}
	
});