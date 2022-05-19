var chord;
var synth;
var wordsarray = ["you", "may", "lose", "your", "ability", "to", "checkout", "items"]
var currentword = wordsarray[0]
var wordcount = 0;
var cyclecounter = 0;

function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
}

function preload() {
  myFont = loadFont('/inboxpoems/type.otf');
  document.getElementById("mute").onclick=async ()=>{
    await Tone.start()
    console.log('audio is ready')
};

synth = new Tone.PolySynth({
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

chord = Tone.Frequency("C3").harmonize([0,2,4,5,7,9,11,12]);
  }

var word2;
var word1;
var rectcount = 0
var words = [];
// var wordsarray = [];

class Word {
  
  constructor(xpos, ypos, height, width, xspeed, yspeed){
    this.x = xpos
    this.y = ypos
    this.height = height
    this.width = width
    this.xspeed = xspeed
    this.yspeed = yspeed
    this.tracker = 0;
    this.count = 0;
    this.history=[];
    this.increment = 10;
    this.tailcount = 10;
    this.taillength = 10;
    this.counter = 0;
    this.bouncecounter=0;
  }
  
   show(string){
    // textAlign(CENTER, CENTER);
    // textSize(16);
    // text(this.txt, this.x, this.y); 
    // strokeWeight(2);
    for (var i = 0;  i< this.history.length; i++){
      if(i % this.taillength == 0){
        var pos = this.history[i];
        rect(pos.x, pos.y, 100, 25)
        textAlign(CENTER, CENTER);
        textSize(18);
        text(string, pos.x, pos.y-2); 
      }
    } 
  }

  clear (){
    this.tracker = 0;
    this.count = 0;
    this.history=[];
    this.increment = 10;
    this.tailcount = 10;
    this.taillength = 10;
    this.counter = 0;
    this.bouncecounter=0;
  }
  
  move(){

      if (this.counter%1 == 0){
        var v = createVector(this.x, this.y);
        this.history.push(v);
      }
     

      this.counter = this.counter + 1
      
    
    
    if (this.history.length> this.tailcount){
      this.history.splice(0,1)
    }
    
    if (this.history.length> 1500){
      this.tailcount = 1500
    }
   
    
      if (this.y> windowHeight - 25){
      this.tailcount = this.tailcount * 2;
      this.yspeed= -this.yspeed 
      this.tracker = this.tracker + 1
      this.y = windowHeight - 25
      this.bouncecounter = this.bouncecounter + 1
      synth.triggerAttackRelease(chord[randomNumber(0,7)], 5)
      } 
    
    else if (this.y - (25) < 0){
      this.tailcount = this.tailcount * 2;
      this.yspeed= -this.yspeed 
      this.tracker = this.tracker + 1 
      this.y = 25
      this.bouncecounter = this.bouncecounter + 1
      synth.triggerAttackRelease(chord[randomNumber(0,7)], 5)
      }

      if (this.x> windowWidth - 100) {
      this.tailcount = this.tailcount * 2;
      this.xspeed= -this.xspeed
      this.tracker = this.tracker + 1
      this.x = windowWidth - 100
      this.bouncecounter = this.bouncecounter + 1
      synth.triggerAttackRelease(chord[randomNumber(0,7)], 5)
      } 
    
      else if(this.x -100 < 0){
      this.tailcount = this.tailcount * 2;
      this.xspeed= -this.xspeed
      this.tracker = this.tracker + 1
      this.bouncecounter = this.bouncecounter + 1
      synth.triggerAttackRelease(chord[randomNumber(0,7)], 5)
                }

    this.x = this.x + (1 * this.xspeed)
    this.y= this.y + (1 * this.yspeed) 
    
    return(this.bouncecounter);
  }
  
  
}
function setup() {
  var mycanvas = createCanvas(windowWidth, windowHeight);
  textFont(myFont);
  mycanvas.position(0, 0);
  mycanvas.parent("canv");
  word1 = new Word(150,50, 100, 25, 1,1);
  word2 = new Word(350,350, 100, 25, -1,1);
  word3 = new Word(650,650, 100, 25, -1,-1);
  word4 = new Word(950,50, 100, 25, 1, 1);
  word5 = new Word(650,650, 100, 25, -1, 1);
  word6 = new Word(950,50, 100, 25, -1,-1);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

function draw() {
  
  rectMode(RADIUS);
  background(255,73,139);
  rect(windowWidth/2, windowHeight/2, 370, 50)
        textAlign(CENTER, CENTER);
        textSize(64);
        text("you have overdue items", windowWidth/2, (windowHeight/2) - 10); 
  // 
  
  // var word3return = word3.move();
  // var word4return = word4.move();
  // console.log(word1.move())

  // if(word1.move()>0){
  //   if(wordcount< wordsarray.length-1){
  //     wordcount = wordcount + 1
  //   }
  //   else{
  //     wordcount = 0
  //   }
  //   // synth.triggerAttackRelease(chord[randomNumber(0,7)], "1n")
  // }
if (cyclecounter ==0){
  var word1return = word1.move();
  var wordcount1 = word1return % wordsarray.length
  word1.move();
  word1.show(wordsarray[wordcount1]); 
  if (word1return> 8){
    var word2return = word2.move();
    var wordcount2 = word2return % wordsarray.length
    word2.move();
    word2.show(wordsarray[wordcount2]); 
    if (word2return> 8){
      var word3return = word3.move();
      var wordcount3 = word3return % wordsarray.length
      word3.move();
      word3.show(wordsarray[wordcount3]); 
      if (word3return> 8){
        var word4return = word4.move();
        var wordcount4 = word4return % wordsarray.length
        word4.move();
        word4.show(wordsarray[wordcount4]); 
        if (word4return> 8){
          var word5return = word5.move();
          var wordcount5 = word5return % wordsarray.length
          word5.move();
          word5.show(wordsarray[wordcount5]);
          if (word5return> 8){
            cyclecounter = cyclecounter + 1;
          }
        }
      }
    }
  }
}
else{

  word1.clear();
  word2.clear();
  word3.clear();
  word4.clear();
  word5.clear();
  cyclecounter = 0;

}

  


  
  // word3.move();
  // word3.show("word2"); 
  // word4.move();
  // word4.show("word2"); 
  // console.log(wordsarray)

}


$( document ).ready(function() {
  var mutecounter = 0
  $("#mute").click(function(){
      // $(".menuitem").attr("src", "icon/purple/archive.png")
      if (mutecounter%2 == 0){
          $("#purpleicon").attr("src", "/inboxpoems/icon/pink/mute.png");
          synth.volume.value = -8;
      }

      else {
          $("#purpleicon").attr("src", "/inboxpoems/icon/pink/sound.png");
          // vol.mute = false
          synth.volume.value = -100;
      }
      mutecounter = mutecounter + 1
  })

  $("#trash").click(function(){
   cyclecounter = 1;
})

$("#archive").click(function(){
  saveCanvas('Overdue', 'jpg');
})

});