let users = [];

let name = document.querySelector('#name');
let nickname = document.querySelector("#nickname");
let button = document.querySelector("#button-autorization");


document.addEventListener('click', event => {
    let target = event.target;

    ///Нажимаем на кнопку и пушим данные в users
    if(target == button){
        try{if(name.value.length > 0 && nickname.value.length > 0){
            users.push({name: name.value, nickname:nickname.value});
            let windowAutorization = target.closest('.visible');

            

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
})

function chatAction(){
    this.addChat = function(){
        
    }
}