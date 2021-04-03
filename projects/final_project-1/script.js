ymaps.ready(init);

function init() {
  var myPlacemark,
    myMap = new ymaps.Map('map', {
      center: [55.753994, 37.622093],
      zoom: 12
    }, {
      searchControlProvider: 'yandex#search'
    });
    

  // Слушаем клик на карте.
  myMap.events.add('click', function(e) {
    let coords = e.get('coords');
  	let form = document.querySelector('#addForm').innerHTML;
    
    // Если метка уже создана – просто передвигаем ее.
    if (myPlacemark) {
      myBaloon.geometry.setCoordinates(coords, form);
    }
    // Если нет – создаем.
    else {
      newBaloon = openBaloon(coords, form);
      
      myNewMark = createPlacemark(coords, form);
      
  
      myMap.geoObjects.add(myNewMark, coords);
      /* myMap.geoObjects.add(myBaloon); */
      

    }
  });

  // Создание метки.
  function createPlacemark(coords, baloon) {
    let placemark = new ymaps.Placemark(coords, {balloonContentBody: baloon});
    return placemark;
  }

// Создание балуна
  function openBaloon(coords, content) {
    myMap.balloon.open(coords, content, {
      closeButton: true
    });
    
  }

  function setBaloonContent(content) {
    myMap.balloon.setData(content);
  }

  function closeBaloon() {
    myMap.balloon.close();
  }
}