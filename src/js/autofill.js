// autofill.js

// D3 Content Delivery Network (CDN) Educational Reference: https://locall.host/d3-cdn/
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { updateGraph } from "./graph.js";

export function initializeAutofill(map, geojsonData) {
  const yearMonthInput = document.getElementById("year-month-input");
  const currentDateDisplay = document.getElementById('current-date-display');
  let geoJsonLayer;

  // Create custom dropdown
  const dropdownContainer = document.createElement('div');
  dropdownContainer.classList.add('dropdown-container');
  yearMonthInput.parentNode.appendChild(dropdownContainer);
  
  // Set position dynamically
  dropdownContainer.style.width = `${yearMonthInput.offsetWidth}px`;
  dropdownContainer.style.left = `${yearMonthInput.offsetLeft}px`;
  dropdownContainer.style.top = `${yearMonthInput.offsetTop + yearMonthInput.offsetHeight}px`;

  // Load data
  d3.csv("../data/CTA_Bus_Ridership_Monthly.csv")
    .then((data) => {
      const uniqueYearMonths = [...new Set(data.map((d) => d.year_month))].sort();
      console.log("Unique Year-Months:", uniqueYearMonths);

      // Format dates
      const formattedDates = uniqueYearMonths.map(ym => ({
        value: ym,
        display: formatYearMonthForDisplay(ym)
      }));

      // Text input event handler
      yearMonthInput.addEventListener("input", () => {
        const inputText = yearMonthInput.value.toLowerCase();
        
        if (inputText.length === 0) {
          dropdownContainer.style.display = 'none';
          return;
        }

        // Filter and display matched values in dropdown
        const matchingDates = formattedDates.filter(date => 
          date.display.toLowerCase().includes(inputText)
        );

        if (matchingDates.length > 0) {
          dropdownContainer.style.display = 'block';
          dropdownContainer.innerHTML = matchingDates.map(date => `
            <div class="dropdown-item" data-value="${date.value}">
              ${date.display}
            </div>
          `).join('');

          // Add click handlers
          const items = dropdownContainer.getElementsByClassName('dropdown-item');
          Array.from(items).forEach(item => {
            item.addEventListener('click', () => {
              const selectedYearMonth = item.getAttribute('data-value');
              const displayValue = item.textContent.trim();
              yearMonthInput.value = displayValue;
              dropdownContainer.style.display = 'none';
              
              updateRouteColors(selectedYearMonth, data);
              currentDateDisplay.textContent = displayValue;
            });
          });
        } else {
          dropdownContainer.style.display = 'none';
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!yearMonthInput.contains(e.target) && !dropdownContainer.contains(e.target)) {
          dropdownContainer.style.display = 'none';
        }
      });

      // Initialize map layer
      geoJsonLayer = createGeoJsonLayer(geojsonData, data, uniqueYearMonths[0]);
      geoJsonLayer.addTo(map);
      currentDateDisplay.textContent = formatYearMonthForDisplay(uniqueYearMonths[0]);
    })

  function updateRouteColors(selectedYearMonth, csvData) {
    if (geoJsonLayer) {
      map.removeLayer(geoJsonLayer);
    }
    geoJsonLayer = createGeoJsonLayer(geojsonData, csvData, selectedYearMonth);
    geoJsonLayer.addTo(map);
  }

  function createGeoJsonLayer(geojsonData, csvData, yearMonth) {
     // Create mapping of route::pct_diff values
    const routePctDiffMap = {};
    csvData
      .filter((d) => d.year_month === yearMonth)
      .forEach((d) => {
        routePctDiffMap[d.route] = parseFloat(d.pct_diff);
      });

    // Color scale logic
    return L.geoJSON(geojsonData, {
      style: (feature) => {
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
      },
    });
  }

  // Convert YYYY-MM values to Month YYYY for current-date-display
  function formatYearMonthForDisplay(yearMonth) {
    const [year, month] = yearMonth.split('-').map(Number);
    const date = new Date(year, month - 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }
}
