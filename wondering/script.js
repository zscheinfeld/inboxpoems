var xwordpos = []
var ywordpos = []
var clickindex = 0;
var colorarray = ["#3B7AF5", "#FFC01E", "#E62B1E"]
var colorcounter = 1;

function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
}

$.getJSON("words.json", function(phrase) {

document.getElementById("mute").onclick=async ()=>{
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

var windowx= $(window).width()
var windowy =  $( window ).height()

    for (x=0;x<phrase[0].verb.length;x++){
        xwordpos.push(randomNumber((windowx/2) - 200, (windowx/2) + 200))
        ywordpos.push(randomNumber((windowy/2) - 200, (windowy/2) + 200))
    }

    for (x=0;x<phrase[0].question.length;x++){
        if (x%2 == 0){
            $(".grid-container").append(
                `<div class="word question new" style="position: absolute; top: ${ywordpos[x]}px;left: ${xwordpos[x]}px; animation-name: glide; animation-duration: ${randomNumber(10,20)}s;">
                ${phrase[0].question[x]}
                </div>`)
        }

        else{
            $(".grid-container").append(
                `<div class="word question new" style="position: absolute; top: ${ywordpos[x]}px;left: ${xwordpos[x]}px; animation-name: glide2; animation-duration: ${randomNumber(10,20)}s;">
                ${phrase[0].question[x]}
                </div>`)
        }
    
    }

    $("body").on("click", ".question", function(){
        $(".grid-container").children().removeClass("new")
        var arraylength = ywordpos.length
        for (x= arraylength; x< arraylength + phrase[0].pronoun.length;x++){
            xwordpos.push(randomNumber((windowx/2) - 400, (windowx/2) + 400))
            ywordpos.push(randomNumber((windowy/2) - 400, (windowy/2) + 400))
        }
    
        for (x= arraylength; x< arraylength + phrase[0].pronoun.length;x++){
            var wordspot = x - arraylength

            if(x%2==0){
                $(".grid-container").append(
                    `<div class="word new pronoun" style="position: absolute; top: ${ywordpos[x]}px;left: ${xwordpos[x]}px; animation-name: glide; animation-duration: ${randomNumber(10,20)}s;">
                    ${phrase[0].pronoun[wordspot]}
                    </div>`)
            }

            else{
                $(".grid-container").append(
                    `<div class="word new pronoun" style="position: absolute; top: ${ywordpos[x]}px;left: ${xwordpos[x]}px; animation-name: glide2; animation-duration: ${randomNumber(10,20)}s;">
                    ${phrase[0].pronoun[wordspot]}
                    </div>`)
            }
            
        }
    })

    $('body').on('click', '.pronoun', function () { 
        $(".grid-container").children().removeClass("new")
        var arraylength = ywordpos.length
        for (x= arraylength; x< arraylength + phrase[0].modal.length;x++){
            xwordpos.push(randomNumber((windowx/2) - 600, (windowx/2) + 600))
            ywordpos.push(randomNumber((windowy/2) - 600, (windowy/2) + 600))
        }
    
        for (x= arraylength; x< arraylength + phrase[0].modal.length;x++){
            var wordspot = x - arraylength

            if(x%2==0){
                $(".grid-container").append(
                    `<div class="word new modal" style="position: absolute; top: ${ywordpos[x]}px;left: ${xwordpos[x]}px; animation-name: glide; animation-duration: ${randomNumber(10,20)}s;">
                    ${phrase[0].modal[wordspot]}
                    </div>`)
            }

            else{
                $(".grid-container").append(
                    `<div class="word new modal" style="position: absolute; top: ${ywordpos[x]}px;left: ${xwordpos[x]}px; animation-name: glide2; animation-duration: ${randomNumber(10,20)}s;">
                    ${phrase[0].modal[wordspot]}
                    </div>`)
            }
            
        }
    });

    $('body').on('click', '.modal', function () { 
        $(".grid-container").children().removeClass("new")
        var arraylength = ywordpos.length
        for (x= arraylength; x< arraylength + phrase[0].verb.length;x++){
            xwordpos.push(randomNumber(0, windowx))
            ywordpos.push(randomNumber(0,windowy))
        }
    
        for (x= arraylength; x< arraylength + phrase[0].verb.length;x++){
            var wordspot = x - arraylength

            if(x%2==0){
                $(".grid-container").append(
                    `<div class="word new verb" style="position: absolute; top: ${ywordpos[x]}px;left: ${xwordpos[x]}px; animation-name: glide; animation-duration: ${randomNumber(10,20)}s;">
                    ${phrase[0].verb[wordspot]}
                    </div>`)
            }

            else{
                $(".grid-container").append(
                    `<div class="word new verb" style="position: absolute; top: ${ywordpos[x]}px;left: ${xwordpos[x]}px; animation-name: glide2; animation-duration: ${randomNumber(10,20)}s;">
                    ${phrase[0].verb[wordspot]}
                    </div>`)
            }
            
        }
    });

    $('body').on('click', '.verb', function () { 
        $(".grid-container").children().removeClass("new")
        var arraylength = ywordpos.length
        for (x= arraylength; x< arraylength + phrase[0].punctuation.length;x++){
            xwordpos.push(randomNumber(0, windowx))
            ywordpos.push(randomNumber(0, windowy))
        }
    
        for (x= arraylength; x< arraylength + phrase[0].punctuation.length;x++){
            var wordspot = x - arraylength

            if(x%2==0){
                $(".grid-container").append(
                    `<div class="word new punctuation" style="position: absolute; top: ${ywordpos[x]}px;left: ${xwordpos[x]}px; animation-name: glide; animation-duration: ${randomNumber(10,20)}s;">
                    ${phrase[0].punctuation[wordspot]}
                    </div>`)
            }

            else{
                $(".grid-container").append(
                    `<div class="word new punctuation" style="position: absolute; top: ${ywordpos[x]}px;left: ${xwordpos[x]}px; animation-name: glide2; animation-duration: ${randomNumber(10,20)}s;">
                    ${phrase[0].punctuation[wordspot]}
                    </div>`)
            }
            
        }
    });

    $('body').on('click', '.punctuation', function () { 
        $(".grid-container").children().removeClass("new")
        var arraylength = ywordpos.length
        for (x= arraylength; x< arraylength + phrase[0].question.length;x++){
            xwordpos.push(randomNumber((windowx/2) - 200, (windowx/2) + 200))
            ywordpos.push(randomNumber((windowy/2) - 200, (windowy/2) + 200))
        }
    
        for (x= arraylength; x< arraylength + phrase[0].question.length;x++){
            var wordspot = x - arraylength

            if(x%2==0){
                $(".grid-container").append(
                    `<div class="word new question" style="position: absolute; top: ${ywordpos[x]}px;left: ${xwordpos[x]}px; animation-name: glide; animation-duration: ${randomNumber(10,20)}s;">
                    ${phrase[0].question[wordspot]}
                    </div>`)
            }

            else{
                $(".grid-container").append(
                    `<div class="word new question" style="position: absolute; top: ${ywordpos[x]}px;left: ${xwordpos[x]}px; animation-name: glide2; animation-duration: ${randomNumber(10,20)}s;">
                    ${phrase[0].question[wordspot]}
                    </div>`)
            }
            
        }
    });

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

    $("body").on("click", ".word", function(){
        console.log("click")
        let chord = Tone.Frequency("G4").harmonize([0,2,4,5,7,9,11,12]);
        clickindex = clickindex + 1
        if ($(this).hasClass("on")){
            $(this).removeClass("on")
            $(this).css({
                'z-index': `${clickindex}`,
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
           
            synth.triggerAttackRelease(chord[randomNumber(0,7)], "2n");
            $(this).addClass("on")
 
            $(this).css({
                'z-index': `${clickindex}`,
                "background-color": "#f10852",
                "color":"white",
                "animation-play-state": "paused"
            }); 
        }   
      });


    $(".word").mousedown(function(){
        clickindex = clickindex + 1
        $(this).css(
            'z-index', `${clickindex}`,
            "background-color", "#ffe",
            );
      
    })

    

    $("#trash").click(function(){
    
        $(".word").each(function(){
            if ($(this).hasClass("on") == false){
                $(this).remove()
            }
        });

        $(".word").css({
            "background-color":"white",
            "color":"black",

        })

    });

    setUpDownloadPageAsImage();

    function setUpDownloadPageAsImage() {
    document.getElementById("archive").addEventListener("click", function() {
        html2canvas(document.body).then(function(canvas) {
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

    var mutecounter = 0
    $("#mute").click(function(){
        // $(".menuitem").attr("src", "icon/purple/archive.png")
        if (mutecounter%2 == 0){
            $("#purpleicon").attr("src", "/icon/blue/mute.png");
            synth.volume.value = -8;
        }

        else {
            $("#purpleicon").attr("src", "/icon/blue/sound.png");
            // vol.mute = false
            synth.volume.value = -100;
        }
        
        mutecounter = mutecounter + 1
    })
    
});



