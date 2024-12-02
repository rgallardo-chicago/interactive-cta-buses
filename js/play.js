// play.js

// D3 Content Delivery Network (CDN) Educational Reference: https://locall.host/d3-cdn/
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { initializeDropdown } from './dropdown.js';

export function initializePlay(map, geojsonData) {
  const playButton = document.getElementById('play-button');
  const dropdown = document.getElementById('year-month-dropdown');
  let geoJsonLayer;
  let isPlaying = false; // Flag to control playback

  // Load data
  d3.csv('./data/CTA_Bus_Ridership_Monthly.csv').then(data => {
    // Extract distinct year-month values
    const uniqueYearMonths = [...new Set(data.map(d => d.year_month))].sort();

    // Set up play functionality
    playButton.addEventListener('click', () => {
      if (isPlaying) return; // Prevent multiple playbacks
      isPlaying = true;
      let index = 0;

      const interval = setInterval(() => {
        if (index >= uniqueYearMonths.length) {
          clearInterval(interval);
          isPlaying = false;
          return;
        }

        // Update dropdown to `year-month` in display
        const currentYearMonth = uniqueYearMonths[index];
        dropdown.value = currentYearMonth;

        // Update route colors for current `year-month`
        updateRouteColors(currentYearMonth, data);

        index++;
      }, 100); // update every 0.1 seconds
    });

    function updateRouteColors(selectedYearMonth, csvData) {
      // Filter data based on selected year-month
      const filteredData = csvData.filter(d => d.year_month === selectedYearMonth);

      // Create mapping of route::pct_diff values
      const routePctDiffMap = {};
      filteredData.forEach(d => {
        routePctDiffMap[d.route] = parseFloat(d.pct_diff);
      });

      // Define color scale
      const colorScale = d3.scaleSequential(d3.interpolateRdYlGn).domain([-1, 1]);

      // Remove current layer and update it with new colors
      if (geoJsonLayer) {
        map.removeLayer(geoJsonLayer);
      }

      geoJsonLayer = L.geoJSON(geojsonData, {
        style: feature => {
          const route = feature.properties.route;
          const pctDiff = routePctDiffMap[route] || 0;
          return {
            color: colorScale(pctDiff),
            weight: 3, // width of bus route lines
          };
        },
      }).addTo(map);
    }
  });
}
