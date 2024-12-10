// autofillBusRoutes.js

// D3 Content Delivery Network (CDN) Educational Reference: https://locall.host/d3-cdn/
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { updateGraph } from "./graph.js";

// Create a custom event for graph updates
const graphUpdateEvent = new CustomEvent('graphUpdate');

// Wrap function to update graph in play and autofill modules
const wrappedUpdateGraph = (route) => {
  updateGraph(route);
  document.dispatchEvent(graphUpdateEvent);
};

export function initializeBusRouteAutofill() {
  const busRouteInput = document.getElementById("bus-route-input");

  // Create custom dropdown
  const dropdownContainer = document.createElement('div');
  dropdownContainer.classList.add('dropdown-container');
  busRouteInput.parentNode.appendChild(dropdownContainer);
  
  // Set position dynamically
  dropdownContainer.style.width = `${busRouteInput.offsetWidth}px`;
  dropdownContainer.style.left = `${busRouteInput.offsetLeft}px`;
  dropdownContainer.style.top = `${busRouteInput.offsetTop + busRouteInput.offsetHeight}px`;

  // Add event listener for graph updates
  document.addEventListener('graphUpdate', () => {
    busRouteInput.value = '';
    dropdownContainer.style.display = 'none';
  });

  // Load data
  d3.csv('../data/CTA_Bus_Ridership_Monthly.csv').then(data => {
    const uniqueRoutes = [...new Set(data.map(d => d.route))]
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    // Text input event handler
    busRouteInput.addEventListener("input", () => {
      const inputText = busRouteInput.value.toLowerCase();
      
      if (inputText.length === 0) {
        dropdownContainer.style.display = 'none';
        return;
      }

      // Filter and display matched values in dropdown
      const matchingRoutes = uniqueRoutes.filter(route => 
        route.toLowerCase().includes(inputText)
      );

      if (matchingRoutes.length > 0) {
        dropdownContainer.style.display = 'block';
        dropdownContainer.innerHTML = matchingRoutes.map(route => `
          <div class="dropdown-item" data-value="${route}">
            ${route}
          </div>
        `).join('');

        // Add click handlers
        const items = dropdownContainer.getElementsByClassName('dropdown-item');
        Array.from(items).forEach(item => {
          item.addEventListener('click', () => {
            const selectedRoute = item.getAttribute('data-value');
            busRouteInput.value = selectedRoute;
            dropdownContainer.style.display = 'none';
            
            if (uniqueRoutes.includes(selectedRoute)) {
              wrappedUpdateGraph(selectedRoute);
            }
          });
        });
      } else {
        dropdownContainer.style.display = 'none';
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!busRouteInput.contains(e.target) && !dropdownContainer.contains(e.target)) {
        dropdownContainer.style.display = 'none';
      }
    });

    // Load default graph (Route #6)
    wrappedUpdateGraph("6");
  });

  // Return wrapped update function
  return wrappedUpdateGraph;
}
