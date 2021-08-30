# Zip Code Boundaries


Extremely simple module which exports an object. The keys to the object are a 5 digit zip code. The values to the object contain another object with the keys: `n` (north), `s` (south), `e` (east), `w` (west). The values of that object are the lat/long limits of that zip code. So w is the farthest point to the west that the zip code has. east is the farthest east, north is the farthest north, and south is the farthest south.

The data is taken from the TIGER/Line shapefiles available at [data.gov](https://catalog.data.gov/dataset/tiger-line-shapefile-2019-2010-nation-u-s-2010-census-5-digit-zip-code-tabulation-area-zcta5-na)
