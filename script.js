
d3.csv('cities.csv', d3.autoType).then(data=>{
    newData = data.filter(d => d.eu === true);
    d3.select('.city-count').text("Cities in European Countries: 28")

    const width = 700;
    const height = 550;
    const svg = d3.select('.population-plot')
		.append('svg')
        .attr('width', width)
        .attr('height', height)

    var gradient = svg.append("svg:defs")
        .append("svg:linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");

    gradient.append("svg:stop")
        .attr("offset", "0%")
        .attr("stop-color", "#F8FC00")
        .attr("stop-opacity", 1);
    
    gradient.append("svg:stop")
        .attr("offset", "100%")
        .attr("stop-color", "#FC0000")
        .attr("stop-opacity", 1);

    svg.selectAll("circle")
        .data(newData)
        .enter()
        .append("circle")
        .attr("r", d => d.population > 1000000?8:4)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("fill", "url(#gradient)");

    svg.selectAll("text")
        .data(newData)
        .enter()
        .append("text")
        .text((d) => d.country + ", " + d.city)
        .style("opacity", d => d.population > 1000000?0.8:0)
        .attr("font-size", 11)
        .attr("text-anchor", "middle")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("dx", 0)
        .attr("dy", -10);
})

d3.csv('buildings.csv', d3.autoType).then(talldata=>{
    buildingData = talldata.sort((a, b) => parseFloat(b.height_ft) - parseFloat(a.height_ft))

    const width = 500;
    const height = 500;
    const svg = d3.select('.height-plot')
		.append('svg')
        .attr('width', width)
        .attr('height', height)

    svg.selectAll('text')
        .data(buildingData)
        .enter()
        .append('text')
        .attr('x', 0)
        .attr('y', (d, i) => i * 50 + 25)
        .text( (d) => d.building)
        .style('font-size', 13)
        .attr('font-weight', 100)
        .attr('text-anchor', 'start');

    svg.selectAll("rect")
        .data(buildingData)
        .enter()
        .append("rect")
        .attr("fill", "#FC7600")
        .attr("x", 200)
        .attr("y", (d, i) => d = 50 * i)
        .attr("width", d => d.height_px)
        .attr("height", 40)
        .on("click", function(d, i){
            clickable(i)
        });

    svg.selectAll('labelText')
        .data(buildingData)
        .enter()
        .append('text')
        .attr('x', 0)
        .attr('y', (d, i) => i * 50 + 25)
        .attr("dx", d => d.height_px + 195)
        .attr("dy", 0)
        .text( (d) => d.height_ft + " ft")
        .attr('font-size', 13)
        .attr('text-anchor', 'end');
})


function clickable (i) {
    imageSource = i.image
    document.getElementById("image").src= `${imageSource}`
    document.getElementById("height").textContent = i.height_ft
    document.getElementById("city").textContent = i.city
    document.getElementById("country").textContent = i.country
    document.getElementById("floors").textContent = i.floors
    document.getElementById("completed").textContent = i.completed
    document.getElementById("info").style.display = "block";
    document.getElementById("information").style.display = "block";
}