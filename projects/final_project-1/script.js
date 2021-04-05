ymaps.ready(init);

let map = document.querySelector('#map');
let placemarks = [];

function init() {
  var myPlacemark,
    myMap = new ymaps.Map('map', {
      center: [55.753994, 37.622093],
      zoom: 12
    }, {
      searchControlProvider: 'yandex#search'
    },
    clusterer = new ymaps.Clusterer({
      groupByCoordinates: true,
      clusterDisableClickZoom: true,
      clusterOpenBalloonOnClick: false,
    })
    );
    
  ///Получаем доступ к форме
	let form = document.querySelector('#addForm').innerHTML;
  
  
  // Слушаем клик на карте.
  myMap.events.add('click', function(e) {
    let coords = e.get('coords');
       
    let baloon = new Baloon();
    
    baloon.openBaloon(coords);
    document.body.addEventListener('click', event => {
      let target = event.target;    
      if(target.dataset.role == 'review-add'){ 
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
        baloon.createPlacemark(coords);
        baloon.closeBaloon();
      }
    })
    
  });

  


  function Baloon() {
  
  	this.openBaloon = function(coords) {
    	let newForm = this.createForm(coords, placemarks);
      myMap.balloon.open(coords, newForm.innerHTML, {
        closeButton: true
      });
    };
  	
  
  	this.createForm = function(coords, placemarks){
      let similar = false;
      for(let element of placemarks){
        if(element.coords[0] == coords[0] && element.coords[1] == coords[1]){
          similar = true;
        }
      }
      console.log(similar)
    	let newForm = document.createElement('div');
      newForm.innerHTML = form;
      let reviewList = newForm.querySelector('#review-list');
      let reviewForm = newForm.querySelector('[data-role=review-form]');
      reviewForm.dataset.coords = JSON.stringify(coords);
      if (similar == true){
        for (let item of placemarks){
          let div = document.createElement('div');
          div.classList.add('review-item');
          div.innerHTML = `
          <div>
            <b>${item.name}</b> [${item.place}]
          </div>
          <div>${item.text}</div>
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
      myMap.geoObjects.add(placemark) 
    }
    
    this.closeBaloon = function(){
      myMap.balloon.close()
    }

    this.setBaloonContent = function(content){
      myMap.balloon.setData(content);
    }
  }
}