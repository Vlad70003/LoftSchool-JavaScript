ymaps.ready(init);
	
  
let map = document.querySelector('#map');
let geoObjects = [];
let storage = localStorage;
let currentAdres = '';

	///записываем данные в local storage
let index = storage.length || '0';

/// Массив для хранения информации о плейсмарках
let placemarks = [];


function init() {
  ///Центр карты
  let placemark,
    myMap = new ymaps.Map('map', {
      center: [55.753994, 37.622093],
      zoom: 12
    }, {
      searchControlProvider: 'yandex#search'
    });

	///Кастомный кластер
  var customItemContentLayout = ymaps.templateLayoutFactory.createClass(

    '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
    '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>'
  );


  ///Свойства Кластера
  let clusterer = new ymaps.Clusterer({
    clusterDisableClickZoom: true,
    clusterOpenBalloonOnClick: true,
    // Устанавливаем стандартный макет балуна кластера "Карусель".
    clusterBalloonContentLayout: 'cluster#balloonCarousel',
    // Устанавливаем собственный макет.
    clusterBalloonItemContentLayout: customItemContentLayout,
    // Устанавливаем режим открытия балуна. 
    // В данном примере балун никогда не будет открываться в режиме панели.
    clusterBalloonPanelMaxMapArea: 0,
    // Устанавливаем размеры макета контента балуна (в пикселях).
    clusterBalloonContentLayoutWidth: 400,
    clusterBalloonContentLayoutHeight: 200,
    // Устанавливаем максимальное количество элементов в нижней панели на одной странице
    clusterBalloonPagerSize: 5

  });
  
  ///Клик по кластеру
  clusterer.events.add('click', event => {
    let coords = event.get('target').geometry.getCoordinates();
    baloon.addAdress(coords);
    baloon.openBaloon(coords)
  })
  myMap.geoObjects.add(clusterer);
  
  
  ///Карта на весь экран
  var fullscreenControl = new ymaps.control.FullscreenControl();
  myMap.controls.add(fullscreenControl);
  fullscreenControl.enterFullscreen();


  ///Доступ к конструктору
  let baloon = new Baloon();
  ///Создание меток из LocalStorage
  for (let i = 0; i < storage.length; i++) {
    let returnStorage = JSON.parse(storage[i]);
    baloon.createPlacemark(returnStorage[0]);
  }

  ///Получаем доступ к форме
  let form = document.querySelector('#addForm').innerHTML;


  // Слушаем клик на карте.
  myMap.events.add('click', function(e) {
    let coords = e.get('coords');
    baloon.addAdress(coords);
    baloon.closeBaloon(coords);
    baloon.newOpenBaloon(coords);
  });


  document.body.addEventListener('click', event => {
    let target = event.target;
    
    ///Клик по кнопке добавить
    if (target.dataset.role == 'review-add') {
      let reviewForm = document.querySelector('[data-role=review-form]');
      let coords = JSON.parse(reviewForm.dataset.coords);
      let nameValue = document.querySelector('[data-role=review-name]').value;
      let placeValue = document.querySelector('[data-role=review-place]').value;
      let textValue = document.querySelector('[data-role=review-text]').value;
      try {
        if (nameValue.trim().length > 0 && placeValue.trim().length > 0 && textValue.trim().length > 0) {
          let geoObject = new ymaps.Placemark(coords);
          geoObjects.push(geoObject)

          ///index
          storage[index++] = JSON.stringify([
            coords,
            nameValue,
            placeValue,
            textValue,
            currentAdres,


          ]);
          baloon.createPlacemark(coords);
        } else {
          throw new Error('Все поля должны быть заполнены');
        }
      } catch (e) {
        alert(e.message);
      }
      baloon.closeBaloon();
    }
    
    ///Клик по адресу
    if (target.tagName == 'H2') {
      for (let i = 0; i < storage.length; i++) {
        let key = storage.key(i);
        let numberOfKey = JSON.parse(storage.getItem(key));
  			if(target.textContent == numberOfKey[4]){
        	baloon.closeBaloon();
          baloon.newOpenBaloon(numberOfKey[0])
        }
      }
    }
  })

  function Baloon() {
		///Открываем балун
    this.openBaloon = function(coords, newAdr) {
      let newForm = this.createForm(coords, placemarks);
      this.setBaloonContent(newForm.innerHTML);
      myMap.balloon.open(coords, {
        /* contentHeader: currentAdress, */
        contentBody: newForm.innerHTML,
      });
    }
		///Открываем балун с добавленым в него адресом
    this.newOpenBaloon = function(coords, newAdr) {
      let newForm = this.createForm(coords, placemarks);
      this.setBaloonContent(newForm.innerHTML);
      ymaps.geocode(coords).then(function(res) {
        var newContent = res.geoObjects.get(0).properties.get('name');
        myMap.balloon.open(coords, {
          contentHeader: newContent,
          contentBody: newForm.innerHTML,
        });
      })
    }

		///Получаем адрес по координатам
    this.addAdress = function(coords) {
      ymaps.geocode(coords).then(function(res) {
        var newContent = res.geoObjects.get(0).properties.get('name');
        currentAdres = newContent;
      })
    }

		///Создаем форму
    this.createForm = function(coords, placemarks) {

      let newForm = document.createElement('div');
      newForm.innerHTML = form;
      let reviewAdress = newForm.querySelector('#adress');
      let reviewList = newForm.querySelector('#review-list');
      let reviewForm = newForm.querySelector('[data-role=review-form]');
      reviewForm.dataset.coords = JSON.stringify(coords);

      for (let i = 0; i < storage.length; i++) {
        let key = storage.key(i);

        let numberOfKey = JSON.parse(storage.getItem(key));

        if (String(numberOfKey[0]) == coords) {
          let div = document.createElement('div');
          div.classList.add('review-item');

          div.innerHTML = `
          <div>
            <span id = "name-style">${numberOfKey[1]}</span> <span id = "place-style"
            >${numberOfKey[2]}</span>
          </div>
          <div id = "text-style">${numberOfKey[3]}</div>
          `;
          reviewList.append(div);
        }
      }
      return newForm;
    }

		///Создаем метку
    this.createPlacemark = function(coords) {
      let adres;
      let name;
      for (let i = 0; i < storage.length; i++) {

        let key = storage.key(i);

        let numberOfKey = JSON.parse(storage.getItem(key));

        if (String(numberOfKey[0]) == coords) {
          adres = numberOfKey[4];
          name = `<b>Имя:</b> ${numberOfKey[1]} <br><b>Заведение:</b> ${numberOfKey[2]} <br><b>Комментарий:</b> ${numberOfKey[3]}`;
        }
      }

      let placemark = new ymaps.Placemark(coords, {
        balloonContentHeader: adres,
        balloonContentBody: name,
      });
			
      ///Клик по метке
      placemark.events.add('click', event => {
        let coords = event.get('target').geometry.getCoordinates();
        this.newOpenBaloon(coords)
      })
      myMap.geoObjects.add(placemark);
      clusterer.add(placemark);
    }

		///Закрыть балун
    this.closeBaloon = function() {
      myMap.balloon.close()
    }

		///Изменить содержание балуна
    this.setBaloonContent = function(content) {
      myMap.balloon.setData(content);
    }

  }
}