const axios = require('axios');

axios.get('https://vk.com')
    .then(response => console.log("Успех в Node.js:", response.status))
    .catch(error => console.error(error));