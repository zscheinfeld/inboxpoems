function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
}
var timearray = []
var datearray = []
var colheight; 
var cols; 



$.getJSON("words.json", function(phrase) {

    document.getElementById("button").onclick=async ()=>{
        // // await promiseExample();
        await Tone.start()
        console.log('audio is ready')
        
    };

//     //create a synth and connect it to the main output (your speakers)
// const synth = new Tone.Synth().toDestination();

// //play a middle 'C' for the duration of an 8th note
// synth.triggerAttackRelease("C4", "8n");

    

    

    // console.log(phrase[0].verb[2])
    var verbs = ""
    var nouns =""
    var sens = ""
    
    

    for (x=0;x<phrase[0].verb.length;x++){
        if(x ==0){
            verbs = verbs + phrase[0].verb[x]
        }

        else{
            verbs = verbs + " | " + phrase[0].verb[x]
        } 
    }
    for (x=0;x<phrase[0].noun.length;x++){
        if(x ==0){
            nouns = nouns + phrase[0].noun[x]
        }

        else{
            nouns = nouns + " | " + phrase[0].noun[x]
        } 
    
    }

    for (x=0;x<phrase[0].noun.length;x++){
        for (x=0;x<phrase[0].noun.length;x++){
            if(x ==0){
                nouns = nouns + phrase[0].noun[x]
            }
    
            else{
                nouns = nouns + " | " + phrase[0].noun[x]
            } 
        
        }   
    }

    for(x=0;x<phrase[0].times.length;x++){
        timearray.push(phrase[0].times[x])
    }

    for(x=0;x<phrase[0].dates.length;x++){
        datearray.push(phrase[0].dates[x])
    }

    let haiku = {
        start: "$N $V",
        N: `${nouns}`,
        V: `${verbs}`,
      }
    rg = RiTa.grammar(haiku);

    // setTimeout($(".grid-container").append(rg.expand()), 500)
    // cols = $(window).height()/50
    // console.log(cols);

});

var counter = 0;

//create a synth and connect it to the main output (your speakers)

//play a middle 'C' for the duration of an 8th note
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




    $( document ).ready(function() {
        $(".start").click(function(){
            console.log("click")
            var countswitch = 1;
            var scalecounter = 0; 
            var notearraycounter = 0;
            var notearray = Tone.Frequency("D4").harmonize([0, 2, 5, 7, 9, 12]);
            var intervalID;
            // Function to call repeatedly 
            function addText(){
                
                scalecounter = scalecounter + 1;
                if (scalecounter == 8){
                    scalecounter = 0;
                    if (notearraycounter == 3){
                        notearraycounter = 0
                    }
                    else{
                        notearraycounter = notearraycounter + 1
                    }
                }  
                counter = counter + 1;
                console.log(counter)
                if (counter > 63){
                    $(".grid-container").empty();
                    counter = 0
                    stop();
                    countswitch = countswitch * -1 
                    if (countswitch == -1){
                        start(1000);
                    }
                    else{
                        start(50);
                    }
                    
                }
                var num = randomNumber(0,timearray.length);
                var num2 = randomNumber(0,datearray.length);
                $(".grid-container").append(`<div class ="red" id="item${counter}">${rg.expand()}</div>`)
                $(".time").html(timearray[num])
                $(".date").html(datearray[num2])
                // synth.triggerAttackRelease(`${notearraycounter[notearraycounter]}`, "8n");
                synth.triggerAttackRelease(notearray[randomNumber(0,notearray.length)], "2n");
            
                setTimeout(() => {
                    if (countswitch == -1){
                        $(`#item${counter}`).removeClass("red")
                        $(`#item${counter}`).addClass("grid-items")  
                    }
                  }, 930)   
            }
            
            // Function to start setInterval call
            function start(time){
                intervalID = setInterval(addText, time);
            }

            start(50);
        
            // Function to stop setInterval call
            function stop(){
                clearInterval(intervalID);
            }
        
             


            })
     
    });



