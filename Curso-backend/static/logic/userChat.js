const socket = io()

const form = document.getElementById('form-chat')
const input = document.getElementById('input-chat')
const ulmessages = document.getElementById('ulmessages')

let username

const dataToSend = 'Hola desde chat Realtime';
socket.emit('postData', dataToSend);

function initSession() {
    return prompt('nombre de usuario')
}

username = initSession()

form.addEventListener('submit', event => {
    event.preventDefault();
    if (input) {
        sendMessage(username, input.value)
        input.value = ''
    }
});


socket.on('message', msgs => {
    if (ulmessages) {
        for (const { userName, message } of msgs) {
            let li = document.createElement('li')
            li.innerHTML = `${userName}: ${message}`
            ulmessages.appendChild(li)
        }
    }
})

function sendMessage(userName, message) {
    socket.emit('message', { userName, message })
}