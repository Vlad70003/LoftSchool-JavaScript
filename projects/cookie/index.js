/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации


 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
   const homeworkContainer = document.querySelector('#app');
   const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
   const addNameInput = homeworkContainer.querySelector('#add-name-input');
   const addValueInput = homeworkContainer.querySelector('#add-value-input');
   const addButton = homeworkContainer.querySelector('#add-button');
   const listTable = homeworkContainer.querySelector('#list-table tbody');


   ///// Создает и возвращает строку с ячейками, значения которых берутся из ячеек
   function createTable(name, value) {
    let table = document.createElement("tr");
    table.classList.add("tbody__item")
    let nameValue = document.createElement("th");
    nameValue.id = 'tbody__item-name';
    let valueValue = document.createElement("th");
    valueValue.classList.add("tbody__item-value")
    let delValue = document.createElement("th");
    delValue.classList.add("deleteTable");
    nameValue.textContent = name;
    valueValue.textContent = value;
    delValue.textContent = "Удалить";
    
    table.append(nameValue);
    table.append(valueValue);
    table.append(delValue);
  
    return table;
  }

///Ищет ячейки из столбца, который соответствует имени. Если такое имя есть - меняет его значение на введеное.
function addValueAfterFilter(filterValue){
	let nameId = document.querySelectorAll("#tbody__item-name");
  for (let text of nameId) {
    if (!text.textContent.includes(filterValue.toLowerCase()) && !text.nextElementSibling.textContent.includes(filterValue.toLowerCase())) {
      let nameNone = text.closest(".tbody__item");
      nameNone.style.display = "none";

    } else if (text.textContent.includes(filterValue.toLowerCase())) {
      let nameNone = text.closest(".tbody__item");
      nameNone.style.display = "table-row";
    }
  }
}

let valueStr = "";

filterNameInput.addEventListener('input', function (event) {
  let filterValue = this.value.toLowerCase();
  valueStr = filterValue;
  
	addValueAfterFilter(filterValue);

});

/// Клик по "Добавить cookie"
addButton.addEventListener('click', (event) => {
  event.preventDefault();


  let name = addNameInput.value;
  let value = addValueInput.value;
  let nameId = document.querySelectorAll("#tbody__item-name");
  

  if (name.length > 0 && value.length > 0) {
    let tbody = createTable(name, value);
    
    for (let elements of nameId) {
      if (elements.textContent == addNameInput.value) {
        elements.nextElementSibling.textContent = addValueInput.value;
        document.cookie = `${name} = ${value}`;
        return;
      }
    }
    listTable.appendChild(tbody);
    document.cookie = `${name} = ${value}`;
    addValueAfterFilter(valueStr);
  }
}
);

/// Клик по ячейке "Удалить"
listTable.addEventListener('click', (event) => {
  event.preventDefault();
  let target = event.target;
  let nameDel = target.closest(".tbody__item").firstChild;

  let targetClosest = target.closest('tr');
  if (target.className == "deleteTable") {
    targetClosest.remove(); 
    function cookies(name) {
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    cookies(nameDel.textContent);
  }
})

