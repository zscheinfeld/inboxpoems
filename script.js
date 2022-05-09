var xwordpos = []
var ywordpos = []
var clickindex = 0;
var colorarray = ["#3B7AF5", "#FFC01E", "#E62B1E"]
var colorcounter = 1;

function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
}

$.getJSON("words.json", function(phrase) {

document.getElementById("button").onclick=async ()=>{
        await Tone.start()
        console.log('audio is ready')
};

const synth = new Tone.PolySynth({
    "volume": -8,
    "detune": 0,
    "portamento": 0,
    "envelope": {
        "attack": 0.05,
        "attackCurve": "linear",
        "decay": 0.3,
        "decayCurve": "exponential",
        "release": 0.8,
        "releaseCurve": "exponential",
        "sustain": 0.4
    },
    "filter": {
        "Q": 1,
        "detune": 0,
        "frequency": 0,
        "gain": 0,
        "rolloff": -12,
        "type": "lowpass"
    },
    "filterEnvelope": {
        "attack": 0.001,
        "attackCurve": "linear",
        "decay": 0.7,
        "decayCurve": "exponential",
        "release": 0.8,
        "releaseCurve": "exponential",
        "sustain": 0.1,
        "baseFrequency": 300,
        "exponent": 2,
        "octaves": 4
    },
    "oscillator": {
        "detune": 0,
        "frequency": 440,
        "partialCount": 8,
        "partials": [
            1.2732395447351628,
            0,
            0.4244131815783876,
            0,
            0.25464790894703254,
            0,
            0.18189136353359467,
            0
        ],
        "phase": 0,
        "type": "square8"
}

}).toDestination();


    for (x=0;x<phrase[0].verb.length;x++){
        xwordpos.push(randomNumber(0,$( window ).width()))
        ywordpos.push(randomNumber(30,$( window ).height()))
        console.log(xwordpos[x], ywordpos[x])
    }

    for (x=0;x<phrase[0].verb.length;x++){

        $(".grid-container").append(
            `<div class="word" style="position: absolute; top: ${ywordpos[x]}px;left: ${xwordpos[x]}px; animation-duration: ${randomNumber(10,20)}s;">
            ${phrase[0].verb[x]}
            </div>`)
        
    }

    // $(".word").draggable()

    $("#circle1").click(function(){
        colorcounter =  1
    })

    $("#circle2").click(function(){
        colorcounter =  2
    })

    $("#circle3").click(function(){
        colorcounter =  3
    })

    var chordcount = 0;

    var hovercount = 1

    $("#camera").hover(function(){
        if (hovercount == 1){
            $(this).attr("src","img/4.png");
            hovercount=-1
        }
        else{
            $(this).attr("src","img/3.png");
            hovercount= 1
        }
        
    })

    $(".word").click(function(){
        let chord = Tone.Frequency("G4").harmonize([0,2,4,5,7,9,11,12]);
        clickindex = clickindex + 1
        if ($(this).hasClass("on")){
            $(this).removeClass("on")
            $(this).css({
                'z-index': `${clickindex}`,
                "background-color": "white",
                "color":"black",
                "animation-duration": `${randomNumber(10,20)}s`,
                "animation-play-state": "running"
            });
        }

        else{
            if (chordcount == 6){
                chordcount = 0
            }
            else{
                chordcount = chordcount + 1
            }
            console.log(chord)
            synth.triggerAttackRelease(chord[randomNumber(0,7)], "2n");
            $(this).addClass("on")
            if (colorcounter == 1){
                $(this).css({
                    'z-index': `${clickindex}`,
                    "background-color": `${colorarray[0]}`,
                    "color":"white",
                    "animation-play-state": "paused"
                });
            }

            if (colorcounter == 2){
                $(this).css({
                    'z-index': `${clickindex}`,
                    "background-color": `${colorarray[1]}`,
                    "color":"white",
                    "animation-play-state": "paused"
                });
            }

            if (colorcounter == 3){
                $(this).css({
                    'z-index': `${clickindex}`,
                    "background-color": `${colorarray[2]}`,
                    "color":"white",
                    "animation-play-state": "paused"
                });
            }     

        }   
    })

    $(".word").mousedown(function(){
        clickindex = clickindex + 1
        $(this).css(
            'z-index', `${clickindex}`,
            "background-color", "#ffe",
            );
      
    })

    

    $("#button").click(function(){
    
        $(".word").each(function(){
            if ($(this).hasClass("on") == false){
                $(this).remove()
            }
        });
    });

    setUpDownloadPageAsImage();

    function setUpDownloadPageAsImage() {
    document.getElementById("camera").addEventListener("click", function() {
        html2canvas(document.body).then(function(canvas) {
        console.log(canvas);
        simulateDownloadImageClick(canvas.toDataURL(), 'wondering.png');
        });
    });
    }

    function simulateDownloadImageClick(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download !== 'string') {
        window.open(uri);
    } else {
        link.href = uri;
        link.download = filename;
        accountForFirefox(clickLink, link);
    }
    }

    function clickLink(link) {
    link.click();
    }

    function accountForFirefox(click) { // wrapper function
    let link = arguments[1];
    document.body.appendChild(link);
    click(link);
    document.body.removeChild(link);
    }
    

});



