// play.js

// D3 Content Delivery Network (CDN) Educational Reference: https://locall.host/d3-cdn/
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { updateGraph } from "./graph.js";

export function initializePlay(map, geojsonData) {
  const playButton = document.getElementById('play-button');
  const currentDateDisplay = document.getElementById('current-date-display');
  let geoJsonLayer;
  let isPlaying = false; // Flag to control playback
  let interval;

  // Load CSV Data
  d3.csv('../data/CTA_Bus_Ridership_Monthly.csv').then(data => {
    // Extract distinct year-month values
    const uniqueYearMonths = [...new Set(data.map(d => d.year_month))].sort();

    // Set up play functionality
    playButton.addEventListener('click', () => {
      isPlaying ? pausePlayback() : startPlayback();
    });

    function startPlayback() {
      isPlaying = true;
      playButton.textContent = "Pause";
      let index = 0;

      interval = setInterval(() => {
        if (index >= uniqueYearMonths.length) {
          stopPlayback();
          return;
        }

        // Update current-date display
        const currentYearMonth = uniqueYearMonths[index];
        currentDateDisplay.textContent = formatYearMonth(currentYearMonth);
        
        updateRouteColors(currentYearMonth, data);
        index++;
      }, 200); // update every 0.2 seconds
    }

    // Set up pause functionality
    function pausePlayback() {
      clearInterval(interval);
      playButton.textContent = "Play";
      isPlaying = false;
    }

    function stopPlayback() {
      pausePlayback();
    }
    
    function updateRouteColors(selectedYearMonth, csvData) {
      // Filter data based on selected year-month
      const filteredData = csvData.filter(d => d.year_month === selectedYearMonth);

      // Create mapping of route::pct_diff values
      const routePctDiffMap = {};
      filteredData.forEach(d => {
        routePctDiffMap[d.route] = parseFloat(d.pct_diff);
      });

      // Remove current layer and update it with new colors
      if (geoJsonLayer) {
        map.removeLayer(geoJsonLayer);
      }

      // Color scale logic
      geoJsonLayer = L.geoJSON(geojsonData, {
        style: feature => {
          const route = feature.properties.route;
          const pctDiff = routePctDiffMap[route] || 0;
          const normalizedPctDiff = (pctDiff + 1) / 2;
          const baseColor = d3.color(d3.interpolateRdYlGn(normalizedPctDiff));
          if (baseColor) {
            baseColor.opacity = 1;
          }

          return {
            color: baseColor.toString(),
            weight: 3,
          };
        },

        // Click on route to update graph functionality
        onEachFeature: (feature, layer) => {
          if (feature.properties && feature.properties.route) {
            layer.bindPopup(`<strong>Route:</strong> ${feature.properties.route}`);
            layer.on("click", () => {
              updateGraph(feature.properties.route);
            });
          }
        }
      }).addTo(map);
    }

    // Convert YYYY-MM values to Month YYYY
    function formatYearMonth(yearMonth) {
      const [year, month] = yearMonth.split('-').map(Number);
      const date = new Date(year, month - 1);
      return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    }
  });
}
