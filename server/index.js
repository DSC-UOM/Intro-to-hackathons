const express = require('express');

const app = express();

app.get('/', (request, response) => {
    response.json({
        message: 'Manchester'
    });
});

app.post('/message', (request, response) => {
    console.log(request.body);
})

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
});