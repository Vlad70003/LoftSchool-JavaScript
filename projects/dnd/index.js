/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

let homeworkContainer = document.querySelector('#app');

let currentDiv;
let startX = 0;
let startY = 0;

document.addEventListener('mousemove', (event) => {
  if(currentDiv){
    currentDiv.style.left = event.clientX - startX + 'px';
    currentDiv.style.top = event.clientY - startY + 'px';
  }
  

  // target.style.position = 'absolute';
  // target.style.zIndex = 1000;
  // document.body.append(target);
  
});


export function createDiv() {
  let div = document.createElement("div");
  div.classList.add("draggable-div");

  function getRandom(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  }
  div.style.backgroundColor = `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`;
  div.style.left = `${getRandom(0, 100)}%`;
	div.style.top = `${getRandom(0, 100)}%`;
  div.style.display = "block";
  div.style.width = `${getRandom(0, 100)}px`;
  div.style.height = `${getRandom(0, 100)}px`;

  


  div.addEventListener('mousedown', event => {
      currentDiv = div;
      startX = event.offsetX;
      startY = event.offsetY;
  })

  div.addEventListener('mouseup', event => {
    return currentDiv = false;
  })

  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', e => {

  let div = createDiv();
  homeworkContainer.appendChild(div);
});