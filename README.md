# Name: Ruben Gallardo
# Description
In May 2024, the [local Chicago news](https://wgntv.com/news/chicago-news/cta-lags-comparable-cities-in-ridership-recovery-staffing-shortage-remains-a-crisis/) reported that the CTA along with New York City's MTA lagged behind other major cities in recovering to pre-pandemic ridership levels. Transit activists and city council blame Carter Dorval, the president of the CTA, for failing to take the necessary measures to speed up the recovery according to reporting by [Block Club Chicago](https://blockclubchicago.org/2024/05/22/resolution-calling-for-cta-presidents-firing-resignation-stalls-despite-support-from-majority-of-council/). The CTA's own [performance dashboard](https://www.transitchicago.com/performance/) tracks ridership levels and other metrics from January 2022 to September 2024. This dashboard shows improvements in performance by the CTA in the past two years, but it doesn't go back far enough so users can compared current performance to pre-pandemic years. 

The goal of this project is to create an interactive visualization of CTA bus ridership data that goes back to at least 2019.  The visualization will help us see how the post-pandemic recovery has evolved when it comes to ridership. I hope to also include other related data that impacts CTA bus services such as the number of operators employed by the agency. Finally, since the Brandon Johnson adminstration recently launched the [Better Streets for Buses Plan](https://betterstreetsforbuses.com/), it motivated me to only focus on buses and not rail for this project.

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

# Draft from Milestone 2
https://github.com/user-attachments/assets/34cc2bfd-e459-422a-bff8-7679e4804f04

Users have the ability to choose a Year-Month from the dropdown menu and the color of the bus routes change based on whether the ridership during that month is above, below or the same as the 12-month moving average. Users can also click on a bus route and see the monthly ridership and the moving average of that route graphed. Finally, users can click the play button to see the ridership trends for each month from Jan 2001 to September 2024.

# Original Mockup
![Screenshot 2024-11-10 at 1 12 06 AM](https://github.com/user-attachments/assets/351308ec-50c3-4746-9571-1a7270665b40)