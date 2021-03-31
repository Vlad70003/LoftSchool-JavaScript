ymaps.ready(init);


/// array marks
let placemarks = [
{
  latitude: 59.93,
  longitude: 30.31,
  hintContent: '<div class = "">информация</div',
  balloonContent: [
    '<div class = "">',
    '<img class = ""></img>',
    'Какой то текст',
    '</div>'
  ]
},
{
  latitude: 59.93,
  longitude: 30.35,
  hintContent: '<div class = "">информация</div',
  balloonContent: [
    '<div class = "">',
    '<img class = ""></img>',
    'Какой то текст',
    '</div>'
  ]
}]

let geoObjects = [];

function init() {
///
  let map = new ymaps.Map('map', {
    center: [59.93, 30.31],
    zoom: 12,
    controls: ["zoomControl"],
    behaviors: ['drag'],
  });
  for ( let i = 0; i < placemarks.length; i++) {
    geoObjects[i] = new ymaps.Placemark([geoObjects[i].latitude, geoObjects[i].longitude], {
        ///create hint
        hintContent: geoObjects[i].hintContent,
        ///create baloon
        balloonContent: geoObjects[i].balloonContent.join('')
      },
      {
        iconLayout: 'default#image',
        iconImageHref: '',
        iconImageSize: [46, 57],
        iconImageOffset: [-23, -57],
        /// position if image is a sprite
        iconImageClipRect: [[111, 111], [111, 111]],
      });
      }
    
  let clusterer = new ymaps.Clusterer({
		clusterIcons: [
    	{
      	href: '',
        size: [100, 100],
        offset: [-50, -50],
      }
    ],
    clusterIconContentLayout: null,
  });
  map.geoObjects.add(clusterer);
  clusterer.add(placemarks);
  
}