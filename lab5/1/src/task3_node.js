const axios = require('axios');

axios.get('https://json.geoiplookup.io/')
    .then(function (response) {
        console.log("Успех в Node.js:", response.status);
        console.log("Ответ:", response.data);

    })
    .catch(error => console.error(error));