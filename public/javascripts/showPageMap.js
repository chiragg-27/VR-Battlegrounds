mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v11",
  center: campground.geometry.coordinates,
  zoom: 8,
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker().setLngLat(campground.geometry.coordinates).addTo(map);
