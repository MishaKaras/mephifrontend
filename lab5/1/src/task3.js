axios.get('https://json.geoiplookup.io/')
    .then(function (response) {
        console.log("Успешный ответ:", response.data);
    })
    .catch(function (error) {
        console.error("Ошибка при запросе:", error.message);
    });