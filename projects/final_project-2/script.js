let users = [];

let name = document.querySelector('#name');
let nickname = document.querySelector("#nickname");
let button = document.querySelector("#button-autorization");
let chatList = document.querySelector(".left-side__list");
let hamburger = document.querySelector(".hamburger__conteiner");
let clickTimeout = false;
let chatAction = new Chat();

document.addEventListener('click', event => {
    let target = event.target;

    ///Нажимаем на кнопку и пушим данные в users
    if(target == button){
        try{if(name.value.length > 0 && nickname.value.length > 0){
            users.push({name: name.value, nickname:nickname.value});
            let windowAutorization = target.closest('.visible');
            chatAction.addChatPerson();

            if(windowAutorization.classList){
                windowAutorization.classList.toggle("hide");
                windowAutorization.classList.toggle("visible");
            }
        }else{
            throw new SyntaxError("Пожалуйста, заполните все поля");
        }}catch(e){
            target.nextElementSibling.textContent = e.message;
        }
    }

    ///Реализуем гамбергер
    if((target ==  hamburger || target ==  hamburger.querySelector(".hamburger")) && clickTimeout == false){
        clickTimeout = true;
        chatList.classList.toggle("opacity");    
        let timeout = setTimeout(function(){
            clickTimeout = false;
        }, 1000)
        timeout;
    }



})

function Chat(){

    this.addChatPerson = function(){
        for(user of users){
            let newPerson = this.createPerson(user.name, user.nickname);
            chatList.append(newPerson);
        }
    }

    this.createPerson = function(name, nickname){
        let person = document.createElement('li');
        person.classList.add('left-side__item');

        let avatar = document.createElement('span');
        avatar.classList.add('avatar');

        let personInformation = document.createElement("div");
        personInformation.classList.add("person-information");

        let nameValue = document.createElement("div");
        nameValue.classList.add('person-information__name');
        nameValue.textContent = name;

        let nickNameValue = document.createElement("div");
        nickNameValue.classList.add('person-information__nikname');
        nickNameValue.textContent = nickname;

        personInformation.append(nameValue);
        personInformation.append(nickNameValue);

        person.append(avatar);
        person.append(personInformation);

        return person;
    }
}