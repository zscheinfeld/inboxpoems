
$.getJSON("https://api.openweathermap.org/data/2.5/weather?q=Providence&units=imperial&appid=4dcc0880d40031e9df59fc0eeb8cfa32", function(weatherdata) {
   console.log(weatherdata.main.temp);
   $(".temp").text(`The temperature is ${weatherdata.main.temp}`)
   $("body").css("background-color", `rgb(0, 0, ${weatherdata.main.temp})`);


});

 // console.log(weatherdata.main.temp)

    // $(".temp").text(`The temperature is currently ${weatherdata.main.temp} degrees.`)

  

