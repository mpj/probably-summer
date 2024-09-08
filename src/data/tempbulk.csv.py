from datetime import datetime
import sys
import pandas as pd

from meteostat import Point, Daily

# Set time period
start = datetime(2004, 1, 1)
end = datetime(2024, 12, 31)


stockholm = Point(59.3293, 18.0686)

data = Daily(stockholm, start, end)
data = data.fetch()



# get rid of all columns except time, tavg, tmin, tmax
data = data[[ "tavg", "tmin", "tmax"]] 





# rename time to date
data.to_csv(sys.stdout)

