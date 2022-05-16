var xwordpos = []
var ywordpos = []
var clickindex = 0;
var colorarray = ["#3B7AF5", "#FFC01E", "#E62B1E"]
var colorcounter = 1;

function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
}

$.getJSON("words.json", function(phrase) {


var windowx= $(window).width()
var windowy =  $( window ).height()

    for (x=0;x<phrase[0].verb.length;x++){
        xwordpos.push(0)
        ywordpos.push(0)
    }

    var possleft = 100
    var wordcounter = 0
    var animationcounter = 0
    var animationswitch = 1

    setInterval(() => {


        $(`.grid-container :nth-child(${wordcounter})`).css({
            "animation-name": "glide2",
            "animation-duration": "5s",
            "animation-iteration-count": "1",
            "animation-fill-mode": "forwards",

        })
        wordcounter = wordcounter + 1
        animationcounter = animationcounter + 1 

        if (animationcounter>296){


        }

      }, "350")
   

});



