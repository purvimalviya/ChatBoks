const socket= io('http://localhost:8000')

const form = document.getElementById("send-container")
const messageInput = document.getElementById("messageInp")
const messageContainer = document.querySelector(".container")


const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add('new-user');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();                       //default action of that event will not occur, page not refreshed
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value="";
})

// form.classList.add('rangila');
const xname = prompt("Enter Your Nickname To Start Chatting")
socket.emit('new-user-joined', xname)

socket.on('user-joined', xname=>{
    append(`${xname} joined the chat`, 'right')
})

socket.on('receive', data=>{
    append(`${data.xname}: ${data.message}`, 'left')
})
