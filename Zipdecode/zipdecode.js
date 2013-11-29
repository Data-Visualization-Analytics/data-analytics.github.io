var width = 960,
    height = 400;

var projection = d3.geo.albersUsa()
    .scale(800)
    .translate([width / 2, (height / 2)+20]);

d3.tsv("zipcodes.tsv", function(error, zipcodes) {
  var zip0;

  // Compute projected locations of each zipcode.
  zipcodes.forEach(function(d) {
    var p = projection([+d.lon, +d.lat]);
    if (p) d.x = Math.round(p[0]), d.y = Math.round(p[1]);
  });

  var input = d3.select("input")
      .on("cut", function() { setTimeout(change, 10); })
      .on("paste", function() { setTimeout(change, 10); })
      .on("change", change)
      .on("keyup", change);

  change();

  function change() {
    var zip1 = input.property("value");
    if (zip0 === zip1) return;
    zip0 = zip1;

    // Select old canvases to remove after fade.
    var canvas0 = d3.selectAll("canvas");

    // Add a new canvas, initially with opacity 0, to show the new zipcodes.
    var canvas1 = d3.select("#chart").insert("canvas", "input")
        .attr("width", width)
        .attr("height", height)
        .style("opacity", 0);
    
    var context = canvas1.node().getContext("2d");
    context.fillStyle = "None";
    context.fillRect(0, 0, width, height);

    // Render the inactive zipcodes.
    context.globalAlpha = .4;
    context.fillStyle = zip1 ? "#aaa" : (zip1 = "*", "#000");
    zipcodes.forEach(function(d) {
      for (var i = 0, n = zip1.length; i < n; ++i) {
        if (d.zip[i] !== zip1[i]) {
          context.fillRect(d.x, d.y, 1, 1);
          return;
        }
      }
    });

    // Render the active zipcodes.
    context.globalAlpha = 1;
    context.fillStyle = "#f00";
    zipcodes.forEach(function(d) {
      for (var i = 0, n = zip1.length; i < n; ++i) {
        if (d.zip[i] !== zip1[i]) {
          return;
        }
      }
      context.fillRect(d.x, d.y, 1, 1);
    });

    // Use a transition to fade-in the new canvas.
    // When this transition finishes, remove the old canvases.
    canvas1.transition()
        .duration(350)
        .style("opacity", 1)
        .each("end", function() { canvas0.remove(); });
  }
});