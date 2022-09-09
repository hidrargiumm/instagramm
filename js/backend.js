'use strict';

(function () {
    const URL = 'https://22.javascript.pages.academy/kekstagram131';

    window.upload = function (data, onLoad, onError) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', () => {
            let error;

            switch (xhr.status) {
                case 200:
                    onLoad(xhr.response);
                    break;
                
                case 400:
                    error = 'Неверный запрос';
                    break;
                case 401:
                    error = 'Пользователь не авторизован';
                    break;
                case 404:
                    error = 'Ничего не найдено';
                    break;
                
                default: 
                    error = `Статус ответа: ${xhr.status} ${xhr.statusText}`;

            }

            if (error) {
                onError(error);
            }
        });

        xhr.open('POST', URL);
        xhr.send(data);
    }

})();

(function () {
    const URL = 'https://22.javascript.pages.academy/kekstagram/data';

    window.load = function (onLoad, onError) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                onLoad(xhr.response);
                window.pictureElements = xhr.response;
            } else {
                onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
            }    
        });
        xhr.addEventListener('error', () => {
            onError('Произошла ошибка соединения');
        });
        xhr.addEventListener('timeout', ()=> {
            onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
        });

        xhr.timeout = 10000; //10s

        xhr.open('GET', URL);
        xhr.send();
    }
})();