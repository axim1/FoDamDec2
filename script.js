var datafromjson;
function initMap() {
  // Create a new map object
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 33.67146196312361, lng: 73.52108729277924},
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  });

  // Create a new data layer object
  var dataLayer = new google.maps.Data();

  // Load the GeoJSON data into the data layer
  function loadGeoJSON(file) {
    // Clear existing data layer
    dataLayer.setMap(null);
    dataLayer = new google.maps.Data();

    // Load the GeoJSON data into the data layer
    dataLayer.loadGeoJson(file, null, function(features) {
      // Add the data layer to the map
      dataLayer.setMap(map);
      dataLayer.setStyle(function(feature) {
        // Set the style based on the label property of the feature
        var color, strColor;
        console.log(feature.getProperty('label'));
        switch (feature.getProperty('label')) {
          case 1:
            color = '#006400';
            strColor = 'purple';
            break;
          case 2:
            color = '#228B22';
            strColor = 'purple';
            break;
          case 3:
            color = '#0ae042';
            strColor = 'purple';
            break;
          case 4:
            color = '#fff70b';
            strColor = 'cyan';
            break;
          case 5:
            color = '#ffaf38';
            strColor = 'pink';
            break;
          case 6:
            color = '#ff641b';
            strColor = 'purple';
            break;
          case 7:
            color = '#FF0000';
            strColor = 'purple';
            break;
          default:
            color = 'gray';
        }
        return {
          fillColor: color,
          fillOpacity: 0.75,
          strokeColor: strColor,
          strokeWeight: 0
        };
      });

      // Get the bounds of the GeoJSON features
      var bounds = new google.maps.LatLngBounds();
      features.forEach(function(feature) {
        feature.getGeometry().forEachLatLng(function(latlng) {
          bounds.extend(latlng);
        });
      });

      // Center and fit the map to the bounds
      map.fitBounds(bounds);
    });
  }

  // Handle selection change in the dropdown menu
  function handleSelectionChange() {
    var selectedFile = this.value;
    if (selectedFile !== '') {
      loadGeoJSON(selectedFile);

      // Load pre-fire and post-fire images based on selected option
      var preFireImage ='Prefire/'+ selectedFile.replace('.geojson', '_PREFIRE.png');
       preFireImage = preFireImage.replace('GeojsonData/','');
      var postFireImage ='Postfire/'+ selectedFile.replace('.geojson', '_POSTFIRE.png');
       postFireImage = postFireImage.replace('GeojsonData/','');


      var groundtruthImage ='GroundTruth/'+ selectedFile.replace('.geojson', '_Ground_Truth.png');
       groundtruthImage = groundtruthImage.replace('GeojsonData/','');
       datafromjson= 'Data/'+ selectedFile.replace('.geojson', '.json');
       datafromjson = datafromjson.replace('GeojsonData/','');


      document.getElementById('preFireImage').src = preFireImage;
      document.getElementById('postFireImage').src = postFireImage;
      document.getElementById('gtImage').src = groundtruthImage;
    }
  }

  // Get the dropdown element
  var dropdown = document.getElementById('geojsonDropdown');

  // Attach event listener to handle selection change
  dropdown.addEventListener('change', handleSelectionChange);

  // Add options to the dropdown menu
  function addOptionToDropdown(file) {
    var option = document.createElement('option');
    option.value = file;
    option.text = file;
    dropdown.appendChild(option);
  }

  // Define an array of GeoJSON files
  var geojsonFiles = [
  'GeojsonData/CPT11AND12.geojson',
  'GeojsonData/CPT23.geojson',
  'GeojsonData/CPT25.geojson'
];

// Add options for each GeoJSON file to the dropdown menu
geojsonFiles.forEach(function(file) {
  addOptionToDropdown(file);
});
}
 datafromjson='Data/CPT25.json';
//updateGlobalVariable();
//console.log(datafromjson) ;
//var fromjson= datafromjson

fetch(datafromjson)
  .then(response => response.json())
  .then(data => {
    const table = document.getElementById('data-table');

    data.data.forEach(row => {
      const newRow = document.createElement('tr');
      const classesCell = document.createElement('td');
      const areaCell = document.createElement('td');

      classesCell.textContent = row['Burn Severity Classes'];
      areaCell.textContent = row['Area (acres)'];

      newRow.appendChild(classesCell);
      newRow.appendChild(areaCell);
      table.appendChild(newRow);
    });
  });
