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

const homeworkContainer = document.querySelector('#app');

homeworkContainer.onmousedown = function(event) {

  let shiftX = event.clientX - homeworkContainer.getBoundingClientRect().left;
  let shiftY = event.clientY - homeworkContainer.getBoundingClientRect().top;

  homeworkContainer.style.position = 'absolute';
  homeworkContainer.style.zIndex = 1000;
  document.body.append(homeworkContainer);

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    homeworkContainer.style.left = pageX - shiftX + 'px';
    homeworkContainer.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);

  homeworkContainer.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    homeworkContainer.onmouseup = null;
  };
  homeworkContainer.ondragstart = function() {
  return false;
};

};

export function createDiv() {
  let div = document.createElement("div");
  div.classList.add("draggable-div");
  div.textContent = "TEXT";

  function getRandom(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  }
  
  div.style.background = `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`;
  div.style.right = `${getRandom(0, 100)}%`;
	div.style.top = `${getRandom(0, 100)}%`;


  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', e => {
  console.log("text");
  let div = createDiv();
  homeworkContainer.appendChild(div);
});
