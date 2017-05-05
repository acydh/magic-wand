/* CREDITS: http://acydh.net */

var color = "#7CFC00";
var squaresN = 10;
var x = 0;
var y = 0;
var newX = 0;
var newY = 0;
var count = 0;
var sproutCurve = 70;
var sproutMulti = 30;
var sproutN = 10;
var block_sink = false;

$(document).ready(function() {
	function create_div(yPos, xPos) {
		var d = document.createElement('div');
		$(d).addClass("bigStar");
		var hLine = document.createElement('div');
		$(hLine).addClass("h");
		var vLine = document.createElement('div');
		$(vLine).addClass("v");
		$(d).append(hLine);
		$(d).append(vLine);
		$(d).offset({top:yPos,left:xPos});
		return $(d)
	}

	function animate_sprout(obj) {
		$(obj).animate({top: "-=" + (sproutCurve + Math.random() * sproutMulti) +"px", left: "-=" + (sproutCurve + Math.random() * sproutMulti) +"px"}, 200, "linear", function() {
			$(this).css("clip", "rect(1px, 4px, 4px, 1px)");
		});
		
		$(obj).animate({top: "-=" + (sproutCurve + Math.random() * sproutMulti) +"px", left: "-=" + (sproutCurve + Math.random() * sproutMulti) +"px"}, 200, "linear", function() {
			$(this).css("clip", "rect(2px, 3px, 3px, 2px)");
		});
		
		$(obj).animate({top: "-=" + (sproutCurve + Math.random() * sproutMulti) +"px", left: "-=" + (sproutCurve + Math.random() * sproutMulti) +"px"}, 200, "linear", function() {
			$(this).remove();
		});
	}


	function animate_shot(obj) {
		$(obj).animate({top: "+=" + (50 + (Math.random() * 10))  + "px", left: "-=" + (20 + (Math.random() * 10))  + "px"}, 500, "linear", function() {
			$(this).css("clip", "rect(1px, 4px, 4px, 1px)");
		});
			
		$(obj).animate({top: "+=50px", left: "-=20px"}, 500, "linear", function() {
			$(this).css("clip", "rect(2px, 3px, 3px, 2px)");
		});
			
		$(obj).animate({top: "+=50px", left: "-=20px"}, 500, "linear", function() {
			$(this).remove();
		});
	}

	function one_shot() {
		var shotTimes = Math.floor(Math.random()* 30 + 1);
		for (var i = 0; i < shotTimes; i++) {
			div = create_div(newY-5, newX-5);
			$("body").append($(div));
			animate_shot($(div));
		}
		setTimeout(one_shot,3000);
	}

	function square_move(obj) {
		x = newX;
		y = newY;
		animate_shot(obj);
	}

	$(document).mousemove(function(e) {
	    newX = e.pageX;
	    newY = e.pageY;
	    
	    if ((Math.abs(newX - x) > 50 || Math.abs(newY - y) > 50) && !block_sink) {
	    	div = create_div(newY-6, newX);
	    	$("body").append($(div));
	    	square_move($(div));
	    }
	});

	$(document).click(function(e) {
	    newX = e.pageX;
	    newY = e.pageY;
	    var j = 0;
	    block_sink = true;
	    function shot_loop() {
	    	div = create_div(newY-5, newX-5);
	    	$("body").append($(div));
	    	animate_sprout($(div));
	    	j++;
	    	if (j < sproutN) setTimeout(shot_loop,50);
	    }
	    setTimeout(function() {
	    	block_sink = false;
	    },1000);
	    
	    shot_loop();
	});
	
	one_shot();
});

/* CREDITS: http://acydh.net */


