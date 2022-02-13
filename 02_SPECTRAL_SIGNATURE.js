/////////////// SPECTRAL SIGNATURE ///////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////
// Point collection
var veg = ee.Geometry.Point([-0.5543001630665545,39.443748497458316])
var build = ee.Geometry.Point( [-0.5369319426437702,39.476699739386284])
var soil = ee.Geometry.Point([-0.4505862700363483,39.472476092982426])

// Feature collection with points
var points = ee.FeatureCollection([
  ee.Feature(veg, {'label': 'vegetation'}),
  ee.Feature(build, {'label': 'builds'}),
  ee.Feature(soil, {'label': 'bare_soil'})
]);

Map.addLayer(points);
print('points',points)


// Sentinel image collection
var sentinel_base = ee.ImageCollection("COPERNICUS/S2_SR").select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B11', 'B12'])
    .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10)
    .filterDate('2020-01-01', '2020-07-15')
    .filterBounds(points)
    .median();
    
Map.addLayer(sentinel_base, {bands:['B4', 'B3', 'B2'], min:100, max:3000}, 'sentinel_base');
print('sentinel_base', sentinel_base);

// Define graph parameters
var options = {
  title: 'SENTINEL 2. SPECTRAL SIGNATURE  ',
  hAxis: {title: 'Wavelength (micrometers)'},
  vAxis: {title: 'Reflectance', maxValue: 5000}, 
  lineWidth: 1,
  pointSize: 4,
  series: {
    0: {color: '37d830'}, // vegetation
    1: {color: 'b0b89a'}, // builds
    2: {color: 'f90000'}, // bare soil
}};

// Define X axis with the wavelengths of satellite bands
var wavelengths = [0.495, 0.56, 0.664, 0.704, 0.740, 0.782, 0.835, 1.613, 2.202];

// Create the graph
var spectraChart = ui.Chart.image.regions(
    sentinel_base, points, ee.Reducer.mean(), 30, 'label', wavelengths)
        .setChartType('ScatterChart') // graph type
        .setOptions(options); // input graph parameters


// Show sprectral signature in console
print(spectraChart);
