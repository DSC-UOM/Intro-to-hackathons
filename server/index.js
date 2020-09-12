const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

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