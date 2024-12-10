// graph.js

// D3 Content Delivery Network (CDN) Educational Reference: https://locall.host/d3-cdn/
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export function updateGraph(route) {
  // Load both CSV files using Promise.all
  Promise.all([
    d3.csv('../data/CTA_Bus_Ridership_Monthly.csv'),
    d3.csv('../data/CTA_BUS_ROUTE_NAMES.csv')
  ]).then(([ridershipData, routeNamesData]) => {
    const routeData = ridershipData.filter(d => d.route === route);
    
    // Find route name based on ROUTE number
    const routeInfo = routeNamesData.find(d => d.ROUTE === route);
    const routeName = routeInfo ? routeInfo.NAME : '';

    // Clear existing line graph
    d3.select('#graph').html('');

    const margin = { top: 50, right: 40, bottom: 60, left: 70 };
    const width = 550 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select('#graph')
      .append('svg')
      .attr('width', 550) 
      .attr('height', 400)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add title with route number and name
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -25)
      .attr('text-anchor', 'middle')
      .attr('class', 'graph-title')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .text(`ROUTE #${route} - ${routeName}`);

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
    
      // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(8));

    svg.append('g')
      .call(d3.axisLeft(y).ticks(8));

    // Add lines
    const lineRides = d3.line()
      .x(d => x(d.year_month))
      .y(d => y(d.rides));

    const lineMovingAvg = d3.line()
      .x(d => x(d.year_month))
      .y(d => y(d.moving_avg));

    svg.append('path')
      .datum(routeData)
      .attr('fill', 'none')
      .attr('stroke', '#41B6E6')
      .attr('stroke-width', 2)
      .attr('d', lineRides);

    svg.append('path')
      .datum(routeData)
      .attr('fill', 'none')
      .attr('stroke', '#EF002B')
      .attr('stroke-width', 2)
      .attr('d', lineMovingAvg);

    // Add labels for axes
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '15px')
      .text('Year');

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 15)
      .attr('x', -height / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '15px')
      .text('Monthly Rides');

    // Add 'Monthly Rides' Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 150}, -20)`);

    legend.append('line')
      .attr('x1', 50)
      .attr('y1', 5)
      .attr('x2', 70)
      .attr('y2', 5)
      .attr('stroke', '#41B6E6')
      .attr('stroke-width', 2);

    legend.append('text')
      .attr('x', 75)
      .attr('y', 10)
      .style('font-size', '12px')
      .text('Monthly Rides');

    // Add 'Moving Average' Legend
    legend.append('line')
      .attr('x1', 50)
      .attr('y1', 25)
      .attr('x2', 70)
      .attr('y2', 25)
      .attr('stroke', '#EF002B')
      .attr('stroke-width', 2);

    legend.append('text')
      .attr('x', 75)
      .attr('y', 30)
      .style('font-size', '12px')
      .text('Moving Average');

    // Tooltip setup
    const tooltip = d3.select('#graph')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    // Create mouse hover event
    const mousemove = event => {
      const [mouseX] = d3.pointer(event, svg.node());
      const closestDate = x.invert(mouseX);

      const closestData = routeData.reduce((a, b) =>
        Math.abs(a.year_month - closestDate) < Math.abs(b.year_month - closestDate) ? a : b
      );

      const tooltipX = event.pageX + 15;
      const tooltipY = event.pageY - 25;

      tooltip
        .style('opacity', 1)
        .style('left', `${Math.min(tooltipX, window.innerWidth - 150)}px`)
        .style('top', `${Math.max(tooltipY, 20)}px`)
        .html(`
          <strong>${d3.timeFormat('%Y-%m')(closestData.year_month)}</strong><br>
          Monthly Rides: ${closestData.rides.toLocaleString()}<br>
          Moving Avg: ${Math.round(closestData.moving_avg).toLocaleString()}
        `);
    };

    // Mouse leaves graph area --> turn off tooltip
    const mouseleave = () => {
      tooltip.style('opacity', 0);
    };

    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);
  });
}
