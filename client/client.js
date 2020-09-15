const form = document.querySelector('form');
const messagesDiv = document.querySelector('.messages');
const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/message' : 'https://gentle-shore-15785.herokuapp.com/message';

listAllMessages();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const name = formData.get('name');
    const content = formData.get('content');

    const chat = {
        name,
        content
    }

    form.reset();

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(chat),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(createdMessage => {
          console.log(createdMessage)
          listAllMessages();
      })
});

function listAllMessages() {
    fetch(API_URL, {
        method: 'GET',
    }).then(response => response.json())
        .then(messages => messages.reverse())
        .then(messages => {
            messagesDiv.innerHTML = '';
            messages.forEach(message => {
                const div = document.createElement('div');

                const header = document.createElement('h3');
                header.textContent = message.name;
                
                const contents = document.createElement('p');
                contents.textContent = message.content;

                const date = document.createElement('small');
                date.textContent = new Date(message.created);

                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(date);

                messagesDiv.appendChild(div);
          })
      })
}