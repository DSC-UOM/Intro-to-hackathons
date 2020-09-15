const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');

const app = express(); 

const db = monk(process.env.MONGO_URI || 'localhost/letschat');
const messages = db.get('messages');
const filter = new Filter();

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
        name: filter.clean(request.body.name.toString()),
        content: filter.clean(request.body.content.toString()),
        created: new Date()
    }

    messages.insert(message).then(createdMessage => {
        response.json(createdMessage);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Listening on ${ PORT }');
});