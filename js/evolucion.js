<<<<<<< HEAD

function evolucion(){

		var $anyo= $('#anyo');
	  var $mes= $('#mes');
		var parametro = {
			anyo: $anyo.val(),
			mes: $mes.val()
		};

		$.ajax({
				type : "GET",
				url : "http://localhost:8080/evolucion",
				data: parametro,
				success : function(data) {
					console.log(data);

					// Set the dimensions of the canvas / graph
					var margin = {top: 30, right: 20, bottom: 70, left: 50},
					    width = 500 - margin.left - margin.right,
					    height = 500 - margin.top - margin.bottom;

					// Parse the date / time
					//var parseDate = d3.timeFormat("%a %d");

					// Set the ranges
					var x =d3.scale.linear().range([0, width]);
					var y = d3.scale.linear().range([height, 0]);

					var xAxis = d3.svg.axis().scale(x)
							.orient("bottom");
					var yAxis = d3.svg.axis().scale(y)
				 			.orient("left");
					//
					// // Define the line
					var priceline = d3.svg.line()
					    .x(function(d) { return x(d.dia); })
					    .y(function(d) { return y(d.total); });

					// Adds the svg canvas
					var svg = d3.select("#grafico_evolucion").append("svg")
					        .attr("width", width + margin.left + margin.right)
					        .attr("height", height + margin.top + margin.bottom)
					    		.append("g")
					        .attr("transform",
					              "translate(" + margin.left + "," + margin.top + ")");

			    // Scale the range of the data
			    x.domain(d3.extent(data, function(d) { return d.dia; }));
			    y.domain([0, d3.max(data, function(d) { return d.total; })]);

			    // Nest the entries by categoria
			    var dataNest = d3.nest()
			        .key(function(d) {return d.categoria;})
			        .entries(data);

			    // set the colour scale
			    var color =  d3.scale.category20();
			    legendSpace = 15//width/dataNest.length; // spacing for the legend

			    // Loop through each symbol / key
			    dataNest.forEach(function(d,i) {

			        svg.append("path")
			            .attr("class", "line")
			            .style("stroke", function() { // Add the colours dynamically
			                return d.color = color(d.key); })
			            .attr("id", 'tag'+d.key.replace(/\s+/g, '')) // assign an ID
			            .attr("d", priceline(d.values));

			        // Add the Legend
			        svg.append("text")
			            .attr("x", width + (margin.right/2))//(legendSpace/2)+i*legendSpace)  // space legend
			            .attr("y", (legendSpace/2)+i*legendSpace)//height + (margin.bottom/2)+ 5)
			            .attr("class", "legend")    // style the legend
			            .style("fill", function() { // Add the colours dynamically
			                return d.color = color(d.key); })
			            .on("click", function(){
			                // Determine if current line is visible
			                var active   = d.active ? false : true,
			                newOpacity = active ? 0 : 1;
			                // Hide or show the elements based on the ID
			                d3.select("#tag"+d.key.replace(/\s+/g, ''))
			                    .transition().duration(100)
			                    .style("opacity", newOpacity);
			                // Update whether or not the elements are active
			                d.active = active;
			                })
			            .text(d.key);
			    });

				  // Add the X Axis
				  svg.append("g")
				      .attr("class", "axis")
							.attr("transform", "translate(0," + height + ")")
				      .call(xAxis);

				  // Add the Y Axis
				  svg.append("g")
				      .attr("class", "axis")
				      .call(yAxis);
				},
				error : function(data) {
					console.log(data);

				}
		});
}


$(document).ready(function(){
  evolucion()

  $('#anyo').on('change', function() {
    evolucion()
  })
  $('#mes').on('change', function() {
    evolucion()
  })
=======
$(document).ready(function(){
	$('#consultar').on('click', function() {
		var $anyo= $('#anyo');
		var $mes= $('#mes');
			anyo= $anyo.val();
			mes= $mes.val();
	var chart = c3.generate({
    bindto: '#chart',
		size: {height: 500},
		padding: {
        top: 40,
        right:200,
        bottom: 40,
        left: 250,
    },
    data: {
			url : 'http://localhost:8080/evolucion?anyo='+anyo+'&mes='+mes,
			mimeType: 'json'
		},

		point: {r: 2},
		legend: {position: 'right',
		item: {
							 onclick: function (d) {
											 console.log("onclick", d); //data1
											 show(d); //when I click legend show some data
											 chart.hide();
											 chart.show(d);
							 }
					 }
	},
		axis: {
				x: {
					 type: 'category',
					 categories: ['1', '2', '3', '4', '5', '6','7','8','9','10','11',
					 '12','13','14','15','16','17','18','19','20','21','22','23','24',
					 '25','26','27','28','29','30','31'],
					 label: 'Dias del Mes'
				},
				y: {
						label: 'Nro Tweets'
				}
			},
			tooltip: {
				position: function (data, width, height, element) {
					return {top: 50, left: 0};
				},
				format: {
					title: function (x) { return 'Dia ' + (x+1); },
					value: function (value, ratio, id) {
						var format = id === 'data1' ? d3.format(',') : d3.format('');
						return format(value);}}
			}

});
});
>>>>>>> 13513d4a6fb2e45abbe2a1f91127396983988959
})
