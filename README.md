# GEE_IMAGE_DOWNLOADS
DOWNLOAD SATELLITE IMAGE

javascript

// Sentinel 2 data. image collection
// Remember¡ Define your geometry
var sen = ee.ImageCollection("COPERNICUS/S2_SR")
          .filterDate('2021-01-01', '2021-12-31') // You date
          .filterBounds(geometry) // Your goemtry
          
          .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
          
          .median()
          .clip(geometry)

// Show data in the console
print(sen)
// Add sentinel information to the map
Map.addLayer(sen, {}, 'sentinel 2')

// Create  NDVI layer
var ndvi = sen.normalizedDifference(['B8', 'B4'])

// Show NDVI data in the console
print(ndvi)
// Add NDVI map as a layer
Map.addLayer(ndvi)

// Export NDVI image to Google Drive
Export.image.toDrive(ndvi)
