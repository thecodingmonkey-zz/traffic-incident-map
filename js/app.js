
var main_chart_svg = d3.select("#map")
        .append("svg")
        .attr({
            "width":800,
            "height":500
        });

d3.xml("../assets/oahu.svg", function(error, documentFragment) {
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
    .range(["green", "yellow", "red"]);

//    console.log(data);

  if (!data) {
    data = [1,0,5,0,8,0,1,0,10,0,0,1];
  }
  
//    console.log(data);

  d3.selectAll('path').data(data)
    .attr('fill', function(d) {return color(d);} )

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
  console.log(dateTxt.toString() );
  $('#dateText').text(dateTxt.toString() );

  var array = incidents.update({
    time: date + 10*3600 + parseInt(time)
  });
  updateColors(array); 

}

$('.slider').on("oninput", updateSliders);