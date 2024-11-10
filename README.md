# Name: Ruben Gallardo
# Description
In May 2024, the [local Chicago news](https://wgntv.com/news/chicago-news/cta-lags-comparable-cities-in-ridership-recovery-staffing-shortage-remains-a-crisis/) reported that the CTA along with New York City's MTA lagged behind other major cities in recovering to pre-pandemic ridership levels. 
Transit activists and city council blame Carter Dorval, the president of the CTA, for failing to take the necessary measures to speed up the recovery according to reporting by [Block Club Chicago](https://blockclubchicago.org/2024/05/22/resolution-calling-for-cta-presidents-firing-resignation-stalls-despite-support-from-majority-of-council/).
The CTA's own [performance dashboard](https://www.transitchicago.com/performance/) tracks ridership levels and other metrics from January 2022 to September 2024. This dashboard shows improvements in performance by the CTA in the past two years, but it doesn't go back far enough to compare it to a pre-pandemic year.

The goal of this project is to create an interactive visualization of CTA bus ridership data that goes back to at least 2019.  The visualization will help us see how the post-pandemic recovery has evolved when it comes to ridership. I hope to also include other related data that impacts CTA bus services such as the number of operators employed by the agency.  

# Data 
- [CTA Ridership - Daily Totals by Route]([https://data.cityofchicago.org/Transportation/Traffic-Crashes-Crashes/85ca-t3if/about_data](https://data.cityofchicago.org/Transportation/CTA-Ridership-Bus-Routes-Daily-Totals-by-Route/jyb9-n7fm/about_data)) - Crash data shows information about each traffic crash on city streets within the City of Chicago limits and under the jurisdiction of Chicago Police Department (CPD).
  - Rows: 1.04 million Columns: 4
  - How I will use it: I want to create a geospatial visual that has all the Chicago bus routes on a map. When the visual is "played" by the user, the bus routes on the map will change colors based on whether ridership is down or up compared to the all-time average.
- [Historical Congestion Estimates by Segment - 2018-Current](https://data.cityofchicago.org/Transportation/Chicago-Traffic-Tracker-Historical-Congestion-Esti/sxs8-h27x/about_data) - This dataset contains the historical estimated congestion for over 1,000 traffic segments, starting in approximately March 2018.
  - Rows: 292 million Columns: 22
  - I would like to visualize this data onto a map to see if there's a correlation between higher or lower bus ridership and congestion. The congestion data already comes from GPS-trackers on CTA buses, so there might be a way to connect the two datasets. If I decide to use this dataset, I will only look at data from two years.
  - The data is [available via API](https://dev.socrata.com/foundry/data.cityofchicago.org/sxs8-h27x) so thankfully I can only download a small subset of it to avoid issues.
- Geospatial Data
  - [Bus Routes](https://data.cityofchicago.org/Transportation/CTA-Bus-Routes-Map/6qfa-9dtu)
  - [Bus Stops](https://data.cityofchicago.org/Transportation/CTA-Bus-Stops/hvnx-qtky)
