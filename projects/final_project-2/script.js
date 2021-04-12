import WSClient from "./wsClient";


let users = [];

let name = document.querySelector('#name');
let nickname = document.querySelector("#nickname");
let buttonAut = document.querySelector("#button-autorization");
let buttonMessage = document.querySelector(".button__massage");
let message = document.querySelector(".input-message");
let chatList = document.querySelector(".left-side__list");
let messageList = document.querySelector(".chat__list")
let hamburger = document.querySelector(".hamburger__conteiner");
let numberEntry = document.querySelector(".number-entries");
let clickTimeout = false;
let chatAction = new Chat();

///Подключаемся к серверу
class MegaChat {
 	constructor(){
   	this.wsClient = new WSClient(
     `ws://${location.host}/mega-chat/ws`),
     this.onMessage.bind(this)
   }
   onMessage({type, from, data}){
   	if(type == 'hello'){
             
     }else if(type == 'user-list'){ 

     }else if(type == 'bye-bye'){  

     }else if(type == 'text-message'){ 

     }  
   }
 }

let megaChat = new MegaChat();


document.addEventListener('click', event => {
    let target = event.target;

    ///Нажимаем на кнопку и пушим данные в users
    if(target == buttonAut){
        try{if(name.value.trim().length > 0 && nickname.value.trim().length > 0){
        		
            ///Соединение с сервером
            megaChat.wsClient.connect();
            megaChat.wsClient.sendHello(name);
            
            users.push({name: name.value, nickname:nickname.value});
            let windowAutorization = target.closest('.visible');
            chatAction.addChatPerson(users);
            numberEntry.textContent = `${users.length} участника`

            if(windowAutorization.classList){
                windowAutorization.classList.toggle("hide");
            }
        }else{
            throw new SyntaxError("Пожалуйста, заполните все поля");
        }}catch(e){
            target.nextElementSibling.textContent = e.message;
        }
    }
    
    ///Клик по кнопке отправить
		if(target == buttonMessage){
    	try{if(message.value.trim().length > 0){
      	let newMessage = chatAction.addMessage(message);
        messageList.append(newMessage);
        message.value = "";
      }}catch(e){     	
      }
    }

    ///Реализуем гамбергер
    if((target ==  hamburger || target ==  hamburger.querySelector(".hamburger")) && clickTimeout == false){
        clickTimeout = true;
        chatList.classList.toggle("opacity");    
        let timeout = setTimeout(function(){
            clickTimeout = false;
        }, 1000)        
    }
})

function Chat(){

    this.addChatPerson = function(users){
        for(let user of users){
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
    
    this.addMessage = function(message){
    	let newMessage = document.createElement('li');
      newMessage.classList.add('chat__item');
      newMessage.textContent = message.value;
      return newMessage;
    }
}