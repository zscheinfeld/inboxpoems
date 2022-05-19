let x = 1;
let y = 1;
let easing = 0.05;
// sound dependent particle system
let song;
let particles = [];
var newparticles = [];
var strcounter = 0;
var strarray = ["All", "forms", "must", "be", "submitted", "thoughtfully"]
var advb = ["urgently, quietly", "beautifully", "dilligently", "courageously" ,"tenderly", "tensely", "hopelessly", "correctly", "happily", "immediately", "instantly", "intensely", "daily", "victoriously", "smoothly", "kindly", "gracefully", "furiously", "generously", "faithfully", "eventually", "fondly", "helpfully", "repeatedly", "truthfully", "regularly", "voluntarily", "willfully", "yearly", "verbally", "suddenly", "swiftly", "openly", "kindly", "electronically", "physically", "energetically", "calmly", "always", "safely", "politelly"]
var currentstring = strarray[0]
var chord;
var synth;
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

chord = Tone.Frequency("A3").harmonize([0,2,4,5,7,9,11,12]);
  
}

function setup() {
  var mycanvas = createCanvas(windowWidth, windowHeight);
  mycanvas.position(0, 0);
  mycanvas.parent("canv");
  background(255, 0, 0);
  textFont(myFont);
  noCursor();
  
  
}

function draw() {
  currentstring =strarray[strcounter]
  rectMode(RADIUS);
  let level = 0;
  var xmiddle = windowWidth/2;
  var ymiddle = windowHeight/2;
  // purple: background-color: #A449FF; 
  background(164, 73, 255);
  fill(255);
  rect(windowWidth/2, windowHeight/2, 200, 50)
        textAlign(CENTER, CENTER);
        textSize(64);
        fill(0);
        text("end of day", windowWidth/2, (windowHeight/2) - 10); 
  let targetX = mouseX;
  let dx = targetX - x;
  x += dx * easing;
  let targetY = mouseY;
  let dy = targetY - y;
  y += dy * easing;

  for (let particle of newparticles) {
    let gravity = createVector(0, 0);
    particle.applyForce(gravity);
    particle.shownew();
    particle.update();
  }
  
  for (let i = 0; i < 1; i++) {
    particles.push(new Particle(x, y, 0, 100,200, 255, currentstring));
  }

  for (let particle of particles) {
    let gravity = createVector(0, 0);
    particle.applyForce(gravity);
    particle.update();
    particle.show();
  }


  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}

function mousePressed() {
  var adverb = advb[randomNumber(0, advb.length)]
  strarray.splice(5, 1, adverb)

  for (x=0; x<2; x++){
    var amnt = randomNumber(1,3)
    synth.triggerAttackRelease(chord[randomNumber(0,7)], amnt)
  }
  
  if(strcounter<strarray.length-1){
    strcounter = strcounter + 1
  }

  else{
    strcounter = 0
  }

  

  console.log("pressed")
  console.log(particles)
  for (let particle of particles) {
    newparticles.push(particle)
  }
  setTimeout(() => {
    newparticles.splice(0,25);
  }, "5000")

  setTimeout(() => {
    newparticles.splice(0,25);
  }, "10000")

}

setInterval(() => {

  var adverb = advb[randomNumber(0, advb.length)]
  strarray.splice(5, 1, adverb)

  for (x=0; x<2; x++){
    var amnt = randomNumber(1,3)
    synth.triggerAttackRelease(chord[randomNumber(0,7)], amnt)
  }
  
  if(strcounter<strarray.length-1){
    strcounter = strcounter + 1
  }

  else{
    strcounter = 0
  }

  

  console.log("pressed")
  console.log(particles)
  for (let particle of particles) {
    newparticles.push(particle)
  }
  setTimeout(() => {
    newparticles.splice(0,25);
  }, "5000")

  setTimeout(() => {
    newparticles.splice(0,25);
  }, "10000")
  
}, "5000")


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



$(document).ready(function(){
  var mutecounter = 0
  $("#mute").click(function(){
      // $(".menuitem").attr("src", "icon/purple/archive.png")
      if (mutecounter%2 == 0){
          $("#purpleicon").attr("src", "/inboxpoems/icon/blue/mute.png");
          synth.volume.value = -8;
      }

      else {
          $("#purpleicon").attr("src", "/inboxpoems/icon/blue/sound.png");
          // vol.mute = false
          synth.volume.value = -100;
      }
      mutecounter = mutecounter + 1
    });

    $("#trash").click(function(){
      var newparticles = [];
   })
   
   $("#archive").click(function(){
     saveCanvas('End of Day', 'jpg');
   })
});