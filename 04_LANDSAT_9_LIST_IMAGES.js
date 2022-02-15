// Study area. geometry
var geom = ee.Geometry.Polygon([[-0.47332962029847714,39.25490326555797],
                                [-0.22613723748597714,39.25490326555797],
                                [-0.22613723748597714,39.41210859714073],
                                [-0.47332962029847714,39.41210859714073],
                                [-0.47332962029847714,39.25490326555797]])
  
//Landsat 9 data. image collection
var l9 = ee.ImageCollection("LANDSAT/LC09/C02/T1_L2")
          .filterDate('2021-11-01', '2022-02-15') // You date
          .filterBounds(geom) // Your goemtry

// Create a list with all images
var l9_list = l9.toList(15)
print('landsat 9 list' , l9_list)

// Select your image of the list
var number_imge = 14
var l9_image = ee.Image(l9_list.get(number_imge))
                      .clip(geom)

print('landsat 9 image slected', l9_image)
Map.addLayer(l9_image, {min:6600, max:11900, bands:['SR_B4', 'SR_B3', 'SR_B2']}, 'Landsat 9')
