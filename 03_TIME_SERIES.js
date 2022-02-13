// Point of study. You will create time series in this point
var point = ee.Geometry.Point([-0.32065989500903447,39.29245277421416])

// Create Modis image collection
var collecction = ee.ImageCollection('MODIS/006/MOD09GQ')
                .filterDate('2018-01-01','2021-02-01')
                .filterBounds(point);

print('collecction',collecction);

// NDVI Function
var addNDVI = function(image){
  var ndvi = image.normalizedDifference(['sur_refl_b02', 'sur_refl_b01']).rename('NDVI')
  var im_ndvi = image.addBands(ndvi)
  return im_ndvi;
}; 

// Apply function
var collectionNDVI = collecction.map(addNDVI);
print('collectionNDVI', collectionNDVI)

var optionsgraf = {
  title: 'TIME SERIE',
  hAxis:{title:'Year'},
  vAxis:{title:'NDVI'},
  lineWhidth:1
};

// Create chart
var grafico_serie = ui.Chart.image.series(
                          collectionNDVI.select('NDVI'), point)
                          .setOptions(optionsgraf);

// Time serie chart show in console
print('grafico_serie', grafico_serie);
