var xwordpos = []
var ywordpos = []
var clickindex = 0;
var colorarray = ["#3B7AF5", "#FFC01E", "#E62B1E"]
var colorcounter = 1;

function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
}

// create synth
const vol = new Tone.Volume(-8).toDestination();
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
        "baseFrequency": 100,
        "exponent": 2,
        "octaves": 4
    },
    "oscillator": {
        "detune": 0,
        "frequency": 000,
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
        "type": "sine"
}
}).toDestination();

var notearray = Tone.Frequency("B2").harmonize([0, 2, 5, 7, 9, 12]);



$.getJSON("words.json", function(phrase) {

//     document.getElementById("mute").onclick=async ()=>{
//         await Tone.start()
//         console.log('audio is ready')
// };
    

var windowx= $(window).width()
var windowy =  $( window ).height()

    for (x=0;x<phrase[0].verb.length;x++){
        xwordpos.push(0)
        ywordpos.push(0)
    }

    var possleft = 100
    var wordcounter = 0
    var animationcounter = 0
    var animationswitch = 0
    var tonecounter = 0;
    var tonecounter2 = 0;
    var lengtharray= [ "4n", "2n", "8n"]

    setInterval(() => {
        
        tonecounter = tonecounter + 1;

        if (animationcounter == 296){
            if(animationswitch%2==1){
                console.log("firstswitch")
                wordcounter = 0
                animationcounter = 0
            
                $(`.grid-container`).children().css({
                    "animation": "none",
                })
                animationswitch = animationswitch + 1
            }

            else{
                wordcounter = 0
                animationcounter = 0
                console.log("secondswitch")
                $(`.grid-container`).children().css({
                    // "animation-play-state": "pause",
                })
                animationswitch = animationswitch + 1
            }
            
        }

        if(animationswitch%2 == 0){
            if (tonecounter%randomNumber(1,3) == 0 ){
                $(`.grid-container :nth-child(${wordcounter})`).css({
                    "animation-play-state": "play",
                    "animation-name": "glide2",
                    "animation-duration": "5s",
                    "animation-iteration-count": "1",
                    "animation-fill-mode": "forwards",
                    "animation-direction": "normal",
                })
            wordcounter = wordcounter + 1
            animationcounter = animationcounter + 1 
            synth.triggerAttackRelease(notearray[randomNumber(0,notearray.length-1)], lengtharray[randomNumber(0,lengtharray.length-1)]);
        
            
            }
        }

        if(animationswitch%2 == 1){
            if (tonecounter%randomNumber(1,3) == 0 ){
                $(`.grid-container :nth-child(${wordcounter})`).css({
                    "animation-play-state": "play",
                    "animation-direction": "normal",
                    "animation-name": "glide3",
                    "animation-duration": "5s",
                    "animation-iteration-count": "1",
                    "animation-fill-mode": "forwards",
                })
            wordcounter = wordcounter + 1
            animationcounter = animationcounter + 1 
            synth.triggerAttackRelease(notearray[randomNumber(0,notearray.length-1)], lengtharray[randomNumber(0,lengtharray.length-1)]);
            }
        }

        // if(animationswitch%3 == 0){
        //     $(`.grid-container`).children().css({
        //         "animation": "none",
        //     })
        //     animationswitch = 0;
        // }


        
        
        
      }, "200")


   
   

});




$(document).ready(function(){
    // $(".menuitem").attr("src", "icon/purple/archive.png")
    $(".menuitem").click(function(){
        // $(".menuitem").attr("src", "icon/purple/archive.png")
        console.log("hover")
    })

    $(".trashitem").click(function(){
        // $(".menuitem").attr("src", "icon/purple/archive.png")
        console.log("hover")
        $(".grid-container").empty();
    })


    var mutecounter = 0
    $("#mute").click(function(){
        // $(".menuitem").attr("src", "icon/purple/archive.png")
        if (mutecounter%2 == 0){
            $("#purpleicon").attr("src", "icon/yellow/mute.png");
            synth.volume.value = -8;
        }

        else {
            $("#purpleicon").attr("src", "icon/yellow/sound.png");
            // vol.mute = false
            synth.volume.value = -100;
        }
        
        mutecounter = mutecounter + 1
    })

    


    setUpDownloadPageAsImage();

    function setUpDownloadPageAsImage() {
    document.getElementById("archive").addEventListener("click", function() {
        html2canvas(document.body).then(function(canvas) {
        simulateDownloadImageClick(canvas.toDataURL(), 'goodmorning.png');
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


})


// camera function



