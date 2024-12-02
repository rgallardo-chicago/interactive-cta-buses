import pandas as pd
import os

# Load dataset
cwd = os.getcwd()
file_path = cwd + '/data/CTA_Bus_Ridership.csv' 
df = pd.read_csv(file_path)

# Convert 'date' column to datetime format
df['date'] = pd.to_datetime(df['date'])

# Extract year and month
df['year_month'] = df['date'].dt.to_period('M')

# Group data by by route and year_month
monthly_data = df.groupby(['route', 'year_month'], as_index=False)['rides'].sum()

# Calculate 12-month moving average
monthly_data['moving_avg'] = (
    monthly_data.groupby('route')['rides']
    .transform(lambda x: x.rolling(window=12, min_periods=1).mean())
)

# Calculate percentage difference between monthly ridership & moving average
monthly_data['pct_diff'] = (
    (monthly_data['rides'] - monthly_data['moving_avg']) / monthly_data['moving_avg']
)

# Save transformed dataset to a CSV file
output_file = cwd + '/data/CTA_Bus_Ridership_Monthly.csv'
monthly_data.to_csv(output_file, index=False)
