const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/letschat');
const messages = db.get('messages');

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
    response.json({
        message: 'Manchester'
    });
});

app.get('/message', (request, response) => {
    messages.find().then( messages => {
        response.json(messages);
    });
});

app.post('/message', (request, response) => {
    const message = {
        name: request.body.name.toString(),
        content: request.body.content.toString(),
        created: new Date()
    }

    messages.insert(message).then(createdMessage => {
        response.json(createdMessage);
    });
})

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
});