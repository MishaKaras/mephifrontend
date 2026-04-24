axios.get('https://vk.com')
    .then(function (response) {
        console.log("Успешный ответ:", response.data);
    })
    .catch(function (error) {
        console.error("Ошибка при запросе:", error.message);
    });