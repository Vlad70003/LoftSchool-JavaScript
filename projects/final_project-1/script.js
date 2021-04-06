ymaps.ready(init);

let map = document.querySelector('#map');
let geoObjects = [];

/// Массив для хранения информации о плейсмарках
let placemarks = [];

function init() {
  var myPlacemark,
    myMap = new ymaps.Map('map', {
      center: [55.753994, 37.622093],
      zoom: 12
    }, {
      searchControlProvider: 'yandex#search'
    });
    
   
    
    ///Доступ к конструктору
  let baloon = new Baloon();

  ///Получаем доступ к форме
  let form = document.querySelector('#addForm').innerHTML;


  // Слушаем клик на карте.
  myMap.events.add('click', function(e) {
    let coords = e.get('coords');


    baloon.openBaloon(coords);

    document.body.addEventListener('click', event => {
      let target = event.target;
      if (target.dataset.role == 'review-add') {
        let reviewForm = document.querySelector('[data-role=review-form]');
        let coords = JSON.parse(reviewForm.dataset.coords);
        placemarks.push({
          coords,
          review: {
            name: document.querySelector('[data-role=review-name]').value,
            place: document.querySelector('[data-role=review-place]').value,
            text: document.querySelector('[data-role=review-text]').value,
          },
        });
       baloon.closeBaloon();
       baloon.createClasterer();
       baloon.createPlacemark(coords);
       
      }
    })
 		    
  });

  function Baloon() {
  	

    this.openBaloon = function(coords) {
      let newForm = this.createForm(coords, placemarks);
      this.setBaloonContent(newForm.innerHTML);
      myMap.balloon.open(coords, newForm.innerHTML, {
        closeButton: true
      });
    };


    this.createForm = function(coords, placemarks) {

      let newForm = document.createElement('div');
      newForm.innerHTML = form;
      let reviewList = newForm.querySelector('#review-list');
      let reviewForm = newForm.querySelector('[data-role=review-form]');
      reviewForm.dataset.coords = JSON.stringify(coords);

      for (let i = 0; i < placemarks.length; i++) {
      geoObjects[i] = new ymaps.Placemark(placemarks[i].coords);
        if (placemarks[i].coords[0] == coords[0] && placemarks[i].coords[1] == coords[1]) {
          let div = document.createElement('div');
          div.classList.add('review-item');
          div.innerHTML = `
          <div>
            <b>${placemarks[i].review.name}</b> [${placemarks[i].review.place}]
          </div>
          <div>${placemarks[i].review.text}</div>
          `;
          reviewList.append(div);
        }
      }
      return newForm;
    }

    this.createPlacemark = function(coords) {
      let placemark = new ymaps.Placemark(coords);
      placemark.events.add('click', event => {
        let coords = event.get('target').geometry.getCoordinates();
        this.openBaloon(coords)
      })
      myMap.geoObjects.add(placemark);
      
    }

    this.createClasterer = function(placemarks) {
     let clusterer = new ymaps.Clusterer({
       	preset: 'islands#invertedVioletClusterIcons',
        groupByCoordinates: true,
        clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false
      });
      clusterer.events.add('click', event => {
        let coords = event.get('target').geometry.getCoordinates();
        this.openBaloon(coords)
      })
      clusterer.add(geoObjects);
      myMap.geoObjects.add(clusterer);
     
    }

    this.closeBaloon = function() {
      myMap.balloon.close()
    }

    this.setBaloonContent = function(content) {
      myMap.balloon.setData(content);
    }

  }
}