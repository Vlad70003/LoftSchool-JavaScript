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
    let target = e.target;
    let form = document.querySelector('#addForm').innerHTML;

    newBaloon = openBaloon(coords, form);

    myNewMark = createPlacemark(coords, createForm('click', form, document.body)());
    

    myMap.geoObjects.add(myNewMark, coords);
  });

  // Создание метки.
  function createPlacemark(coords, baloon) {
  
  
  
    let placemark = new ymaps.Placemark(coords, {
      balloonContentBody: baloon
    });

    return placemark;
  }

  // Создание балуна
  function openBaloon(coords, content) {

    myMap.balloon.open(coords, content, {
      closeButton: true
    });

  }
}

  
function createForm(event, form, target){
return function(){
	target.addEventListener(event, e => {
  	let targ = e.target;
  	if(targ.tagName == 'BUTTON'){
    	let nameValue = document.querySelector('#input-name').value;
      let placeValue = document.querySelector('#input-place').value;
      let commentValue = document.querySelector('#input-comm').value;
      let review = document.querySelector('#review');
      let personInf = document.createElement('div');
      let comment = document.createElement('div');
      let form = document.querySelector('#addForm').innerHTML;
      personInf.textContent = `${nameValue} ${placeValue}`
      comment.textContent = commentValue;

      review.append(personInf);
      review.append(comment);
      review.append(form);
    
    return review;
    }
    
  }
)}
}