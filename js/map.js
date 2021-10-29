mapboxgl.accessToken = 'pk.eyJ1IjoiYXl0c2FuIiwiYSI6ImNrdW44bWhoMjEwbzkyc21vOXU1Y3J1MjQifQ.6WTAV3xC8Nv6mgBBEeRRRw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [2.3364, 48.86091],
  zoom: 15.8
});

map.addControl(new mapboxgl.NavigationControl());

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3364, 48.86091]
      },
      properties: {
        title: 'Louvre Museum',
        description: 'Musée du Louvre'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.33317, 48.860235]
      },
      properties: {
        title: 'Louvre Museum',
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3329, 48.8618]
      },
      properties: {
        title: 'Louvre Museum',
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.3365, 48.8625]
      },
      properties: {
        title: 'Louvre Museum',
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.33967, 48.860746]
      },
      properties: {
        title: 'Sarcophage d\'Abou Roach',
      }
    }
  ]
};

for (const { geometry, properties } of geojson.features) {
  const el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker(el)
    .setLngLat(geometry.coordinates)
    // .setPopup(
    //   new mapboxgl.Popup({ offset: 25 })
    //     .setHTML(`<h3>${properties.title}</h3><p>${properties.description}</p>`)
    // )
    .addTo(map);
}