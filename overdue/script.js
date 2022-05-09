var chord;
var synth;
var wordsarray = ["return", "by", "Wednesday", "April", "21", "you", "may", "lose", "your", "ability", "to", "checkout", "items"]
var currentword = wordsarray[0]
var wordcount = 0;

function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
}

function preload() {
    document.getElementById("button").onclick=async ()=>{
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
    this.music = 0;
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
        textSize(16);
        text(string, pos.x, pos.y); 
      }
    } 
  }
  
  move(){
      if (this.music > 0){
        this.music = this.music- 1;
      }
      
      var v = createVector(this.x, this.y);
      this.history.push(v);
    
    
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
      this.music = 4;
      synth.triggerAttackRelease(chord[randomNumber(0,7)], 5)
      } 
    
    else if (this.y - (25) < 0){
      this.tailcount = this.tailcount * 2;
      this.yspeed= -this.yspeed 
      this.tracker = this.tracker + 1 
      this.y = 25
      this.music = 4;
      synth.triggerAttackRelease(chord[randomNumber(0,7)], 5)
      }

      if (this.x> windowWidth - 100) {
      this.tailcount = this.tailcount * 2;
      this.xspeed= -this.xspeed
      this.tracker = this.tracker + 1
      this.x = windowWidth - 100
      this.music = 4;
      synth.triggerAttackRelease(chord[randomNumber(0,7)], 5)
      } 
    
      else if(this.x -100 < 0){
      this.tailcount = this.tailcount * 2;
      this.xspeed= -this.xspeed
      this.tracker = this.tracker + 1
      this.music = 4;
      synth.triggerAttackRelease(chord[randomNumber(0,7)], 5)
                }

    
    
    this.x = this.x + (1 * this.xspeed)
    this.y= this.y + (1 * this.yspeed) 
    return(this.music);
    
  }
  
   
  
}

function setup() {
 
  var mycanvas = createCanvas(windowWidth, windowHeight);
  mycanvas.position(0, 0);
  mycanvas.parent("canv");
  word1 = new Word(150,50, 100, 25, .5,.5);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

function draw() {
  currentword = wordsarray[wordcount]
  rectMode(RADIUS);
  background(255, 247, 0);
  rect(windowWidth/2, windowHeight/2, 370, 50)
        textAlign(CENTER, CENTER);
        textSize(64);
        text("you have overdue items", windowWidth/2, windowHeight/2); 
  var word1return = word1.move();
  console.log(word1.move())

  if(word1.move()>0){
    if(wordcount< wordsarray.length-1){
      wordcount = wordcount + 1
    }
    else{
      wordcount = 0
    }
    // synth.triggerAttackRelease(chord[randomNumber(0,7)], "1n")

  }
  word1.move();
  word1.show(currentword); 
  console.log(wordsarray)

}


$( document ).ready(function() {
    

});