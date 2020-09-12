const form = document.querySelector('form');
const API_URL = 'http://localhost:5000/message';

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const name = formData.get('name');
    const content = formData.get('content');

    const chat = {
        name,
        content
    }

    console.log(chat);
    form.reset();

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(chat),
        headers: {
            'content-type': 'application/json'
        }
    })
});