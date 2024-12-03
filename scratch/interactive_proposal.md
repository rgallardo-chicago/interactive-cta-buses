# Description
In May 2024, the [local Chicago news](https://wgntv.com/news/chicago-news/cta-lags-comparable-cities-in-ridership-recovery-staffing-shortage-remains-a-crisis/) reported that the CTA along with New York City's MTA lagged behind other major cities in recovering to pre-pandemic ridership levels. Transit activists and city council blame Carter Dorval, the president of the CTA, for failing to take the necessary measures to speed up the recovery according to reporting by [Block Club Chicago](https://blockclubchicago.org/2024/05/22/resolution-calling-for-cta-presidents-firing-resignation-stalls-despite-support-from-majority-of-council/). The CTA's own [performance dashboard](https://www.transitchicago.com/performance/) tracks ridership levels and other metrics from January 2022 to September 2024. This dashboard shows improvements in performance by the CTA in the past two years, but it doesn't go back far enough so users can compared current performance to pre-pandemic years. 

The goal of this project is to create an interactive visualization of CTA bus ridership data that goes back to at least 2019.  The visualization will help us see how the post-pandemic recovery has evolved when it comes to ridership. I hope to also include other related data that impacts CTA bus services such as the number of operators employed by the agency. Finally, since the Brandon Johnson adminstration recently launched the [Better Streets for Buses Plan](https://betterstreetsforbuses.com/), it motivated me to maybe only focus on buses and not rail for this project, but I might change my mind depending on how easy it is to visualize bus data.

# Data 
- [CTA Ridership - Daily Totals by Route](https://data.cityofchicago.org/Transportation/CTA-Ridership-Bus-Routes-Daily-Totals-by-Route/jyb9-n7fm/about_data) - This dataset shows total daily ridership on a per-route basis dating back to 2001.
  - Rows: 1.04 million Columns: 4
  - How I will use it: I want to create a geospatial visual that has all the Chicago bus routes on a map. When the visual is "played" by the user, the bus routes on the map will change colors based on whether ridership is down or up compared to the all-time average.
- [Historical Congestion Estimates by Region - 2018-Current](https://data.cityofchicago.org/Transportation/Chicago-Traffic-Tracker-Historical-Congestion-Esti/kf7e-cur8/about_data) - This dataset contains the historical estimated congestion for over 29 traffic regions from March 2018 to Present day. 
  - Rows: 8.62 million Columns: 22
  - I would like to visualize this data onto a map to see if there's a correlation between higher or lower bus ridership and congestion. 
- [CTA Employees](https://rtams.org/media/datasets/cta-employees)
- Geospatial Data
  - [Bus Routes](https://data.cityofchicago.org/Transportation/CTA-Bus-Routes-Map/6qfa-9dtu)
  - [Bus Stops](https://data.cityofchicago.org/Transportation/CTA-Bus-Stops/hvnx-qtky)
- [CTA Employees](https://rtams.org/media/datasets/cta-employees)

# Visualization Inspo Examples
- China Railway Map
  - URL: http://cnrail.geogv.org/enus/station/27270469
  - Type: Option A - Core Interactive
  - Description: I'm thinking of a creating a map that allows users to click a bus route. When they click on the bus route, a panel will open that could include general information and a line graph of ridership over time.
  - ![Screenshot 2024-11-10 at 12 08 33 AM](https://github.com/user-attachments/assets/2cae1a84-f520-4051-9a6f-d259c0adbf50)
- fastest-bus-analysis-in-the-west
  - URL: [Visualization](https://public.tableau.com/app/profile/vivek7797/viz/stopsandspeedanalyses/Story1), [Github Repo](https://github.com/vta/fastest-bus-analysis-in-the-west/tree/master?tab=readme-ov-file)
  - Type: Option A - Core Interactive
  - Description: The core interactive page that I want to build will be inspired by this map that visualizes bus speed by bus route. Unlike this map, my map will visualize whether the bus route has above or below ridership at a certain point in time compared to the running average. I took the Time Series MPCS course this summer, so I plan to use some knowledge from that class to calculate the average for each day that controls for COVID times. 
  - ![Screenshot 2024-11-10 at 12 27 02 AM](https://github.com/user-attachments/assets/58eb6237-25e7-4701-9e93-1b7185f5ba2e)
- Global Forest Watch
  - URL: [Interactive Map Dashboard](https://gfw.global/4fIfPG2)
  - Type: Option A - Core Interactive
  - Description: This dashboard has the option of displaying how tress loss has grown in the past 20 years when the user clicks play. For my project, I want to have a similar function that allows users to see how CTA Bus ridership has fluctuated by bus route since 2001.
  - ![Screenshot 2024-11-10 at 12 49 53 AM](https://github.com/user-attachments/assets/cda9553b-255f-43f5-8af2-f64b1670a024)

# Mockup
![Screenshot 2024-11-10 at 1 12 06 AM](https://github.com/user-attachments/assets/351308ec-50c3-4746-9571-1a7270665b40)
