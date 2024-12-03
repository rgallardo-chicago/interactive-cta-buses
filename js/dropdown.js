// dropdown.js

// D3 Content Delivery Network (CDN) Educational Reference: https://locall.host/d3-cdn/
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { updateGraph } from './graph.js';

export function initializeDropdown(map, geojsonData) {
  const dropdown = d3.select('#year-month-dropdown');
  let geoJsonLayer;

  // Load data
  d3.csv('./data/CTA_Bus_Ridership_Monthly.csv').then(data => {
    // Extract year-month values for dropdown
    const uniqueYearMonths = [...new Set(data.map(d => d.year_month))];
    uniqueYearMonths.sort();

    // Populate dropdown menu
    dropdown.selectAll('option')
      .data(uniqueYearMonths)
      .enter()
      .append('option')
      .attr('value', d => d)
      .text(d => d);

    // Event listener for changes in dropdown
    dropdown.on('change', () => {
      const selectedYearMonth = dropdown.property('value');
      updateRouteColors(selectedYearMonth, data);
    });

    // Initialize GeoJSON layer
    geoJsonLayer = createGeoJsonLayer(geojsonData, data, uniqueYearMonths[0]);
    geoJsonLayer.addTo(map);
  });

  function updateRouteColors(selectedYearMonth, csvData) {
    // Filter data based on selected year-month
    const filteredData = csvData.filter(d => d.year_month === selectedYearMonth);

    // Create mapping of bus route to pct_diff values
    const routePctDiffMap = {};
    filteredData.forEach(d => {
      routePctDiffMap[d.route] = parseFloat(d.pct_diff);
    });

    // Update GeoJSON layer with new style
    if (geoJsonLayer) {
      map.removeLayer(geoJsonLayer);
    }

    geoJsonLayer = createGeoJsonLayer(geojsonData, csvData, selectedYearMonth);
    geoJsonLayer.addTo(map);
  }

  function createGeoJsonLayer(geojsonData, csvData, yearMonth) {
    // Map route to pct_diff for the selected year-month
    const routePctDiffMap = {};
    csvData.filter(d => d.year_month === yearMonth).forEach(d => {
      routePctDiffMap[d.route] = parseFloat(d.pct_diff);
    });

    // Return GeoJSON layer with styles and click handlers
    return L.geoJSON(geojsonData, {
      style: feature => {
        const route = feature.properties.route;
        const pctDiff = routePctDiffMap[route] || 0;

        // Normalize pct_diff for color scale scale
        const normalizedPctDiff = (pctDiff + 1) / 2; 

        // Get the color that corresponds to percentage value
        const baseColor = d3.color(d3.interpolateRdYlGn(normalizedPctDiff));
        if (baseColor) {
          baseColor.opacity = 1;
        }

        return {
          color: baseColor.toString(),
          weight: 3,
        };
      },
      onEachFeature: (feature, layer) => {
        if (feature.properties && feature.properties.route) {
          layer.bindPopup(`<strong>Route:</strong> ${feature.properties.route}`);
          layer.on('click', () => {
            updateGraph(feature.properties.route);
          });
        }
      },
    });
  }
}
