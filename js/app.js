
var main_chart_svg = d3.select("#map")
        .append("svg")
        .attr({
            "id": "oahu",
            "width":600,
            "height":600,
            "viewbox":"100 100 700 700",
            "preserveAspectRatio":"xMidYMid"

        });

d3.xml("./../assets/oahu.svg", function(error, documentFragment) {
        if (error) {console.log(error); return;}
    
        var svgNode = documentFragment
                    .getElementsByTagName("svg")[0];
        main_chart_svg.node().appendChild(svgNode);
        var innerSVG = main_chart_svg.select("svg");
        updateColors();
    });

function updateColors(data) {
  var color = d3.scale.linear()
    .domain([0, 3, 10])
    .range(["#C3C034", "#F7D510", "#F0972D"]);

  if (!data) {
    data = [1,0,5,0,8,0,1,0,10,0,0,1];
  }
  
  d3.selectAll('path').data(data)
    .attr('fill', function(d) {return color(d);} )

  var i=0;
  for(i=0; i <= 10; i++) {
    $("#legend .box"+i.toString() )
      .css('background-color', color(i) );
  }

}

window.onload = function() {
  incidents.load();

}

function updateSliders() {
  var date = $('#date').val();
  date = (date - 10 * 3600);
  date = date - (date % 86400);
//  console.log(date);
  var time = $('#time').val();

  var dateTxt = new Date ((date + 10*3600 + parseInt(time)) * 1000);
//  console.log(dateTxt.toString() );
  $('#dateText').text(dateTxt.toString().replace('GMT-1000 (HST)', '') );


  var windowSize = parseInt($('#window').val() );
  var wHours = Math.floor(windowSize/60);
  var wMin = windowSize % 60;
  $('#windowText').text( wHours.toString() + ':' + ('00' + wMin.toString() ).slice(-2)  );

  var array = incidents.update({
    time: date + 10*3600 + parseInt(time),
    window: windowSize 
  });

  updateColors(array); 

}

//updateSliders();

$('.slider').on("oninput", updateSliders);

var aspect = 1,
    chart = $("#oahu");
$(window).on("resize", function() {
    var targetWidth = chart.parent().width();
    chart.attr("width", targetWidth);
    chart.attr("height", targetWidth / aspect);
});

    var targetWidth = chart.parent().width();
    chart.attr("width", targetWidth);
    chart.attr("height", targetWidth / aspect);
