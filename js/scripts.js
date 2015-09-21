var callback = function(){
	$('.item-skills').each(function(){
		newWidth = $(this).parent().width() * $(this).data('percent');
		$(this).width(0);
    $(this).animate({
        width: newWidth,
    }, 1000);
	});
	$('.icons-red').each(function(){
		height = $(this).height();
    $(this).animate({
        height: 14,
    }, 2000);
	});


    $("#intro1").typed({
        strings: ["Full Stack Web Developer.", "JavaScript fanboy.","NodeJS nerd.", "AngularJS expert.", "amature photographer.", "Ankit."],
        typeSpeed: 30,
        callback: function(){
            lift();
        }
    });
    
    function lift(){
        // $(".head-text").addClass("lift-text");
    }
};
$(document).ready(callback);

var resize;
window.onresize = function() {
	clearTimeout(resize);
	resize = setTimeout(function(){
		callback();
	}, 100);
};