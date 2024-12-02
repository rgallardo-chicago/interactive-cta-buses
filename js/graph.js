// graph.js

// D3 Content Delivery Network (CDN) Educational Reference: https://locall.host/d3-cdn/
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export function updateGraph(route) {
  // Load data
  d3.csv('./data/CTA_Bus_Ridership_Monthly.csv').then(data => {
    // Filter data based on selected bus route
    const routeData = data.filter(d => d.route === route);

    // Clear existing line graph
    d3.select('#graph').html('');

    const margin = { top: 50, right: 20, bottom: 50, left: 65 };
    const width = 400 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select('#graph')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Parse dates
    const parseDate = d3.timeParse('%Y-%m');
    routeData.forEach(d => {
      d.year_month = parseDate(d.year_month);
      d.rides = +d.rides;
      d.moving_avg = +d.moving_avg;
    });

    // Set up x and y scales of graph
    const x = d3.scaleTime()
      .domain(d3.extent(routeData, d => d.year_month))
      .range([0, width]);
    
    const y = d3.scaleLinear()
      .domain([0, d3.max(routeData, d => Math.max(d.rides, d.moving_avg))])
      .nice()
      .range([height, 0]);

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .attr('class', 'graph-title')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text(`Route #${route}`);

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5));
    
    svg.append('g')
      .call(d3.axisLeft(y));

    // Add line for # of rides
    const lineRides = d3.line()
      .x(d => x(d.year_month))
      .y(d => y(d.rides));

    svg.append('path')
      .datum(routeData)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 1.5)
      .attr('d', lineRides);

    // Add line for moving average
    const lineMovingAvg = d3.line()
      .x(d => x(d.year_month))
      .y(d => y(d.moving_avg));

    svg.append('path')
      .datum(routeData)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 1.5)
      .attr('d', lineMovingAvg);

    // Add labels for axes
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .attr('text-anchor', 'middle')
      .text('Year');

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 15)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .text('Monthly Rides (#)');
  });
}
